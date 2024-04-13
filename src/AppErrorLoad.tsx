/*
MYHELLOIOT
Copyright (C) 2024 Adrián Romero
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
import AppHeader from "./AppHeader";
import SVGIcon from "./format/SVGIcon";
import {
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./AppError.css";


const AppErrorLoad: React.FC<{ title: string; error: unknown }> = ({
  title,
  error,
}) => {
  let message;
  if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error.";
  }
  return (
    <Layout className="myhLayout">
      <AppHeader title={title} />
      <Layout.Content className="myhLayoutContent">
        <div className="myhLayoutContent-panel">
          <div className="myhAppError-message">
            <SVGIcon
              icon={faCircleExclamation}
              className="myhAppError-icon"
              style={{ color: "red" }}
            />
            <span>{message}</span>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};
export default AppErrorLoad;
