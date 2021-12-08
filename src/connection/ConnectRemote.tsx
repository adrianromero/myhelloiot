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

import React from "react";
import { Button, Layout } from "antd";
import { useDispatch } from "react-redux";
import { DispatchConnect } from "../AppStoreProvider";
import { ConnectInfo } from "./ConnectionInfo";

import AppHeader from "../AppHeader";

import "./ContentConnect.css";
import { ApiFilled } from "@ant-design/icons";

const ConnectRemote: React.FC<{ connectInfo: ConnectInfo }> = ({
  connectInfo,
}) => {
  const dispatch = useDispatch<DispatchConnect>();
  return (
    <Layout className="myhLayout">
      <AppHeader>
        <Button
          icon={<ApiFilled />}
          type="primary"
          onClick={() => {
            dispatch({
              type: "connect",
              connectInfo,
              connectInfoType: "REMOTE",
            });
          }}
        >
          Connect
        </Button>
      </AppHeader>
      <Layout.Content className="myhLayoutContent">
        <div className="myhLayoutContent-panel">Remote</div>
      </Layout.Content>
    </Layout>
  );
};
export default ConnectRemote;
