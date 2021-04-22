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
  | ""
  | "end"
  | "close"
  | "offline"
  | "connect"
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
  { status: MQTTStatus; ready: boolean; connected: boolean },
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
    status: "",
    ready: false,
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
  const [{ ready }, { subscribe, unsubscribe }] = useMQTTContext();
  useEffect(() => {
    const handler: SubscribeHandler = subscribe(topic, callback, options);
    return () => {
      unsubscribe(handler);
    };
  }, [ready, topic]); // eslint-disable-line react-hooks/exhaustive-deps
};

export type MQTTProviderProps = { children: ReactNode };

const MQTTProvider: FC<MQTTProviderProps> = ({ children }) => {
  const [state, setState] = useState<{
    status: MQTTStatus;
    _internal: {
      client?: MqttClient;
      online?: OnlineInfo;
      subscriptions: string[];
    };
  }>({ status: "", _internal: { subscriptions: [] } });

  const disconnect = () => {
    if (state._internal.client && state._internal.online) {
      state._internal.client.publish(state._internal.online.topic, "offline", {
        qos: state._internal.online.qos,
        retain: state._internal.online.retain,
      });
    }
    state._internal.client?.end();
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
      setState((s) => {
        if (s._internal.client && s._internal.online) {
          s._internal.client.publish(s._internal.online.topic, "online", {
            qos: s._internal.online.qos,
            retain: s._internal.online.retain,
          });
        }
        return {
          status: "connect",
          _internal: s._internal,
        };
      });
    });
    client.on("error", (error) => {
      setState((s) => ({ status: "error", _internal: s._internal }));
    });
    client.on("reconnect", () => {
      setState((s) => ({
        status: "reconnect",
        _internal: s._internal,
      }));
    });
    client.on("close", () => {
      setState((s) => ({ status: "close", _internal: s._internal }));
    });
    client.on("end", () => {
      setState((s) => ({ status: "end", _internal: { subscriptions: [] } }));
    });
    client.on("offline", () => {
      setState((s) => ({
        status: "offline",
        _internal: s._internal,
      }));
    });
    client.on("disconnect", () => {
      setState((s) => ({ status: "disconnect", _internal: s._internal }));
    });
    setState({
      status: "",
      _internal: { client, online, subscriptions: [] },
    });
  };

  const subscribe = (
    topic: string,
    callback: (topic: string, message: Buffer) => void,
    options?: IClientSubscribeOptions
  ): SubscribeHandler => {
    if (state._internal.client && topic !== "") {
      if (!state._internal.subscriptions.some((s) => s === topic)) {
        console.log("subscribing " + topic);
        state._internal.client.subscribe(topic, options || { qos: 0 });
      }
      state._internal.subscriptions.push(topic);
      const listener = (messagetopic: string, message: Buffer) => {
        if (match(topic, messagetopic)) {
          callback(messagetopic, message);
        }
      };
      console.log(state._internal.subscriptions);
      state._internal.client.on("message", listener);
      return { topic, listener };
    }
    return null;
  };

  const unsubscribe = (handler: SubscribeHandler) => {
    if (state._internal.client && handler) {
      const inx: number = state._internal.subscriptions.findIndex(
        (s) => s === handler.topic
      );
      if (inx < 0) {
        throw new Error("Not subscribed");
      }
      state._internal.subscriptions.splice(inx, 1);
      if (!state._internal.subscriptions.some((s) => s === handler.topic)) {
        console.log("unsubscribing " + handler.topic);
        state._internal.client.unsubscribe(handler.topic);
      }
      console.log(state._internal.subscriptions);
      state._internal.client.off("message", handler.listener);
    }
  };

  const publish = (
    topic: string,
    message: Buffer | string,
    options?: IClientPublishOptions
  ) => {
    if (state._internal.client?.connected) {
      state._internal.client.publish(topic, message, options || {});
    } else {
      throw new Error("Not connected");
    }
  };

  const value: MQTTContextValue = [
    {
      status: state.status,
      ready: !!state._internal.client,
      connected: state._internal.client?.connected || false,
    },
    { connect, disconnect, subscribe, unsubscribe, publish },
  ];

  console.log(value[0]);
  return <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>;
};

export default MQTTProvider;
