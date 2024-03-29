/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import { Buffer } from "buffer";
import { decompressFromEncodedURIComponent } from "lz-string";
import { store } from "./app/store";
import ConnectStored from "./connection/ConnectStored";
import ConnectRemote from "./connection/ConnectRemote";
import AppDashboard from "./AppDashboard";
import { ConnectInfo, loadConnectInfo } from "./connection/ConnectionInfo";
import { useMQTTContext } from "./mqtt/MQTTHooks";
import MQTTProvider from "./mqtt/MQTTProvider";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectConnected, selectConnectInfo, loadConnectionInfo } from "./app/sliceConnection";
import AppError from "./AppError";
import "antd/dist/reset.css";
import "./assets/main.css";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      // algorithm: theme.darkAlgorithm,
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <MQTTProvider>
      <Provider store={store}>
        <MQTTApp />
      </Provider>
    </MQTTProvider>
  </ConfigProvider>
);

const MQTTApp: React.FC = () => {
  const [{ error }, { connect, disconnect }] = useMQTTContext();
  const dispatch = useAppDispatch();
  const connected = useAppSelector(selectConnected);
  const connectInfo = useAppSelector(selectConnectInfo);

  const search = new URLSearchParams(window.location.search);
  const app = search.get("connectinfo");
  const c = search.get("c");
  const stored = !(app || c);

  useEffect(() => {
    if (connectInfo && connected === "connected") {
      const {
        username,
        password,
        clientId,
        url,
        keepalive,
        protocolVersion,
        clean,
        connectTimeout,
        reconnectPeriod,
        will,
        willtopic,
        willqos,
        willretain,
        willpayload
      } = connectInfo;
      connect({
        url,
        options: {
          username,
          password,
          clientId,
          keepalive,
          protocolId: protocolVersion === 3 ? "MQIsdp" : "MQTT",
          protocolVersion,
          clean,
          connectTimeout,
          reconnectPeriod,
          will: will ? {
            topic: willtopic,
            qos: willqos,
            retain: willretain,
            payload: Buffer.from(willpayload || '')
          } : undefined
        },
      });
    } else {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, connectInfo]);

  useEffect(() => {
    if (!connectInfo) {
      const fetchConnectInfo = async (): Promise<{
        connectInfo: ConnectInfo;
      }> => {
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
          return { connectInfo: infodata };
        }
        if (c) {
          return { connectInfo: JSON.parse(decompressFromEncodedURIComponent(c)) };
        }
        return Promise.resolve({
          connectInfo: loadConnectInfo(),
        });
      };
      fetchConnectInfo().then(({ connectInfo }) =>
        dispatch(loadConnectionInfo({ connectInfo }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectInfo]);

  if (!connectInfo) {
    return null; // Loading application
  }

  if (!connected) {
    // Connection Component
    if (stored) {
      return (
        <ConnectStored
          connectInfo={connectInfo}
        />
      );
    }
    return (
      <ConnectRemote
        connectInfo={connectInfo}
      />
    );
  }

  // Connectiiiing
  if (error) {
    return (
      <AppError
        title="Failed to connect to MQTT broker"
        errorMessage={error.message}
      />
    );
  }

  const jsx = connectInfo.dashboard.data;
  const css = connectInfo.dashboardcss.data;
  if (!jsx) {
    return <AppError title="Failed to load JSX code" errorMessage="Application storage is empty." />;
  }

  // Application connected!!!
  return <AppDashboard jsx={jsx} css={css} />;
};

export default App;
