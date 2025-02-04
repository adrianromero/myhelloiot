/*
MYHELLOIOT
Copyright (C) 2021-2025 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { useState, ReactNode, useRef } from "react";
import { Buffer } from "buffer";
import mqtt from "mqtt";
import {
    MqttClient,
    IClientSubscribeOptions,
    IClientPublishOptions,
    IPublishPacket,
} from "mqtt";
import match from "mqtt-match";

import type {
    MQTTStatus,
    MQTTConnectInfo,
    MQTTContextValue,
    MQTTMessage,
    SubscribeHandler,
    TopicManager,
    Subscribe,
} from "./MQTTContext";
import { MQTTContext } from "./MQTTContext";
import { Timing } from "./Timing";

class MQTTTopics implements TopicManager {
    subscriptions: SubscribeHandler[];
    constructor() {
        this.subscriptions = [];
    }
    disconnect() {}
    connect() {}
    subscribe(
        subscription: SubscribeHandler,
        _: Subscribe,
        client: MqttClient,
        options: IClientSubscribeOptions,
    ): boolean {
        if (!this.subscriptions.some(s => s.topic === subscription.topic)) {
            client.subscribe(subscription.topic, options);
        }
        this.subscriptions.push(subscription);
        return true;
    }
    unsubscribe(subscription: SubscribeHandler, client: MqttClient): boolean {
        const inx: number = this.subscriptions.findIndex(
            s => s === subscription,
        );
        if (inx < 0) {
            throw new Error("Not subscribed");
        }
        this.subscriptions.splice(inx, 1);
        if (!this.subscriptions.some(s => s.topic === subscription.topic)) {
            client.unsubscribe(subscription.topic);
        }
        return true;
    }
    onMessage(topic: string, message: Buffer, packet: IPublishPacket): boolean {
        this.subscriptions.forEach(s => {
            if (match(s.topic, topic)) {
                s.listener({
                    topic,
                    message,
                    time: new Date().getTime(),
                    qos: packet.qos,
                    retain: packet.retain,
                    dup: packet.dup,
                });
            }
        });
        return true;
    }
}

const MQTTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<{
        status: MQTTStatus;
        error?: Error;
        client?: MqttClient;
    }>({
        status: "Disconnected",
    });

    const topicsManager: React.MutableRefObject<TopicManager>[] = [];
    topicsManager.push(useRef<TopicManager>(new Timing()));
    topicsManager.push(useRef<TopicManager>(new MQTTTopics()));

    const pubsubTopic = (topic: string): string => {
        const clientoptions = state.client?.options;
        return topic
            .replace("$[clientId]", clientoptions?.clientId ?? "$[clientId]")
            .replace("$[username]", clientoptions?.username ?? "$[username]");
    };

    const disconnect = () => {
        state.client?.end();
        state.client?.removeAllListeners();
        setState({
            status: "Disconnected",
        });
        topicsManager.forEach(tm => tm.current.disconnect());
    };

    const connect = ({ url, options }: MQTTConnectInfo) => {
        disconnect();

        try {
            const client: MqttClient = mqtt.connect(url, options);
            client.on("connect", () => {
                setState(s => {
                    return {
                        status: "Connected",
                        client: s.client,
                    };
                });
                topicsManager.forEach(tm => tm.current.connect());
            });
            client.on("error", () => {
                setState(s => ({
                    status: "Error",
                    client: s.client,
                }));
                topicsManager.forEach(tm => tm.current.disconnect());
            });
            client.on("reconnect", () => {
                setState(s => ({
                    status: "Reconnecting",
                    client: s.client,
                }));
                topicsManager.forEach(tm => tm.current.disconnect());
            });
            client.on("close", () => {
                setState(s => ({
                    status: "Closed",
                    client: s.client,
                }));
                topicsManager.forEach(tm => tm.current.disconnect());
            });
            client.on("offline", () => {
                setState(s => ({
                    status: "Offline",
                    client: s.client,
                }));
                topicsManager.forEach(tm => tm.current.disconnect());
            });
            client.on("disconnect", () => {
                setState(s => ({
                    status: "Disconnecting",
                    client: s.client,
                }));
                topicsManager.forEach(tm => tm.current.disconnect());
            });
            client.on(
                "message",
                (topic: string, message: Buffer, packet: IPublishPacket) => {
                    topicsManager.some(tm =>
                        tm.current.onMessage(topic, message, packet),
                    );
                },
            );

            // TODO: Clear all subscriptions???
            setState({
                status: "Connecting",
                client,
            });
        } catch (error) {
            setState(s => ({
                status: "Error",
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown MQTT connection error."),
                client: s.client,
            }));
        }
    };

    const subscribe: Subscribe = (
        subtopic: string,
        listener: (mqttmessage: MQTTMessage) => void,
        options?: IClientSubscribeOptions,
    ): SubscribeHandler | null => {
        const topic = pubsubTopic(subtopic);
        if (state.client && topic !== "") {
            const handler: SubscribeHandler = {
                topic,
                listener,
            };
            topicsManager.some(tm =>
                tm.current.subscribe(
                    handler,
                    subscribe,
                    state.client!,
                    options || { qos: 0 },
                ),
            );
            return handler;
        }
        return null;
    };

    const unsubscribe = (handler: SubscribeHandler | null) => {
        if (state.client && handler) {
            topicsManager.some(tm =>
                tm.current.unsubscribe(handler, state.client!),
            );
        }
    };

    const publish = (
        pubtopic: string,
        message: Buffer | string,
        options?: IClientPublishOptions,
    ) => {
        const topic = pubsubTopic(pubtopic);
        if (state.client?.connected) {
            if (topic !== "") {
                state.client.publish(topic, message, options || {});
            }
        } else {
            // TODO: Better just notify not connected
            throw new Error("Not connected");
        }
    };

    const clientoptions = state.client?.options;
    const value: MQTTContextValue = [
        {
            status: state.status,
            error: state.error,
            ready: !!state.client,
            connected: state.client?.connected || false,
            options: {
                protocol: clientoptions?.protocol,
                hostname: clientoptions?.hostname,
                port: clientoptions?.port,
                path: clientoptions?.path,
                protocolId: clientoptions?.protocolId,
                protocolVersion: clientoptions?.protocolVersion,
                username: clientoptions?.username,
                clientId: clientoptions?.clientId,
            },
        },
        {
            brokerconnect: connect,
            brokerdisconnect: disconnect,
            subscribe,
            unsubscribe,
            publish,
        },
    ];
    return (
        <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>
    );
};

export default MQTTProvider;
