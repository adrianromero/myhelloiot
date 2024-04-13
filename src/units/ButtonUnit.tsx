/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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
import { Buffer } from "buffer";
import { Button } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTProvider";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTHooks";
import { ValueFormat, IconValueFormat } from "../format/FormatTypes";
import "./ButtonUnit.css";
import { SwitchIconValueFormat } from "../format/IconValueFormat";
import { ConvertBuffer, IdentityConvert } from "../format/ConvertTypes";

export type ButtonUnitProps = {
  topic?: string;
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  subconvert?: ConvertBuffer;
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
  subconvert = IdentityConvert(),
  format = SwitchIconValueFormat(),
  icon,
  className = "",
  children,
}) => {
  const [{ ready }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [ready]);

  let theicon;
  if (icon) {
    theicon = icon;
  } else if ("toIcon" in format) {
    const f = format as IconValueFormat;
    theicon = f.toIcon(buffer);
  }

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      const b = subconvert(message);
      if (b) {
        setBuffer(b);
      }
    },
    suboptions
  );

  const onClick = () => {
    const next: Buffer = format.next(buffer);
    setBuffer(next);
    publish(pubtopic, next, puboptions);
  };

  return (
    <Button
      className={`myhButtonUnit ${className}`}
      type="primary"
      onClick={onClick}
      disabled={!pubtopic}
      icon={theicon}
    >
      {children}
    </Button>
  );
};
export default ButtonUnit;
