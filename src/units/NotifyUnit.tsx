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

import React, { useState } from "react";
import { notification } from "antd";
import { Buffer } from "buffer";
import { IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTProvider";
import { useMQTTSubscribe } from "../mqtt/MQTTHooks";
import { ValueFormat } from "../format/FormatTypes";
import { StringValueFormat } from "../format/ValueFormat";

type NotifyUnitProps = {
  subtopic?: string;
  suboptions?: IClientSubscribeOptions;
  type?: "success" | "error" | "info" | "warning" | "open";
  format?: ValueFormat;
  duration?: number;
  className?: string;
};

const NotifyUnit: React.FC<NotifyUnitProps> = ({
  subtopic = "",
  suboptions,
  type = "info",
  format = StringValueFormat(),
  duration = 2.5,
  className,
}) => {
  const [notificationInstance, notificationContext] = notification.useNotification();
  const [[bounceTime, bounceMessage], setBouncing] = useState([Number.MIN_SAFE_INTEGER, Buffer.from("")]);
  const [[currentTime, currentMessage], setCurrent] = useState([Number.MIN_SAFE_INTEGER, Buffer.from("")]);
  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      setCurrent([new Date().getTime(), message]);
    },
    suboptions
  );

  if (currentTime - bounceTime > 250 || !currentMessage.equals(bounceMessage)) {
    notificationInstance[type]({
      message: format.toDisplay(currentMessage),
      duration,
      className,
      placement: "bottomRight"
    });
    setBouncing([currentTime, currentMessage]);
  }
  return <>{notificationContext}</>;
};

export default NotifyUnit;
