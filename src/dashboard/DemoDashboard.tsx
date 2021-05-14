import React, { useState } from "react";
import { Drawer, Button, Layout, Menu } from "antd";
import {
  DashboardFilled,
  PictureFilled,
  ApiFilled,
  LoadingOutlined,
  CheckCircleOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useMQTTContext } from "../mqtt/MQTTProvider";
import AppHeader from "../AppHeader";
import PanelTests from "./PanelTests";
import PanelTestNumbers from "./PanelTestNumbers";

const DemoDashboard: React.FC<{}> = () => {
  const [{ status }, { disconnect }] = useMQTTContext();
  const [panelkey, setPanelkey] = useState<React.Key>("menu-1");
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  function handleSelect({ key }: { key: string | number }) {
    if ((key as string).startsWith("menu-")) {
      hideDrawer();
      setPanelkey(key);
    }
  }

  function handleClick({ key }: { key: string | number }) {
    if ((key as string) === "action-disconnect") {
      hideDrawer();
      disconnect();
    }
  }

  function showDrawer() {
    setVisibleDrawer(true);
  }

  function hideDrawer() {
    setVisibleDrawer(false);
  }

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
      <AppHeader>
        <div className="myhMenuDisplayButton">
          <Button onClick={showDrawer} ghost>
            <MenuUnfoldOutlined />
          </Button>
        </div>
        {toolbar}
      </AppHeader>
      <Layout.Content className="myhMainLayout">
        <Drawer
          className="myhDrawerMenu"
          placement="left"
          closable={false}
          onClose={hideDrawer}
          visible={visibleDrawer}
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
        </Drawer>

        {panelkey === "menu-1" && <PanelTests />}
        {panelkey === "menu-2" && <PanelTestNumbers />}
      </Layout.Content>
    </Layout>
  );
};

export default DemoDashboard;
