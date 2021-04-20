import React, {
  createContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  Context,
  useContext,
} from "react";
import mqtt, {
  MqttClient,
  IClientOptions,
  IClientSubscribeOptions,
  IClientPublishOptions,
  QoS,
} from "mqtt";
import match from "mqtt-match";

export type MQTTStatus =
  | "close"
  | "offline"
  | "connect"
  | "connecting"
  | "error"
  | "reconnect"
  | "disconnect";

export type OnlineInfo = { topic: string; qos: QoS; retain: boolean };

export type MQTTConnectInfo = {
  url: string;
  online?: OnlineInfo;
  options?: IClientOptions;
};

type MQTTContextValue = [
  { status: MQTTStatus; connected: boolean },
  {
    connect: ({ url, online, options }: MQTTConnectInfo) => void;
    disconnect: () => void;
    subscribe: (
      topic: string,
      callback: (topic: string, message: Buffer) => void,
      options?: IClientSubscribeOptions
    ) => void;
    publish: (
      topic: string,
      message: Buffer | string,
      options?: IClientPublishOptions
    ) => void;
  }
];

const MQTTContext: Context<MQTTContextValue> = createContext<MQTTContextValue>([
  {
    status: "close",
    connected: false,
  },
  {
    connect: () => {},
    disconnect: () => {},
    subscribe: () => {},
    publish: () => {},
  },
]);

export const useMQTTContext = () => useContext(MQTTContext);

export const useMQTTSubscribe = (
  topic: string,
  callback: (topic: string, message: Buffer) => void,
  options?: IClientSubscribeOptions
): void => {
  const [{ status }, { subscribe }] = useMQTTContext();
  useEffect(() => {
    // console.log("subscribing " + status + " " + topic);
    if (status === "connect" && topic !== "") {
      subscribe(topic, callback, options);
    }
    return () => {
      // if (status === "connect" && topic !== "") {
      // console.log("unsubscribing " + status + " " + topic);
    };
  }, [status, topic]); // eslint-disable-line react-hooks/exhaustive-deps
};

export type MQTTProviderProps = { children: ReactNode };

const MQTTProvider: FC<MQTTProviderProps> = ({ children }) => {
  const [state, setState] = useState<{
    client?: MqttClient;
    online?: OnlineInfo;
    status: MQTTStatus;
  }>({ status: "close" });

  const disconnect = () => {
    if (state.client && state.online) {
      state.client.publish(state.online.topic, "offline", {
        qos: state.online.qos,
        retain: state.online.retain,
      });
    }
    state.client?.removeAllListeners();
    state.client?.end();

    setState({ status: "close" });
  };

  const connect = ({ url, online, options }: MQTTConnectInfo) => {
    disconnect();

    let connectoptions: IClientOptions = { ...options };
    if (online) {
      connectoptions = {
        ...connectoptions,
        will: {
          ...online,
          payload: "offline",
        },
      };
    }

    const client: MqttClient = mqtt.connect(url, connectoptions);
    client.on("connect", () => {
      // Unsubscribe all topics
      if (online) {
        client.publish(online.topic, "online", {
          qos: online.qos,
          retain: online.retain,
        });
      }
      setState({ client, online, status: "connect" });
    });
    client.on("error", (error) => {
      // Unsubscribe all topics
      setState({ client, online, status: "error" });
    });
    client.on("reconnect", () => {
      // Unsubscribe all topics
      setState({ client, online, status: "reconnect" });
    });
    client.on("close", () => {
      // Unsubscribe all topics
      setState({ client, online, status: "close" });
    });
    client.on("offline", () => {
      // Unsubscribe all topics
      setState({ client, online, status: "offline" });
    });
    client.on("disconnect", () => {
      // Unsubscribe all topics
      setState({ client, status: "disconnect" });
    });
    setState({ client, online, status: "connecting" });
  };

  const subscribe = (
    topic: string,
    callback: (topic: string, message: Buffer) => void,
    options?: IClientSubscribeOptions
  ) => {
    state.client?.subscribe(topic, options || { qos: 0 });
    state.client?.on("message", (messagetopic: string, message: Buffer) => {
      if (match(topic, messagetopic)) {
        callback(messagetopic, message);
      }
    });
  };

  const publish = (
    topic: string,
    message: Buffer | string,
    options?: IClientPublishOptions
  ) => {
    if (state.client?.connected) {
      state.client.publish(topic, message, options || {});
    } else {
      throw new Error("Not connected");
    }
  };

  const value: MQTTContextValue = [
    { status: state.status, connected: state.client?.connected || false },
    { connect, disconnect, subscribe, publish },
  ];
  return <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>;
};

export default MQTTProvider;
