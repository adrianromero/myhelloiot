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
import { Switch } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";

import {
  MQTTMessage,
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { SwitchValueFormat } from "../format/ValueFormat";

type SwitchUnitProps = {
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat;
  className?: string;
};

const SwitchUnit: React.FC<SwitchUnitProps> = ({
  pubtopic = "",
  subtopic = "",
  puboptions,
  suboptions,
  format = SwitchValueFormat(),
  className,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(false);
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      setChecked(format.toDisplay(message) === "ON");
    },
    suboptions
  );

  const onChange = (value: boolean) => {
    setChecked(value);
    publish(pubtopic, format.fromDisplay(value ? "ON" : "OFF"), puboptions);
  };

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      disabled={!connected || pubtopic === ""}
      className={className}
    />
  );
};
export default SwitchUnit;
