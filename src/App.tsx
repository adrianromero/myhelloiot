import React, { useEffect } from "react";

import { Layout } from "antd";
import { CheckCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";

import ContentConnect from "./connection/ContentConnect";
import ContentDashboard from "./dashboard/ContentDashboard";

import { useMQTTContext } from "./mqtt/MQTTProvider";

import "antd/dist/antd.css";
import "./App.css";
import { ConnectInfo, connectWithInfo } from "./ConnectionInfo";

function App() {
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

  let toolbar;
  if (status === "Disconnected") {
    toolbar = null;
  } else if (status === "Connected") {
    toolbar = (
      <span className="myhStatus-icon">
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </span>
    );
  } else {
    toolbar = (
      <>
        <span className="myhStatus">{status}</span>
        <span className="myhStatus-icon">
          <PlusCircleTwoTone spin twoToneColor="blue" />
        </span>
      </>
    );
  }

  return (
    <Layout className="myhApp">
      <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="myhHeader" style={{ flexGrow: 1 }}>
            MYHELLOIOT
          </span>
          {toolbar}
        </div>
      </Layout.Header>
      <Layout style={{ marginTop: 64, height: "calc(100vh - 64px)" }}>
        {status === "Disconnected" ? <ContentConnect /> : <ContentDashboard />}
      </Layout>
    </Layout>
  );
}

export default App;
