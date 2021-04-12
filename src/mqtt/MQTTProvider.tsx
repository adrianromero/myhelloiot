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

type MQTTContextValue = [
  { status: MQTTStatus; connected: boolean },
  {
    connect: (url: string, options?: IClientOptions) => void;
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
    connect: (url: string, options?: IClientOptions) => {},
    disconnect: () => {},
    subscribe: (
      topic: string,
      callback: (topic: string, message: Buffer) => void
    ) => {},
    publish: (topic: string, message: Buffer | string) => {},
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
    if (status === "connect" && topic !== "") {
      subscribe(topic, callback, options);
    }
  }, [status, topic]); // eslint-disable-line react-hooks/exhaustive-deps
};

export type MQTTProviderProps = { children: ReactNode };

const MQTTProvider: FC<MQTTProviderProps> = ({ children }) => {
  const [state, setState] = useState<{
    client: MqttClient | null;
    status: MQTTStatus;
  }>({ client: null, status: "close" });

  const connect = (url: string, options?: IClientOptions) => {
    state.client?.removeAllListeners();
    state.client?.end();

    const client: MqttClient = mqtt.connect(url, options);
    client.on("connect", () => {
      setState({ client, status: "connect" });
    });
    client.on("error", (error) => {
      setState({ client, status: "error" });
    });
    client.on("reconnect", () => {
      setState({ client, status: "reconnect" });
    });
    client.on("close", () => {
      setState({ client, status: "close" });
    });
    client.on("offline", () => {
      setState({ client, status: "offline" });
    });
    client.on("disconnect", () => {
      setState({ client, status: "disconnect" });
    });
    setState({ client, status: "connecting" });
  };

  const disconnect = () => {
    state.client?.end();
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
      state.client?.publish(topic, message, options || {});
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
