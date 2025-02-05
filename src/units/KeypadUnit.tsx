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

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input } from "antd";
import { IClientPublishOptions } from "mqtt";
import { useMQTTContext } from "../mqtt/MQTTHooks";
import { ValueFormat } from "../format/FormatTypes";
import { StringValueFormat } from "../format/ValueFormat";

import "./KeypadUnit.css";
import SVGIcon from "../format/SVGIcon";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";

export type KeypadUnitProps = {
    pubtopic?: string;
    puboptions?: IClientPublishOptions;
    format?: ValueFormat;
    className?: string;
};

const KeypadUnit: React.FC<KeypadUnitProps> = ({
    pubtopic = "",
    puboptions,
    format = StringValueFormat(),
    className = "",
}) => {
    const [{ ready }, { publish }] = useMQTTContext();
    const [value, setValue] = useState<string>("");
    useEffect(() => {
        setValue("");
    }, [ready]);

    const publishValue = () => {
        publish(pubtopic, format.fromDisplay(value), puboptions);
        setValue("");
    };

    const onClickOK = () => {
        publishValue();
    };

    const onPressEnter = () => {
        publishValue();
    };

    const onClickKey = (key: string) => () =>
        setValue(prevValue => prevValue + key);

    return (
        <div className={`myhKeypad ${className}`}>
            <Input.Password
                value={value}
                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                    setValue(ev.target.value)
                }
                onPressEnter={onPressEnter}
                className="myhInput"
                allowClear
            />
            <Button
                type="primary"
                onClick={onClickKey("1")}
                className="btn btn-1"
            >
                1
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("2")}
                className="btn btn-2"
            >
                2
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("3")}
                className="btn btn-3"
            >
                3
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("4")}
                className="btn btn-4"
            >
                4
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("5")}
                className="btn btn-5"
            >
                5
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("6")}
                className="btn btn-6"
            >
                6
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("7")}
                className="btn btn-7"
            >
                7
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("8")}
                className="btn btn-8"
            >
                8
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("9")}
                className="btn btn-9"
            >
                9
            </Button>
            <Button
                type="primary"
                onClick={onClickKey("0")}
                className="btn btn-0"
            >
                0
            </Button>
            <Button
                type="primary"
                onClick={onClickOK}
                icon={
                    <SVGIcon
                        icon={faTurnDown}
                        style={{ transform: "rotate(90deg)" }}
                    />
                }
                className="btn btn-ok"
            />
        </div>
    );
};

export default KeypadUnit;
