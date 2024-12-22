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
import { Switch } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTContext";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTHooks";
import type { ONOFF } from "../format/FormatTypes";
import { ONOFFNumber } from "../format/FormatConstants";
import { ConvertBuffer, IdentityConvert } from "../format/ConvertTypes";

type SwitchUnitProps = {
    topic?: string;
    pubtopic?: string;
    subtopic?: string;
    subconvert?: ConvertBuffer;
    puboptions?: IClientPublishOptions;
    suboptions?: IClientSubscribeOptions;
    onoff?: ONOFF;
    className?: string;
};

const SwitchUnit: React.FC<SwitchUnitProps> = ({
    topic = "",
    pubtopic = topic,
    subtopic = topic,
    puboptions,
    suboptions,
    subconvert = IdentityConvert(),
    onoff = ONOFFNumber,
    className,
}) => {
    const [{ ready }, { publish }] = useMQTTContext();
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        setChecked(false);
    }, [ready]);

    useMQTTSubscribe(
        subtopic,
        ({ message }: MQTTMessage) => {
            const b = subconvert(message);
            if (b) {
                setChecked(onoff.status_on(message));
            }
        },
        suboptions,
    );

    const onChange = (value: boolean) => {
        setChecked(value);
        publish(pubtopic, value ? onoff.cmd_on : onoff.cmd_off, puboptions);
    };

    return (
        <Switch
            checked={checked}
            onChange={onChange}
            disabled={pubtopic === ""}
            className={className}
        />
    );
};
export default SwitchUnit;
