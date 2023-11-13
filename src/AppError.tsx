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

import React from "react";
import { useDispatch } from "react-redux";
import { Button, Layout } from "antd";
import { DispatchDisconnect } from "./AppStoreProvider";
import AppHeader from "./AppHeader";
import SVGIcon from "./format/SVGIcon";
import {
  faAngleLeft,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./AppError.css";

const AppError: React.FC<{ title: string; errorMessage: string; jsx?: string }> = ({
  title,
  errorMessage,
  jsx,
}) => {
  const dispatch = useDispatch<DispatchDisconnect>();

  return (
    <>
      <Layout className="myhLayout">
        <AppHeader title={title}>
          <Button
            icon={<SVGIcon icon={faAngleLeft} />}
            type="primary"
            onClick={() => dispatch({ type: "disconnect" })}
          >
            Back
          </Button>
        </AppHeader>
        <Layout.Content className="myhLayoutContent">
          <div className="myhLayoutContent-panel">
            {jsx && (
              <div className="myhAppError-jsx">
                {jsx.split(/\r?\n/).map((line, index) => (
                  <pre key={index}>{line}</pre>
                ))}
              </div>
            )}
            <div className="myhAppError-message">
              <SVGIcon
                icon={faCircleExclamation}
                className="myhAppError-icon"
                style={{ color: "red" }}
              />
              <span>{errorMessage}</span>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};
export default AppError;
