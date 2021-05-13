import { QoS } from "mqtt";
import { MQTTConnectInfo, OnlineInfo } from "../mqtt/MQTTProvider";

export type ConnectInfo = {
  url: string;
  username: string;
  password: string;
  clientId: string;
  keepalive: number;
  connectTimeout: number;
  reconnectPeriod: number;
  onlinetopic: string;
  onlineqos: number;
  automatic: boolean;
};

export const connectWithInfo: (
  connect: (mqttconnectinfo: MQTTConnectInfo) => void,
  connectinfo: ConnectInfo
) => void = (connect, connectinfo) => {
  // const url = "ws://broker.mqttdashboard.com:8000/mqtt";
  // const username = "";
  // const password = "";
  const {
    url,
    username,
    password,
    clientId,
    keepalive,
    connectTimeout,
    reconnectPeriod,
    onlinetopic,
    onlineqos,
  } = connectinfo;
  const online: OnlineInfo | undefined = onlinetopic
    ? {
        topic: onlinetopic,
        qos: onlineqos as QoS,
        retain: true,
      }
    : undefined;

  connect({
    url,
    online,
    options: {
      username,
      password,
      clientId,
      keepalive,
      connectTimeout,
      reconnectPeriod,
    },
  });
};
