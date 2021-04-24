import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";

import PanelTests from "./panels/PanelTests";
import PanelConnect from "./panels/PanelConnect";
import PanelTestSubs from "./panels/PanelTestSubs";
import { useMQTTContext } from "./mqtt/MQTTProvider";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  const { Header, Sider, Content } = Layout;
  const [{ status }] = useMQTTContext();
  const [panelkey, setPanelkey] = useState<React.Key>("1");

  return (
    <Layout className="myhApp">
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="myhHeader" style={{ flexGrow: 1 }}>
            MYHELLOIOT
          </span>
          {status !== "Connected" && status !== "Disconnected" && (
            <>
              <span className="myhStatus">{status}</span>
              <span className="myhStatus-icon">
                <PlusCircleTwoTone spin twoToneColor="blue" />
              </span>{" "}
            </>
          )}
          {status === "Connected" && (
            <span className="myhStatus-icon">
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </span>
          )}
          {status === "Disconnected" && (
            <span className="myhStatus-icon">
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
            </span>
          )}
        </div>
      </Header>
      <Layout style={{ marginTop: 64, height: "calc(100vh - 64px)" }}>
        <Sider trigger={null} collapsible collapsed={false}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[panelkey.toString()]}
            onSelect={({ key }) => setPanelkey(key)}
          >
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="connect" icon={<UserOutlined />}>
              Connect
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          {panelkey === "1" && <PanelTests />}
          {panelkey === "2" && <PanelTestSubs />}
          {panelkey === "connect" && <PanelConnect />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
