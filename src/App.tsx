/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
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
import AppError from "./AppError";
import "antd/dist/antd.css";
import "./assets/main.css";

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
  const [{ error }, { connect, disconnect }] = useMQTTContext();
  const [connected, setConnected] = useLocalStorage("mqttconnectstatus");

  useEffect(() => {
    if (connected === "connected") {
      const item = localStorage.getItem("mqttconnect");
      if (item) {
        const connectinfo = JSON.parse(item) as ConnectInfo;
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
  if (error) {
    app = (
      <AppError
        title="Failed to connect to MQTT broker."
        error={error.message}
      />
    );
  } else if (connected) {
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
