import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  Context,
  useContext,
} from "react";
import { QoS } from "mqtt";
import ContentConnect from "./connection/ContentConnect";
import AppDashboard from "./AppDashboard";
import { ConnectInfo } from "./connection/ConnectionInfo";
import MQTTProvider, { OnlineInfo, useMQTTContext } from "./mqtt/MQTTProvider";
import { samplejsx } from "./dashboard/samplejsx";
import "antd/dist/antd.css";

function useLocalStorage(
  key: string
): [string | null, (s: string | null) => void] {
  const [value, setStateValue] = useState<string | null>(() =>
    window.localStorage.getItem(key)
  );
  const setValue = useCallback(
    (s: string | null) => {
      if (s) {
        window.localStorage.setItem(key, s);
      } else {
        window.localStorage.removeItem(key);
      }
      setStateValue(s);
    },
    [key, setStateValue]
  );
  return [value, setValue];
}

type AppContextValue = { setConnected: (value: string | null) => void };

const AppContext: Context<AppContextValue> = createContext<AppContextValue>({
  setConnected: (s) => {},
});

export const useAppContext = () => useContext(AppContext);

const App: React.FC<{}> = () => (
  <MQTTProvider>
    <MQTTApp />
  </MQTTProvider>
);

const MQTTApp: React.FC<{}> = () => {
  const [, { connect, disconnect }] = useMQTTContext();
  const [connected, setConnected] = useLocalStorage("mqttconnectstatus");

  useEffect(() => {
    if (connected === "connected") {
      const item = window.localStorage.getItem("mqttconnect");
      if (item) {
        const connectinfo = JSON.parse(item) as ConnectInfo;
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
      }
    } else {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <AppContext.Provider value={{ setConnected }}>
      {connected ? <AppDashboard jsx={samplejsx} /> : <ContentConnect />}
    </AppContext.Provider>
  );
};

export default App;
