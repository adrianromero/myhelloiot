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

import React, { MouseEvent } from "react";
import { Button, Input } from "antd";
import { IClientPublishOptions } from "mqtt";

import { useMQTTContext } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";

import "./KeypadUnit.css";

export type KeypadUnitProps = {
  pubtopic: string;
  puboptions?: IClientPublishOptions;
  format?: ValueFormat;
  value: string;
  hashkey: string;
  className?: string;
};

const KeypadUnit: React.FC<KeypadUnitProps> = ({
  pubtopic,
  puboptions,
  format = StrValueFormat(),
  value,
  hashkey,
  className = "",
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const onClick = (ev: MouseEvent<HTMLElement>) => {
    publish(pubtopic, format.fromDisplay(value), puboptions);
  };
  return (
    <div className={`myhKeypad ${className}`}>
      <Input.Password
        className="myhInput"
        suffix="wrwerwer"
        addonAfter={<Button className="ant-input-search-button">Delete</Button>}
      />

      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-1"
      >
        1
      </Button>
      <Button onClick={onClick} disabled={!connected} className="btn btn-2">
        2
      </Button>
      <Button onClick={onClick} disabled={!connected} className="btn btn-3">
        3
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-4"
      >
        4
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-5"
      >
        5
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-6"
      >
        6
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-7"
      >
        7
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-8"
      >
        8
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-9"
      >
        9
      </Button>
      <Button
        type="primary"
        onClick={onClick}
        disabled={!connected}
        className="btn btn-0"
      >
        0
      </Button>
    </div>
  );
};

export default KeypadUnit;
