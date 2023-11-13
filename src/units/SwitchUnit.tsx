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
import { Switch } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import type { MQTTMessage } from "../mqtt/MQTTProvider";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTHooks";
import type { ONOFF } from "../format/FormatTypes";
import { ONOFFNumber } from "../format/FormatConstants";

type SwitchUnitProps = {
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  onoff?: ONOFF;
  className?: string;
};

const SwitchUnit: React.FC<SwitchUnitProps> = ({
  pubtopic = "",
  subtopic = "",
  puboptions,
  suboptions,
  onoff = ONOFFNumber,
  className,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(false);
  }, [ready]);

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      setChecked(onoff.on.equals(message));
    },
    suboptions
  );

  const onChange = (value: boolean) => {
    setChecked(value);
    publish(pubtopic, value ? onoff.on : onoff.off, puboptions);
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
