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
import { Button, Modal } from "antd";
import SVGIcon from "./format/SVGIcon";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./ModalError.css";

const ModalError: React.FC<{
  title: string;
  error: string;
  onOk: React.MouseEventHandler<HTMLElement>;
  visible: boolean;
}> = ({ title, error, onOk, visible }) => {
  return (
    <Modal footer={null} closable={false} visible={visible}>
      <div className="myhModalError-container">
        <SVGIcon
          icon={faCircleExclamation}
          className="myhModalError-icon"
          style={{ color: "red" }}
        />
        <div>
          <div className="myhModalError-title">{title}</div>
          <div className="myhModalError-message">{error}</div>
        </div>
      </div>
      <div className="myhModalError-ok">
        <Button type="primary" onClick={onOk}>
          OK
        </Button>
      </div>
    </Modal>
  );
};
export default ModalError;
