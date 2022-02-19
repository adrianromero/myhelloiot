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
  StringValueFormat,
} from "../format/ValueFormat";
import LogView from "./LogView";
import { Button, CheckboxOptionType, Col, Radio, Row } from "antd";
import SVGIcon from "../format/SVGIcon";
import { faPlay, faPause, faBan } from "@fortawesome/free-solid-svg-icons";
import Title from "antd/lib/typography/Title";

import "./LogTool.css";

export type LogToolProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  className?: string;
};

const FMTOPTIONS: Map<String, ValueFormat> = new Map([
  ["StringValueFormat", StringValueFormat()],
  ["HEXValueFormat", HEXValueFormat()],
  ["Base64ValueFormat", Base64ValueFormat()],
]);

const OPTIONS: CheckboxOptionType[] = [
  { label: "String", value: "StringValueFormat" },
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
  const [strformat, setStrformat] = useState<string>("StringValueFormat");

  useEffect(() => {
    setTool([false, []]);
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const format: ValueFormat = FMTOPTIONS.get(strformat) ?? StringValueFormat();

  return (
    <div className={`myhLogTool ${className}`}>
      <Row gutter={8}>
        <Col xs={0} sm={0} md={0} lg={4} />
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className="myhLogTool-header">
            <div className="myhLogTool-title">
              <Title level={5}>{subtopic}</Title>
            </div>
            <div className="myhLogTool-toolbar">
              <Button
                type="primary"
                icon={<SVGIcon icon={paused ? faPause : faPlay} />}
                disabled={!connected}
                onClick={() => setTool(([p, msgs]) => [!p, msgs])}
              />
              <Button
                icon={<SVGIcon icon={faBan} />}
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
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} />
      </Row>
    </div>
  );
};

export default LogTool;
