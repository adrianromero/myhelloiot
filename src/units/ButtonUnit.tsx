/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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

import React, { useEffect, useState, MouseEvent } from "react";
import { Buffer } from "buffer";
import { Button } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt/dist/mqtt";
import {
  MQTTMessage,
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";
import { ValueFormat, IconValueFormat } from "../format/FormatTypes";
import "./ButtonUnit.css";
import { SwitchIconValueFormat } from "../format/IconValueFormat";

export type ButtonUnitProps = {
  topic?: string;
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat | IconValueFormat;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

const ButtonUnit: React.FC<ButtonUnitProps> = ({
  topic = "",
  pubtopic = topic,
  subtopic = topic,
  puboptions,
  suboptions,
  format = SwitchIconValueFormat(),
  icon,
  className = "",
  children,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  let theicon;
  if (icon) {
    theicon = icon;
  } else if ("toIcon" in format) {
    let f = format as IconValueFormat;
    theicon = f.toIcon(buffer);
  }

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      setBuffer(message);
    },
    suboptions
  );

  const onClick = (ev: MouseEvent<HTMLElement>) => {
    const next: Buffer = format.next(buffer);
    setBuffer(next);
    publish(pubtopic, next, puboptions);
  };

  return (
    <Button
      className={`myhButtonUnit ${className}`}
      type="primary"
      onClick={onClick}
      disabled={!connected || !pubtopic}
      icon={theicon}
    >
      {children}
    </Button>
  );
};
export default ButtonUnit;
