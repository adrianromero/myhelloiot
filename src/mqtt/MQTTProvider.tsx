/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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

import React, {
  createContext,
  useState,
  ReactNode,
  Context,
} from "react";
import { Buffer } from "buffer";
import mqtt from "mqtt";
import {
  MqttClient,
  IClientOptions,
  IClientSubscribeOptions,
  IClientPublishOptions,
  IPublishPacket
} from "mqtt";
import type { QoS } from "mqtt-packet";
import match from "mqtt-match";

export type MQTTStatus =
  | "Disconnected"
  | "Connecting"
  | "Closed"
  | "Offline"
  | "Connected"
  | "Error"
  | "Reconnecting"
  | "Disconnecting";


export type MQTTConnectInfo = {
  url: string;
  options?: IClientOptions;
};

export type MQTTConnectionOptions = {
  protocol?: string;
  hostname?: string;
  port?: number;
  path?: string;
  protocolId?: string;
  protocolVersion?: number;
  username?: string;
  clientId?: string;
};

export type MQTTContextValue = [
  {
    status: MQTTStatus;
    error?: Error;
    ready: boolean;
    connected: boolean;
    options: MQTTConnectionOptions;
  },
  {
    brokerconnect: ({ url, options }: MQTTConnectInfo) => void;
    brokerdisconnect: () => void;
    subscribe: (
      topic: string,
      callback: (mqttmessage: MQTTMessage) => void,
      options?: IClientSubscribeOptions
    ) => SubscribeHandler | null;
    unsubscribe: (handler: SubscribeHandler | null) => void;
    publish: (
      topic: string,
      message: Buffer | string,
      options?: IClientPublishOptions
    ) => void;
  }
];

export type MQTTMessage = {
  topic: string;
  message: Buffer;
  time: number;
  qos?: QoS;
  retain?: boolean;
  dup?: boolean;
};

export type SubscribeHandler = {
  topic: string;
  listener: (mqttmessage: MQTTMessage) => void;
};

export const MQTTContext: Context<MQTTContextValue> = createContext<MQTTContextValue>([
  {
    status: "Disconnected",
    ready: false,
    connected: false,
    options: {},
  },
  {
    brokerconnect: () => { },
    brokerdisconnect: () => { },
    subscribe: () => null,
    unsubscribe: () => { },
    publish: () => { },
  },
]);

const MQTTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{
    status: MQTTStatus;
    error?: Error;
    client?: MqttClient;
    _subscriptions: SubscribeHandler[];
  }>({
    status: "Disconnected",
    _subscriptions: [],
  });

  const pubsubTopic = (topic: string): string => {
    const clientoptions = state.client?.options;
    return topic
      .replace("$[clientId]", clientoptions?.clientId ?? "$[clientId]")
      .replace("$[username]", clientoptions?.username ?? "$[username]");
  };

  const disconnect = () => {
    state.client?.end();
    state.client?.removeAllListeners();
    setState((s) => ({
      status: "Disconnected",
      _subscriptions: s._subscriptions,
    }));
  };

  const connect = ({ url, options }: MQTTConnectInfo) => {
    disconnect();

    try {
      const client: MqttClient = mqtt.connect(url, options);
      client.on("connect", () => {
        setState((s) => {
          return {
            status: "Connected",
            client: s.client,
            _subscriptions: s._subscriptions,
          };
        });
      });
      client.on("error", () => {
        setState((s) => ({
          status: "Error",
          client: s.client,
          _subscriptions: s._subscriptions,
        }));
      });
      client.on("reconnect", () => {
        setState((s) => ({
          status: "Reconnecting",
          client: s.client,
          _subscriptions: s._subscriptions,
        }));
      });
      client.on("close", () => {
        setState((s) => ({
          status: "Closed",
          client: s.client,
          _subscriptions: s._subscriptions,
        }));
      });
      client.on("offline", () => {
        setState((s) => ({
          status: "Offline",
          client: s.client,
          _subscriptions: s._subscriptions,
        }));
      });
      client.on("disconnect", () => {
        setState((s) => ({
          status: "Disconnecting",
          client: s.client,
          _subscriptions: s._subscriptions,
        }));
      });
      client.on(
        "message",
        (topic: string, message: Buffer, packet: IPublishPacket) => {
          state._subscriptions.forEach((subs) => {
            if (match(subs.topic, topic)) {
              subs.listener({
                topic,
                message,
                time: new Date().getTime(),
                qos: packet.qos,
                retain: packet.retain,
                dup: packet.dup,
              });
            }
          });
        }
      );

      setState((s) => {
        s._subscriptions.length = 0;
        return {
          status: "Connecting",
          client,
          _subscriptions: s._subscriptions,
        };
      });
    } catch (error) {
      setState((s) => ({
        status: "Error",
        error: (error instanceof Error) ? error : new Error("Unknown MQTT connection error."),
        client: s.client,
        _subscriptions: s._subscriptions,
      }));
    }
  };

  const subscribe = (
    subtopic: string,
    listener: (mqttmessage: MQTTMessage) => void,
    options?: IClientSubscribeOptions
  ): SubscribeHandler | null => {
    const topic = pubsubTopic(subtopic);
    if (state.client && topic !== "") {
      const handler = { topic, listener };
      state._subscriptions.push(handler);
      if (
        !state._subscriptions.some((s) => s !== handler && s.topic === topic)
      ) {
        state.client.subscribe(topic, options || { qos: 0 });
      }
      return handler;
    }
    return null;
  };

  const unsubscribe = (handler: SubscribeHandler | null) => {
    if (state.client && handler) {
      const inx: number = state._subscriptions.findIndex((s) => s === handler);
      if (inx < 0) {
        throw new Error("Not subscribed");
      }
      state._subscriptions.splice(inx, 1);
      if (!state._subscriptions.some((s) => s.topic === handler.topic)) {
        state.client.unsubscribe(handler.topic);
      }
    }
  };

  const publish = (
    pubtopic: string,
    message: Buffer | string,
    options?: IClientPublishOptions
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
    { brokerconnect: connect, brokerdisconnect: disconnect, subscribe, unsubscribe, publish },
  ];
  return <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>;
};

export default MQTTProvider;
