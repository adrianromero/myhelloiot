import React, { useEffect, useState } from "react";
import { Drawer, Button, Layout, Menu } from "antd";
import {
  ApiFilled,
  LoadingOutlined,
  CheckCircleOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useMQTTContext } from "../mqtt/MQTTProvider";
import AppHeader from "../AppHeader";
import { DashboardMenuProps } from "./DashboardMenu";

export type DashboardProps = {
  disconnectMenu: boolean;
  children: React.ReactElement<DashboardMenuProps, any>[];
};

const DISCONNECTKEY: React.Key = "action-disconnect";

const Dashboard: React.FC<DashboardProps> = ({ disconnectMenu, children }) => {
  const [{ status }, { disconnect }] = useMQTTContext();
  const [panelkey, setPanelkey] = useState<React.Key>("menu-0");
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  useEffect(() => window.scrollTo(0, 0), [panelkey]);

  function handleSelect({ key }: { key: React.Key }) {
    if (key !== DISCONNECTKEY) {
      hideDrawer();
      setPanelkey(key);
    }
  }

  function handleClick({ key }: { key: string | number }) {
    if (key === DISCONNECTKEY) {
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

  const menus: React.ReactElement<any, any>[] = [];
  let child: React.ReactElement<DashboardMenuProps, any> | undefined;
  let index = 0;

  React.Children.forEach(children, (c) => {
    if (typeof c.type !== "symbol") {
      const key: React.Key = "menu-" + index++;
      menus.push(
        <Menu.Item key={key} icon={c.props.icon}>
          {c.props.name}
        </Menu.Item>
      );
      if (key === panelkey) {
        child = c;
      }
    }
  });

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
            {menus}
            {disconnectMenu && (
              <>
                <Menu.Divider />
                <Menu.Item key="action-disconnect" icon={<ApiFilled />}>
                  Disconnect
                </Menu.Item>
              </>
            )}
          </Menu>
        </Drawer>
        {child}
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
