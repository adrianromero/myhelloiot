import React, { useEffect } from "react";
import ContentConnect from "./connection/ContentConnect";
import AppDashboard from "./AppDashboard";
import { ConnectInfo, connectWithInfo } from "./connection/ConnectionInfo";
import MQTTProvider, { useMQTTContext } from "./mqtt/MQTTProvider";
import "antd/dist/antd.css";

const App: React.FC<{}> = () => (
  <MQTTProvider>
    <MQTTApp />
  </MQTTProvider>
);

const MQTTApp: React.FC<{}> = () => {
  const [{ status }, { connect }] = useMQTTContext();

  useEffect(() => {
    const item = window.localStorage.getItem("mqttconnect");
    if (item) {
      const connectinfo = JSON.parse(item) as ConnectInfo;
      if (connectinfo.automatic) {
        connectWithInfo(connect, connectinfo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jsx = `
  <Dashboard disconnectMenu>
    <DashboardMenu  icon="BulbFilled"name="Test Panel">
      <PanelTests />
    </DashboardMenu>
    <DashboardMenu icon="DashboardFilled" name="Test Gauges">
      <PanelTestNumbers />
    </DashboardMenu>
  </Dashboard>
  `;

  return status === "Disconnected" ? (
    <ContentConnect />
  ) : (
    <AppDashboard jsx={jsx} />
  );
};

export default App;
