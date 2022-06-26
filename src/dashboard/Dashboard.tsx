/*
MYHELLOIOT
Copyright (C) 2021-2022 Adrián Romero
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
import SVGIcon from "../format/SVGIcon";
import { faBars, faImage } from "@fortawesome/free-solid-svg-icons";
import { useAppStoreProperty } from "../AppStoreProvider";
import AppHeader from "../AppHeader";
import {
  MQTTMessage,
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";
import DashboardContent, { DashboardContentProps } from "./DashboardContent";
import ConnectionInfo from "./ConnectionInfo";

import "./Dashboard.css";

export type DashboardProps = {
  instancekey?: string;
  title?: string;
  topic?: string;
  disconnectDisabled?: boolean;
  className?: string;
  children?: React.ReactElement<DashboardContentProps, any>[];
};

const Dashboard: React.FC<DashboardProps> = ({
  instancekey = "",
  title,
  topic = "",
  disconnectDisabled = false,
  className = "",
  children,
}) => {
  const [panelkey, setPanelkey] = useAppStoreProperty(
    instancekey + "-dashboard-panelkey"
  );
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [{ connected }, { publish }] = useMQTTContext();
  useMQTTSubscribe(topic, (mqttmessage: MQTTMessage) => {
    const key = mqttmessage.message.toString();
    if (key !== panelkey) {
      hideDrawer();
      setPanelkey(key);
    }
  });
  useEffect(() => window.scrollTo(0, 0), [panelkey]);

  function handleSelect({ key }: { key: string }) {
    hideDrawer();
    setPanelkey(key);
    publish(topic, Buffer.from(key), {
      retain: true,
    });
  }

  function showDrawer() {
    setVisibleDrawer(true);
  }

  function hideDrawer() {
    setVisibleDrawer(false);
  }

  const menus: React.ReactElement<any, any>[] = [];
  const dcchildren: React.ReactElement<DashboardContentProps, any>[] = [];
  const remainingchildren: React.ReactElement<any, any>[] = [];
  let cvisible: React.ReactElement<DashboardContentProps, any> | undefined;
  let keyvisible: string | undefined;
  let menDisabled: boolean = false;
  let disDisabled: boolean = false;
  let index = 0;

  React.Children.forEach(children, (c) => {
    if (React.isValidElement(c)) {
      if (c.type === DashboardContent) {
        const key: string = `menu-${index++}`;
        if (c.props.name) {
          menus.push(
            <Menu.Item
              key={key}
              icon={c.props.icon ?? <SVGIcon icon={faImage} />}
            >
              {c.props.name}
            </Menu.Item>
          );
        }
        if (key === panelkey || !cvisible) {
          cvisible = c;
          keyvisible = key;
          menDisabled = c.props.menuDisabled ?? false;
          disDisabled = c.props.disconnectDisabled ?? false;
        }
        dcchildren.push(c);
      } else {
        remainingchildren.push(c);
      }
    }
  });

  return (
    <Layout className={`myhLayout ${className}`}>
      <AppHeader title={title}>
        {menus.length > 0 && (
          <div className="myhDashboard-buttonmenu">
            <Button
              onClick={showDrawer}
              ghost
              hidden={menDisabled}
              disabled={!connected}
            >
              <SVGIcon icon={faBars} />
            </Button>
          </div>
        )}
        <ConnectionInfo
          disconnectDisabled={disconnectDisabled || disDisabled}
        />
      </AppHeader>
      <Layout.Content className="myhLayoutContent">
        {menus.length > 0 && (
          <Drawer
            className="myhDashboard-drawermenu"
            placement="left"
            closable={false}
            onClose={hideDrawer}
            visible={visibleDrawer}
          >
            <Menu
              theme="light"
              mode="inline"
              disabled={!connected}
              selectedKeys={keyvisible ? [keyvisible] : []}
              onSelect={handleSelect}
            >
              {menus}
            </Menu>
          </Drawer>
        )}
        {dcchildren.map((c) => (
          <div key={c.key} style={c === cvisible ? {} : { display: "none" }}>
            {c}
          </div>
        ))}
        {remainingchildren}
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
