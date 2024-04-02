/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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
import { store } from "./app/store";
import ConnectStored from "./connection/ConnectStored";
import ConnectRemote from "./connection/ConnectRemote";
import AppDashboard from "./AppDashboard";
import { ConnectInfo, loadStoreConnectInfo, loadStoreConnectCredentials, loadStoreConnected, loadResourceConnectInfo, ConnectCredentials, defaultConnectInfo, defaultConnectCredentials } from "./connection/ConnectionInfo";
import { useMQTTContext } from "./mqtt/MQTTHooks";
import MQTTProvider from "./mqtt/MQTTProvider";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectStatus, ApplicationMode, statusError } from "./app/sliceConnection";
import { statusLoading, statusReady } from "./app/sliceConnection";
import AppError from "./AppError";
import "antd/dist/reset.css";
import "./assets/main.css";

type Configuration = {
  mode: ApplicationMode
}

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
  const [{ error }, { brokerconnect, brokerdisconnect }] = useMQTTContext();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status.name === "READY") {
      if (status.connected === "connected") {
        const {
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
        } = status.connectInfo;
        const {
          username, password
        } = status.connectCredentials;
        brokerconnect({
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
        // "disconnected";
        brokerdisconnect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.name, status.name === "READY" ? status.connected : null]);

  useEffect(() => {
    if (status.name === "INITIAL") {
      dispatch(statusLoading());
      const loadConfiguration = async (): Promise<void> => {
        let connectInfo: ConnectInfo;
        let connectCredentials: ConnectCredentials;
        let connected: "connected" | "disconnected";
        const configfetch = await fetch("./resources/configuration.json")
        const config: Configuration = await configfetch.json();
        if (config.mode === "DASHBOARD") {
          connectInfo = await loadResourceConnectInfo("dashboard");
          connectCredentials = loadStoreConnectCredentials();
          connected = loadStoreConnected();
        } else if (config.mode === "STANDARD") {
          connectInfo = loadStoreConnectInfo();
          connectCredentials = loadStoreConnectCredentials();
          connected = loadStoreConnected();
        } else {
          connectInfo = defaultConnectInfo;
          connectCredentials = defaultConnectCredentials;
          connected = "disconnected";
        }

        dispatch(statusReady({ mode: config.mode, connectInfo, connectCredentials, connected }));
      };
      loadConfiguration().catch((error) => {
        dispatch(statusError({ message: "Cannot load the application configuration", error }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status.name === "INITIAL" || status.name === "LOADING") {
    // TODO: improve loading component
    return "Loading application..."; // Loading application
  }

  if (status.name === "ERROR") {
    // TODO: Improve error component and   in general improve error management
    return "Error loading application..." + status.error;
  }

  // Now status === "READY"

  if (status.connected === "disconnected") {
    // Connection Component
    if (status.mode === "STANDARD") {
      return (
        <ConnectStored
          connectInfo={status.connectInfo}
          connectCredentials={status.connectCredentials}
        />
      );
    }
    // mode === "DASHBOARD"
    return (
      <ConnectRemote
        connectInfo={status.connectInfo}
        connectCredentials={status.connectCredentials}
      />
    );
  }

  // Application connected!!!

  if (error) {
    return (
      <AppError
        title="Failed to connect to MQTT broker"
        errorMessage={error.message}
      />
    );
  }
  const jsx = status.connectInfo.dashboard.data;
  const css = status.connectInfo.dashboardcss.data;
  return <AppDashboard jsx={jsx} css={css} />;
};

export default App;
