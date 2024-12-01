/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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

import React from "react";
import { List, Tag } from "antd";
import { IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTContext";
import { useMQTTSubscribe } from "../mqtt/MQTTHooks";
import { ValueFormat } from "../format/FormatTypes";
import { StringValueFormat } from "../format/ValueFormat";
import Paragraph from "antd/lib/typography/Paragraph";

import "./LogView.css";

export type LogViewProps = {
    subtopic: string;
    suboptions?: IClientSubscribeOptions;
    format?: ValueFormat;
    messages: MQTTMessage[];
    onMessage: (mqttmessage: MQTTMessage) => void;
    className?: string;
};

const LogView: React.FC<LogViewProps> = ({
    subtopic,
    suboptions,
    format = StringValueFormat(),
    messages,
    onMessage,
    className,
}) => {
    useMQTTSubscribe(
        subtopic,
        (mqttmessage: MQTTMessage) =>
            mqttmessage.time && onMessage(mqttmessage),
        suboptions,
    );

    return (
        <List
            size="small"
            itemLayout="vertical"
            className={`myhLogView ${className}`}
            dataSource={messages}
            renderItem={item => (
                <List.Item>
                    <Paragraph className="myhLogView-message" copyable ellipsis>
                        {format.toDisplay(item.message)}
                    </Paragraph>
                    <div className="myhLogView-tags">
                        <Tag>{item.topic}</Tag>
                    </div>
                    <div className="myhLogView-tags">
                        {item.dup && <Tag color="lime">Dup</Tag>}
                        {item.retain && <Tag color="green">Retain</Tag>}
                        {typeof item.qos === "number" && (
                            <Tag color="geekblue">QoS: {item.qos}</Tag>
                        )}
                        <Tag color="blue">
                            {new Date(item.time).toLocaleString()}
                        </Tag>
                    </div>
                </List.Item>
            )}
            bordered
            style={{ height: 300, overflow: "auto" }}
        ></List>
    );
};

export default LogView;
