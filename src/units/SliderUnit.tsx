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
import { Slider } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import {
  MQTTMessage,
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";
import { NumberValidation } from "../format/FormatTypes";
import "./SliderUnit.css";

type SliderUnitProps = {
  pubtopic: string;
  subtopic: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  numberValidation: NumberValidation;
  className?: string;
};

const SliderUnit: React.FC<SliderUnitProps> = ({
  pubtopic,
  subtopic,
  puboptions,
  suboptions,
  numberValidation,
  className = "",
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
      min={numberValidation.min}
      max={numberValidation.max}
      step={numberValidation.step}
      onChange={onChange}
      onAfterChange={onAfterChange}
      disabled={!connected}
      className={`myhSliderUnit ${className}`}
    />
  );
};
export default SliderUnit;
