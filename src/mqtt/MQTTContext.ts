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

import { createContext, Context } from "react";
import {
  IClientOptions,
  IClientSubscribeOptions,
  IClientPublishOptions,
} from "mqtt";
import type { QoS } from "mqtt-packet";

export type SubscribeHandler = {
  topic: string;
  listener: (mqttmessage: MQTTMessage) => void;
};

export type MQTTMessage = {
  topic: string;
  message: Buffer;
  time: number;
  qos?: QoS;
  retain?: boolean;
  dup?: boolean;
};

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

export const MQTTContext: Context<MQTTContextValue> =
  createContext<MQTTContextValue>([
    {
      status: "Disconnected",
      ready: false,
      connected: false,
      options: {},
    },
    {
      brokerconnect: () => {},
      brokerdisconnect: () => {},
      subscribe: () => null,
      unsubscribe: () => {},
      publish: () => {},
    },
  ]);
