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
import { Layout } from "antd";
import { useDispatchDisconnect } from "./AppStoreProvider";
import AppHeader from "./AppHeader";
import ModalError from "./ModalError";
import { CloseCircleOutlined } from "@ant-design/icons";

const AppError: React.FC<{ title: string; error: string; jsx?: string }> = ({
  title,
  error,
  jsx,
}) => {
  const dispatchDisconnect = useDispatchDisconnect();

  return (
    <>
      <ModalError
        title={title}
        error={error}
        onOk={dispatchDisconnect}
        visible
      />
      <Layout>
        <AppHeader>
          <div className="myhMenuDisplayButton"></div>
          <>
            <span className="myhConnectionStatus-label">Error</span>
            <span className="myhConnectionStatus-icon">
              <CloseCircleOutlined style={{ color: "#FF0000" }} />
            </span>
          </>
        </AppHeader>
        <Layout.Content className="myhMainLayout">
          <div className="myhAppContent-panel">
            {jsx && <div className="myhJSXErrorJSX">{jsx}</div>}
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};
export default AppError;
