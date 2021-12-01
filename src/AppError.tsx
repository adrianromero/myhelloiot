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
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import { DispatchDisconnect } from "./AppStoreProvider";
import AppHeader from "./AppHeader";
import ModalError from "./ModalError";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./AppError.css";
import ConnectionStatus from "./dashboard/ConnectionStatus";

const AppError: React.FC<{ title: string; error: string; jsx?: string }> = ({
  title,
  error,
  jsx,
}) => {
  const dispatch = useDispatch<DispatchDisconnect>();

  return (
    <>
      <ModalError
        title={title}
        error={error}
        onOk={() => dispatch({ type: "disconnect" })}
        visible
      />
      <Layout className="myhLayout">
        <AppHeader>
          <ConnectionStatus
            label="Error"
            icon={<CloseCircleOutlined style={{ color: "#FF0000" }} />}
          />
        </AppHeader>
        <Layout.Content className="myhLayoutContent">
          <div className="myhLayoutContent-panel">
            {jsx && <div className="myhAppError-jsx">{jsx}</div>}
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};
export default AppError;
