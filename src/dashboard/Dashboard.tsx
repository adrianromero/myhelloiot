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

import React, { useEffect, useState } from "react";
import { Drawer, Button, Layout, Menu } from "antd";
import {
  ApiFilled,
  LoadingOutlined,
  CheckCircleOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useMQTTContext } from "../mqtt/MQTTProvider";
import AppHeader from "../AppHeader";
import { AppStoreDispatch } from "../AppStoreProvider";
import { DashboardMenuProps } from "./DashboardMenu";

export type DashboardProps = {
  disconnectMenu: boolean;
  className?: string;
  children: React.ReactElement<DashboardMenuProps, any>[];
};

const DISCONNECTKEY: React.Key = "action-disconnect";

const Dashboard: React.FC<DashboardProps> = ({
  disconnectMenu,
  className,
  children,
}) => {
  const [{ hostname, status }] = useMQTTContext();
  const dispatch = useDispatch<AppStoreDispatch>();
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
      dispatch({ type: "set", newState: { connected: "" } });
    }
  }

  function showDrawer() {
    setVisibleDrawer(true);
  }

  function hideDrawer() {
    setVisibleDrawer(false);
  }

  let toolbar;
  if (status === "Connected") {
    toolbar = (
      <>
        <span className="myhConnectionStatus-label">{hostname}</span>
        <span className="myhConnectionStatus-icon">
          <CheckCircleOutlined style={{ color: "#52c41a" }} />
        </span>
      </>
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
    <Layout className={className}>
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