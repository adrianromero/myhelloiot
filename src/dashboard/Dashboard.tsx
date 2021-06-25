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
import { Drawer, Button, Layout, Menu, Space, Popover, Divider } from "antd";
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
import DashboardMenu, { DashboardMenuProps } from "./DashboardMenu";
import ConnectionInfo from "./ConnectionInfo";

export type DashboardProps = {
  disconnectVisible: boolean;
  className?: string;
  children: React.ReactElement<DashboardMenuProps, any>[];
};

const Dashboard: React.FC<DashboardProps> = ({
  disconnectVisible,
  className,
  children,
}) => {
  const [{ options, status }] = useMQTTContext();
  const dispatch = useDispatch<AppStoreDispatch>();
  const [panelkey, setPanelkey] = useState<React.Key>("menu-0");
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  useEffect(() => window.scrollTo(0, 0), [panelkey]);

  function handleSelect({ key }: { key: React.Key }) {
    hideDrawer();
    setPanelkey(key);
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
      <Space>
        <span className="myhConnectionStatus-label">{options.hostname}</span>
        <span className="myhConnectionStatus-icon">
          <CheckCircleOutlined style={{ color: "#52c41a" }} />
        </span>
      </Space>
    );
  } else {
    toolbar = (
      <Space>
        <span className="myhConnectionStatus-label">{status}</span>
        <span className="myhConnectionStatus-icon">
          <LoadingOutlined style={{ color: "white" }} />
        </span>
      </Space>
    );
  }

  const menus: React.ReactElement<any, any>[] = [];
  let child: React.ReactElement<DashboardMenuProps, any> | undefined;
  let index = 0;

  React.Children.forEach(children, (c) => {
    if (React.isValidElement(c) && c.type === DashboardMenu) {
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

  const popover = (
    <>
      <ConnectionInfo options={options} />
      {!disconnectVisible && (
        <>
          <Divider />
          <Button
            type="primary"
            icon={<ApiFilled />}
            onClick={() => {
              dispatch({ type: "set", newState: { connected: "" } });
            }}
          >
            Disconnect
          </Button>
        </>
      )}
    </>
  );
  return (
    <Layout className={className}>
      <AppHeader>
        <div className="myhMenuDisplayButton">
          <Button onClick={showDrawer} ghost>
            <MenuUnfoldOutlined />
          </Button>
        </div>
        <Popover placement="bottomRight" content={popover} trigger="click">
          <Button type="text">{toolbar}</Button>
        </Popover>
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
          >
            {menus}
          </Menu>
        </Drawer>
        {child}
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
