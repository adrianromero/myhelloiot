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
    ) => SubscribeHandler;
    unsubscribe: (handler: SubscribeHandler) => void;
    publish: (
      topic: string,
      message: Buffer | string,
      options?: IClientPublishOptions
    ) => void;
  }
];

export type SubscribeHandler = {
  topic: string;
  listener: (messagetopic: string, message: Buffer) => void;
} | null;

const MQTTContext: Context<MQTTContextValue> = createContext<MQTTContextValue>([
  {
    status: "close",
    connected: false,
  },
  {
    connect: () => {},
    disconnect: () => {},
    subscribe: () => null,
    unsubscribe: () => {},
    publish: () => {},
  },
]);

export const useMQTTContext = () => useContext(MQTTContext);

export const useMQTTSubscribe = (
  topic: string,
  callback: (topic: string, message: Buffer) => void,
  options?: IClientSubscribeOptions
): void => {
  const [{ status }, { subscribe, unsubscribe }] = useMQTTContext();
  useEffect(() => {
    const handler: SubscribeHandler = subscribe(topic, callback, options);
    return () => {
      unsubscribe(handler);
    };
  }, [status, topic]); // eslint-disable-line react-hooks/exhaustive-deps
};

export type MQTTProviderProps = { children: ReactNode };

const MQTTProvider: FC<MQTTProviderProps> = ({ children }) => {
  const [state, setState] = useState<{
    client?: MqttClient;
    online?: OnlineInfo;
    status: MQTTStatus;
    _internal: { subscriptions: string[] };
  }>({ status: "close", _internal: { subscriptions: [] } });

  const disconnect = () => {
    if (state.client && state.online) {
      state.client.publish(state.online.topic, "offline", {
        qos: state.online.qos,
        retain: state.online.retain,
      });
    }
    state.client?.removeAllListeners();
    state.client?.end();

    setState({ status: "close", _internal: { subscriptions: [] } });
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
      if (online) {
        client.publish(online.topic, "online", {
          qos: online.qos,
          retain: online.retain,
        });
      }
      setState({
        client,
        online,
        status: "connect",
        _internal: state._internal,
      });
    });
    client.on("error", (error) => {
      setState({ client, online, status: "error", _internal: state._internal });
    });
    client.on("reconnect", () => {
      setState({
        client,
        online,
        status: "reconnect",
        _internal: state._internal,
      });
    });
    client.on("close", () => {
      setState({ client, online, status: "close", _internal: state._internal });
    });
    client.on("offline", () => {
      setState({
        client,
        online,
        status: "offline",
        _internal: state._internal,
      });
    });
    client.on("disconnect", () => {
      setState({ client, status: "disconnect", _internal: state._internal });
    });
    setState({
      client,
      online,
      status: "connecting",
      _internal: { subscriptions: [] },
    });
  };

  const subscribe = (
    topic: string,
    callback: (topic: string, message: Buffer) => void,
    options?: IClientSubscribeOptions
  ): SubscribeHandler => {
    if (state.client && state.status === "connect" && topic !== "") {
      if (!state._internal.subscriptions.some((s) => s === topic)) {
        console.log("subscribing " + topic);
        state.client.subscribe(topic, options || { qos: 0 });
      }
      state._internal.subscriptions.push(topic);
      const listener = (messagetopic: string, message: Buffer) => {
        if (match(topic, messagetopic)) {
          callback(messagetopic, message);
        }
      };
      console.log(state._internal.subscriptions);
      state.client.on("message", listener);
      return { topic, listener };
    }
    return null;
  };

  const unsubscribe = (handler: SubscribeHandler) => {
    if (state.client && handler) {
      const inx: number = state._internal.subscriptions.findIndex(
        (s) => s === handler.topic
      );
      if (inx < 0) {
        throw new Error("Not subscribed");
      }
      state._internal.subscriptions.splice(inx, 1);
      if (!state._internal.subscriptions.some((s) => s === handler.topic)) {
        console.log("unsubscribing " + handler.topic);
        state.client.unsubscribe(handler.topic);
      }
      console.log(state._internal.subscriptions);
      state.client.off("message", handler.listener);
    }
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
    { connect, disconnect, subscribe, unsubscribe, publish },
  ];
  return <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>;
};

export default MQTTProvider;
