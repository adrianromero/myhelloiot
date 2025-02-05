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
import { Slider } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTContext";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTHooks";
import type { LimitsFormat } from "../format/FormatTypes";
import { DefaultLimits } from "../format/FormatConstants";

import "./SliderUnit.css";
import { ConvertBuffer, IdentityConvert } from "../format/ConvertTypes";

type SliderUnitProps = {
    topic?: string;
    pubtopic?: string;
    subtopic?: string;
    puboptions?: IClientPublishOptions;
    suboptions?: IClientSubscribeOptions;
    subconvert?: ConvertBuffer;
    format?: LimitsFormat;
    className?: string;
};

const SliderUnit: React.FC<SliderUnitProps> = ({
    topic = "",
    pubtopic = topic,
    subtopic = topic,
    puboptions,
    suboptions,
    subconvert = IdentityConvert(),
    format = DefaultLimits,
    className = "",
}) => {
    const [{ ready }, { publish }] = useMQTTContext();
    const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

    useEffect(() => {
        setBuffer(Buffer.from([]));
    }, [ready]);

    useMQTTSubscribe(
        subtopic,
        ({ message }: MQTTMessage) => {
            const b = subconvert(message);
            if (b) {
                setBuffer(b);
            }
        },
        suboptions,
    );

    const onChangeComplete = (value: number) => {
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
            onChangeComplete={onChangeComplete}
            className={`myhSliderUnit ${className}`}
        />
    );
};
export default SliderUnit;
