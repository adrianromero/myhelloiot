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
import { QoS } from "mqtt";
import { useSelector } from "react-redux";
import ContentConnect from "./connection/ContentConnect";
import AppDashboard from "./AppDashboard";
import { ConnectInfo } from "./connection/ConnectionInfo";
import MQTTProvider, { OnlineInfo, useMQTTContext } from "./mqtt/MQTTProvider";
import AppStoreProvider, { AppStoreValue } from "./AppStoreProvider";
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
  const [, { connect, disconnect }] = useMQTTContext();
  const connected = useSelector<AppStoreValue, string>((s) => s.connected);
  const connectInfo = useSelector<AppStoreValue, ConnectInfo>(
    (s) => s.connectInfo
  );

  useEffect(() => {
    if (connected === "connected") {
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
      } = connectInfo;
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
    } else {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return <ConnectedApp />;
};

const ConnectedApp: React.FC<{}> = () => {
  const [{ error }] = useMQTTContext();
  const connected = useSelector<AppStoreValue, string>((s) => s.connected);
  const jsx = useSelector<AppStoreValue, string>(
    (s) => s.connectInfo.dashboard.data
  );
  const css = useSelector<AppStoreValue, string>(
    (s) => s.connectInfo.dashboardcss.data
  );
  if (!connected) {
    // Connection Component
    return <ContentConnect />;
  }

  // Connectiiiing
  if (error) {
    return (
      <AppError
        title="Failed to connect to MQTT broker."
        error={error.message}
      />
    );
  }

  if (!jsx) {
    return <AppError title="Failed to load JSX code" error="Storage empty." />;
  }

  // Application connected!!!
  return <AppDashboard jsx={jsx} css={css} />;
};

export default App;
