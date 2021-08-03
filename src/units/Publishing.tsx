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
import { Button, Col } from "antd";
import { QoS } from "mqtt";

import { useMQTTContext } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";

type TopicInfo = {
  label?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  topic: string;
  value: string;
  retain?: boolean;
  qos?: QoS;
  format?: ValueFormat;
};

type PublishingProps = {
  topicsinfo: TopicInfo[];
  prefixtopic?: string;
  className?: string;
};

const Publishing: React.FC<PublishingProps> = ({
  prefixtopic = "",
  topicsinfo,
  className,
}) => {
  const [{ connected }, { publish }] = useMQTTContext();

  return (
    <>
      {topicsinfo.map((topicinfo) => {
        const onClick = (ev: MouseEvent<HTMLElement>) => {
          const format = topicinfo.format ?? StrValueFormat();
          publish(
            prefixtopic + topicinfo.topic,
            format.fromDisplay(topicinfo.value ?? ""),
            {
              qos: topicinfo.qos ?? 0,
              retain: topicinfo.retain ?? false,
            }
          );
        };
        return (
          <Col className={className} xs={24} sm={12} md={6} lg={4}>
            <Button
              className="myhPublishingButton"
              type="primary"
              onClick={onClick}
              disabled={!connected}
              icon={topicinfo.icon}
              style={topicinfo.style}
            >
              {topicinfo.label ?? topicinfo.topic}
            </Button>
          </Col>
        );
      })}
    </>
  );
};
export default Publishing;
