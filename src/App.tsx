import React, { MouseEvent } from "react";

import { Layout, Menu, Button, message } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useMQTTContext, useMQTTSubscribe } from "./mqtt/MQTTProvider";
import PanelTests from "./PanelTests";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  const [
    { status, connected },
    { connect, disconnect, publish },
  ] = useMQTTContext();

  useMQTTSubscribe("pepe/cosa/cosita", (topic: string, mqttmessage: Buffer) => {
    message.info(mqttmessage.toString());
  });

  const handleConnect = (e: MouseEvent<HTMLElement>) => {
    message.info("me conecto");
    const url = "ws://broker.mqttdashboard.com:8000/mqtt";
    const username = "";
    const password = "";
    // const url = "ws://192.168.1.12:9001";
    // const username = "DVES_USER";
    // const password = "DVES_PASS";

    connect({
      url,
      options: {
        username,
        password,
        connectTimeout: 5000,
        clientId:
          "myhelloiot_" + Math.random().toString(16).substr(2).padEnd(13, "0"),
      },
    });
  };

  const handleDisconnect = (e: MouseEvent<HTMLElement>) => {
    message.info("me desconecto");
    disconnect();
  };
  const handlePublish = (e: MouseEvent<HTMLElement>) => {
    publish("pepe/cosa/cosita", "cocoloco");
  };

  const { Header, Sider, Content } = Layout;
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        Header
      </Header>

      <Layout style={{ marginTop: 64 }}>
        <Sider trigger={null} collapsible collapsed={false}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Connect
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: "24px" }}>
          <div>
            <Button type="primary" onClick={handleConnect}>
              Connect
            </Button>
            <Button type="primary" onClick={handleDisconnect}>
              Disconnect
            </Button>
            <Button type="default" onClick={handlePublish}>
              Publish Message
            </Button>
          </div>
          <div>{`Status: ${status}, Connected: ${connected}`}</div>
          <PanelTests />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
