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

import React, { useEffect, useState, MouseEvent, ReactNode } from "react";
import { Button } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import {
  MQTTMessage,
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { SwitchValueFormat } from "../format/ValueFormat";
import "./ButtonTopic.css";

export type ButtonTopicProps = {
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat;
  icon?: React.ReactNode;
  iconlabel?: (buffer: Buffer) => ReactNode;
  className?: string;
  children?: React.ReactNode;
};

const ButtonTopic: React.FC<ButtonTopicProps> = ({
  pubtopic = "",
  subtopic = "",
  puboptions,
  suboptions,
  format = SwitchValueFormat(),
  icon,
  iconlabel = () => null,
  className = "",
  children,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

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
      className={`myhButtonTopic ${className}`}
      type="primary"
      onClick={onClick}
      disabled={!connected || !pubtopic}
      icon={icon}
    >
      {iconlabel(buffer)}
      {children}
    </Button>
  );
};
export default ButtonTopic;
