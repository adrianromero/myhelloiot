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
import "antd/dist/antd.css";
import AppError from "./AppError";

function useLocalStorage(
  key: string
): [string | null, (s: string | null) => void] {
  const [value, setStateValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );
  const setValue = useCallback(
    (s: string | null) => {
      if (s) {
        localStorage.setItem(key, s);
      } else {
        localStorage.removeItem(key);
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
      const item = localStorage.getItem("mqttconnect");
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

  let app;
  if (connected) {
    const item = localStorage.getItem("mqttconnect");
    if (item) {
      const connectinfo = JSON.parse(item) as ConnectInfo;
      const jsx = connectinfo.dashboard.data;
      const css = connectinfo.dashboardcss.data;
      if (jsx) {
        app = <AppDashboard jsx={jsx} css={css} />;
      } else {
        app = <AppError title="Failed to load JSX code." error="File empty." />;
      }
    } else {
      app = <AppError title="Failed to load JSX code" error="torage empty." />;
    }
  } else {
    app = <ContentConnect />;
  }

  return (
    <AppContext.Provider value={{ setConnected }}>{app}</AppContext.Provider>
  );
};

export default App;
