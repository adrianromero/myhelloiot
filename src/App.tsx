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

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppStoreProvider, {
  AppStoreValue,
  DispatchLoadConnectInfo,
} from "./AppStoreProvider";
import ConnectStored from "./connection/ConnectStored";
import ConnectRemote from "./connection/ConnectRemote";
import AppDashboard from "./AppDashboard";
import { ConnectInfo, loadConnectInfo } from "./connection/ConnectionInfo";
import MQTTProvider, { OnlineInfo, useMQTTContext } from "./mqtt/MQTTProvider";
import AppError from "./AppError";
import "antd/dist/antd.css";
import "./assets/main.css";

const App: React.FC<{}> = () => (
  <MQTTProvider>
    <AppStoreProvider>
      <MQTTApp />
    </AppStoreProvider>
  </MQTTProvider>
);

const MQTTApp: React.FC<{}> = () => {
  const [{ error }, { connect, disconnect }] = useMQTTContext();
  const connected = useSelector<AppStoreValue, string>((s) => s.connected);
  const username = useSelector<AppStoreValue, string>((s) => s.username);
  const password = useSelector<AppStoreValue, string>((s) => s.password);
  const clientId = useSelector<AppStoreValue, string>((s) => s.clientId);
  const connectInfo = useSelector<AppStoreValue, ConnectInfo | undefined>(
    (s) => s.connectInfo
  );
  const connectInfoType = useSelector<
    AppStoreValue,
    "REMOTE" | "STORED" | undefined
  >((s) => s.connectInfoType);
  const dispatchLoad = useDispatch<DispatchLoadConnectInfo>();

  useEffect(() => {
    if (connectInfo) {
      if (connected === "connected") {
        const {
          url,
          keepalive,
          connectTimeout,
          reconnectPeriod,
          onlinetopic,
          onlineqos,
        } = connectInfo;
        const online: OnlineInfo | undefined = onlinetopic
          ? {
            topic: onlinetopic,
            qos: onlineqos,
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
      } else {
        disconnect();
      }
    } else {
      const fetchConnectInfo = async (): Promise<{
        connectInfo: ConnectInfo;
        connectInfoType: "REMOTE" | "STORED";
      }> => {
        const app = new URLSearchParams(window.location.search).get(
          "connectinfo"
        );
        if (app) {
          const infofetch = fetch("./resources/" + app + "/connectinfo.json");
          const jsxfetch = fetch("./resources/" + app + "/dashboard.jsx");
          const cssfetch = fetch("./resources/" + app + "/dashboard.css");
          const [infobody, jsxbody, cssbody] = await Promise.all([
            infofetch,
            jsxfetch,
            cssfetch,
          ]);
          const [infodata, jsxdata, cssdata] = await Promise.all([
            infobody.json(),
            jsxbody.text(),
            cssbody.text(),
          ]);
          infodata.dashboard.data = jsxdata;
          infodata.dashboardcss.data = cssdata;
          return { connectInfo: infodata, connectInfoType: "REMOTE" };
        }
        return Promise.resolve({
          connectInfo: loadConnectInfo(),
          connectInfoType: "STORED",
        });
      };
      fetchConnectInfo().then(({ connectInfo, connectInfoType }) =>
        dispatchLoad({ type: "loadconnectinfo", connectInfo, connectInfoType })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, connectInfo]);

  if (!connectInfo || !connectInfoType) {
    return null; // Loading
  }

  if (!connected) {
    // Connection Component
    if (connectInfoType === "STORED") {
      return (
        <ConnectStored
          connectInfo={connectInfo}
          username={username}
          password={password}
          clientId={clientId}
        />
      );
    }
    return (
      <ConnectRemote
        connectInfo={connectInfo}
        username={username}
        password={password}
        clientId={clientId}
      />
    );
  }

  // Connectiiiing
  if (error) {
    return (
      <AppError
        title="Failed to connect to MQTT broker"
        error={error.message}
      />
    );
  }

  const jsx = connectInfo.dashboard.data;
  const css = connectInfo.dashboardcss.data;
  if (!jsx) {
    return <AppError title="Failed to load JSX code" error="Storage empty" />;
  }

  // Application connected!!!
  return <AppDashboard jsx={jsx} css={css} />;
};

export default App;
