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

import React, { useEffect, useState } from "react";
import { IClientSubscribeOptions } from "mqtt";
import { MQTTMessage, useMQTTContext } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";
import LogView from "./LogView";

export type LogUnitProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat;
  className?: string;
};

const LogUnit: React.FC<LogUnitProps> = ({
  subtopic,
  suboptions,
  format = StrValueFormat(),
  className,
}) => {
  const [{ ready }] = useMQTTContext();
  const [messages, setMessages] = useState<MQTTMessage[]>([]);

  useEffect(() => {
    setMessages([]);
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`myhLogUnit ${className}`}>
      <LogView
        subtopic={subtopic}
        suboptions={suboptions}
        messages={messages}
        onMessage={(mqttmessage: MQTTMessage) => {
          setMessages((msgs) => [mqttmessage, ...msgs]);
        }}
        format={format}
        className={`${!ready ? "myhDisabled" : ""}`}
      />
    </div>
  );
};

export default LogUnit;
