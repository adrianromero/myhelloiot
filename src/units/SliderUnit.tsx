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

import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Slider } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTProvider";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTHooks";
import type { LimitsFormat } from "../format/FormatTypes";
import { DefaultLimits } from "../format/FormatConstants";

type SliderUnitProps = {
  topic?: string
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: LimitsFormat;
  className?: string;
};

const SliderUnit: React.FC<SliderUnitProps> = ({
  topic = "",
  pubtopic = topic,
  subtopic = topic,
  puboptions,
  suboptions,
  format = DefaultLimits,
  className = "",
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [ready]);

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      setBuffer(message);
    },
    suboptions
  );

  const onAfterChange = (value: number) => {
    const b = Buffer.from(value.toString());
    publish(pubtopic, b, puboptions);
  };
  const onChange = (value: number) => {
    const b = Buffer.from(value.toString());
    setBuffer(b);
  };

  return (
    <Slider
      value={Number(buffer.toString())}
      min={format.min}
      max={format.max}
      step={format.step}
      onChange={onChange}
      onAfterChange={onAfterChange}
      disabled={!connected}
      className={`myhSliderUnit ${className}`}
    />
  );
};
export default SliderUnit;
