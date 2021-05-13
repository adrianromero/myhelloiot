import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardFilled,
  PictureFilled,
  ApiFilled,
  LoadingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useMQTTContext } from "../mqtt/MQTTProvider";
import AppHeader from "../AppHeader";
import PanelTests from "./PanelTests";
import PanelTestNumbers from "./PanelTestNumbers";

const DemoDashboard: React.FC<{}> = () => {
  const [{ status }, { disconnect }] = useMQTTContext();
  const [panelkey, setPanelkey] = useState<React.Key>("menu-1");
  // const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleSelect = ({ key }: { key: string | number }) => {
    if ((key as string).startsWith("menu-")) {
      setPanelkey(key);
    }
  };

  const handleClick = ({ key }: { key: string | number }) => {
    if ((key as string) === "action-disconnect") {
      disconnect();
    }
  };

  let toolbar;
  if (status === "Disconnected") {
    toolbar = null;
  } else if (status === "Connected") {
    toolbar = (
      <span className="myhConnectionStatus-icon">
        <CheckCircleOutlined style={{ color: "#52c41a" }} />
      </span>
    );
  } else {
    toolbar = (
      <>
        <span className="myhConnectionStatus-label">{status}</span>
        <span className="myhConnectionStatus-icon">
          <LoadingOutlined style={{ color: "white" }} />
        </span>
      </>
    );
  }

  return (
    <Layout>
      <AppHeader>{toolbar}</AppHeader>
      <Layout className="myhMainLayout">
        <Layout.Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          // trigger={null}
          // collapsible
          // collapsed={collapsed}
          // onCollapse={setCollapsed}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[panelkey.toString()]}
            onSelect={handleSelect}
            onClick={handleClick}
          >
            <Menu.Item key="menu-1" icon={<PictureFilled />}>
              Gallery
            </Menu.Item>
            <Menu.Item key="menu-2" icon={<DashboardFilled />}>
              Temperature
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="action-disconnect" icon={<ApiFilled />}>
              Disconnect
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          {panelkey === "menu-1" && <PanelTests />}
          {panelkey === "menu-2" && <PanelTestNumbers />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DemoDashboard;
