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
import { Button } from "antd";
import { IClientPublishOptions } from "mqtt";

import { useMQTTContext } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";

import "./ButtonMessage.css";

export type ButtonMessageProps = {
  pubtopic: string;
  puboptions?: IClientPublishOptions;
  format?: ValueFormat;
  value: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const ButtonMessage: React.FC<ButtonMessageProps> = ({
  pubtopic,
  puboptions,
  format = StrValueFormat(),
  value,
  label,
  icon,
  children,
  className = "",
  style,
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const onClick = (ev: MouseEvent<HTMLElement>) => {
    publish(pubtopic, format.fromDisplay(value), puboptions);
  };
  return (
    <Button
      type="primary"
      onClick={onClick}
      disabled={!connected}
      icon={icon}
      className={`myhButtonMessage ${className}`}
      style={style}
    >
      {label}
      {children}
    </Button>
  );
};

export default ButtonMessage;
