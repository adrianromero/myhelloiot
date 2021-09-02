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
import {
  Base64ValueFormat,
  HEXValueFormat,
  StrValueFormat,
} from "../format/ValueFormat";
import LogView from "./LogView";
import { Button, CheckboxOptionType, Radio } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  StopOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

export type LogToolProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  className?: string;
};

const FMTOPTIONS: Map<String, ValueFormat> = new Map([
  ["StrValueFormat", StrValueFormat()],
  ["HEXValueFormat", HEXValueFormat()],
  ["Base64ValueFormat", Base64ValueFormat()],
]);

const OPTIONS: CheckboxOptionType[] = [
  { label: "Str", value: "StrValueFormat" },
  { label: "Hex", value: "HEXValueFormat" },
  { label: "Base64", value: "Base64ValueFormat" },
];

const LogTool: React.FC<LogToolProps> = ({
  subtopic,
  suboptions,
  className,
}) => {
  const [{ connected, ready }] = useMQTTContext();
  const [[paused, messages], setTool] = useState<[boolean, MQTTMessage[]]>([
    false,
    [],
  ]);
  const [strformat, setStrformat] = useState<string>("StrValueFormat");

  useEffect(() => {
    setTool([false, []]);
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const format: ValueFormat = FMTOPTIONS.get(strformat) ?? StrValueFormat();

  return (
    <div className={`myhLogTool ${className}`}>
      <div className="myhLog-header">
        <div className="myhLog-title">
          <Title level={5}>{subtopic}</Title>
        </div>
        <div className="myhLog-toolbar">
          <Button
            type="primary"
            icon={paused ? <PauseOutlined /> : <CaretRightOutlined />}
            disabled={!connected}
            onClick={() => setTool(([p, msgs]) => [!p, msgs])}
          />
          <Button
            icon={<StopOutlined />}
            disabled={!connected}
            onClick={() => setTool(([p]) => [p, []])}
          />
          <Radio.Group
            options={OPTIONS}
            onChange={(e) => setStrformat(e.target.value)}
            value={strformat}
            optionType="button"
          />
        </div>
      </div>
      <LogView
        subtopic={subtopic}
        suboptions={suboptions}
        messages={messages}
        onMessage={(mqttmessage: MQTTMessage) =>
          setTool(([p, msgs]) => [p, p ? msgs : [mqttmessage, ...msgs]])
        }
        format={format}
        className={!ready ? "myhDisabled" : ""}
      />
    </div>
  );
};

export default LogTool;
