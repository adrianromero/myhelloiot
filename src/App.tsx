import React from "react";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import PanelTests from "./panels/PanelTests";
import PanelConnect from "./panels/PanelConnect";
import PanelTestSubs from "./panels/PanelTestSubs";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        MYHELLOIOT
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
        <Content>
          <PanelTestSubs />
          <PanelConnect />
          <PanelTests />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
