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
import { App as AntApp, ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import { Buffer } from "buffer";
import { store } from "./app/store";
import ConnectStored from "./connection/ConnectStored";
import ConnectRemote from "./connection/ConnectRemote";
import AppDashboard from "./AppDashboard";
import { ConnectInfo, loadStoreConnectInfo, loadStoreConnectCredentials, loadStoreConnected, loadResourceConnectInfo, ConnectCredentials, ConnectedStatus } from "./connection/ConnectionInfo";
import { useMQTTContext } from "./mqtt/MQTTHooks";
import MQTTProvider from "./mqtt/MQTTProvider";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectStatus, statusError } from "./app/sliceConnection";
import { statusLoading, statusReady } from "./app/sliceConnection";
import AppError from "./AppError";
import "antd/dist/reset.css";
import "./assets/main.css";
import AppLoading from "./AppLoading";
import AppErrorLoad from "./AppErrorLoad";


enum AppMode {
  DASHBOARD,
  STANDARD
}
const appmodekeys = Object.keys(AppMode);

const appmode = import.meta.env.VITE_MYH_APPMODE as keyof typeof AppMode;

let APPMODE: AppMode;
if (appmodekeys.includes(appmode)) {
  APPMODE = AppMode[appmode] as unknown as AppMode;
} else {
  APPMODE = AppMode.STANDARD;
}

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      // algorithm: theme.darkAlgorithm,
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <AntApp>
      <MQTTProvider>
        <Provider store={store}>
          <MQTTApp />
        </Provider>
      </MQTTProvider>
    </AntApp>
  </ConfigProvider>
);

const MQTTApp: React.FC = () => {
  const [{ error }, { brokerconnect, brokerdisconnect }] = useMQTTContext();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status.name === "READY") {
      if (status.connected === ConnectedStatus.CONNECTED) {
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
        // ConnectedStatus.DISCONNECTED;
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
        let connected: ConnectedStatus;
        if (APPMODE === AppMode.DASHBOARD) {
          connectInfo = await loadResourceConnectInfo("dashboard");
          connectCredentials = loadStoreConnectCredentials();
          connected = loadStoreConnected();
          // } else if (config.mode === "URLQUERY") {
          //   const params = new URL(document.location.href).searchParams;
          //   let isDashboard = params.get("dashboard") !== null;
          //   let isStandard = params.get("standard") !== null;
          //   connectInfo = loadStoreConnectInfo();
          //   connectCredentials = loadStoreConnectCredentials();
          //   connected = loadStoreConnected();
        } else {// STANDARD (Default)
          connectInfo = loadStoreConnectInfo();
          connectCredentials = loadStoreConnectCredentials();
          connected = loadStoreConnected();
        }

        dispatch(statusReady({ connectInfo, connectCredentials, connected }));
      };
      loadConfiguration().catch((error) => {
        dispatch(statusError({ message: "Cannot load the application configuration", error }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status.name === "INITIAL" || status.name === "LOADING") {
    return <AppLoading />;
  }

  if (status.name === "ERROR") {
    return <AppErrorLoad title="Error loading MYHELLOIOT" error={status.error} />;
  }

  // Now status === "READY"

  if (status.connected === ConnectedStatus.DISCONNECTED) {
    // Connection Component
    if (APPMODE === AppMode.DASHBOARD) {
      return (
        <ConnectRemote
          connectInfo={status.connectInfo}
          connectCredentials={status.connectCredentials}
        />
      );

    }
    // mode === STANDARD (Default)
    return (
      <ConnectStored
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
