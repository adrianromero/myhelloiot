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

import React, {
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { Button, Input } from "antd";
import { IClientPublishOptions } from "mqtt";

import { useMQTTContext } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StringValueFormat } from "../format/ValueFormat";

import "./KeypadUnit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export type KeypadUnitProps = {
  pubtopic: string;
  puboptions?: IClientPublishOptions;
  format?: ValueFormat;
  className?: string;
};

const KeypadUnit: React.FC<KeypadUnitProps> = ({
  pubtopic,
  puboptions,
  format = StringValueFormat(),
  className = "",
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue("");
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const publishValue = () => {
    publish(pubtopic, format.fromDisplay(value), puboptions);
    setValue("");
  };

  const onClickOK = (ev: MouseEvent<HTMLElement>) => {
    publishValue();
  };

  const onPressEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    publishValue();
  };

  const onClickClear = (ev: MouseEvent<HTMLElement>) => setValue("");

  const onClickKey = (key: string) => (ev: MouseEvent<HTMLElement>) =>
    setValue((prevValue) => prevValue + key);

  return (
    <div className={`myhKeypad ${className}`}>
      <Input.Password
        value={value}
        disabled={!connected}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setValue(ev.target.value)
        }
        onPressEnter={onPressEnter}
        className="myhInput"
        addonAfter={
          <Button
            type="text"
            onClick={onClickClear}
            disabled={!connected}
            icon={<FontAwesomeIcon className="anticon" icon={faCircleXmark} />}
          />
        }
      />

      <Button
        type="primary"
        onClick={onClickKey("1")}
        disabled={!connected}
        className="btn btn-1"
      >
        1
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("2")}
        disabled={!connected}
        className="btn btn-2"
      >
        2
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("3")}
        disabled={!connected}
        className="btn btn-3"
      >
        3
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("4")}
        disabled={!connected}
        className="btn btn-4"
      >
        4
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("5")}
        disabled={!connected}
        className="btn btn-5"
      >
        5
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("6")}
        disabled={!connected}
        className="btn btn-6"
      >
        6
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("7")}
        disabled={!connected}
        className="btn btn-7"
      >
        7
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("8")}
        disabled={!connected}
        className="btn btn-8"
      >
        8
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("9")}
        disabled={!connected}
        className="btn btn-9"
      >
        9
      </Button>
      <Button
        type="primary"
        onClick={onClickKey("0")}
        disabled={!connected}
        className="btn btn-0"
      >
        0
      </Button>
      <Button
        type="primary"
        onClick={onClickOK}
        disabled={!connected}
        icon={
          <FontAwesomeIcon
            className="anticon"
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
