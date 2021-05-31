import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";

import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type SwitchUnitProps = {
  pubtopic: string;
  subtopic: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat;
  className?: string;
};

const SwitchUnit: React.FC<SwitchUnitProps> = ({
  pubtopic,
  subtopic,
  puboptions,
  suboptions,
  format = StrValueFormat(),
  className,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(false);
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    (topic: string, mqttmessage: Buffer) => {
      setChecked(format.toDisplay(mqttmessage) === "1");
    },
    suboptions
  );

  const onChange = (value: boolean) => {
    setChecked(value);
    publish(pubtopic, format.fromDisplay(value ? "1" : "0"), puboptions);
  };

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      disabled={!connected}
      className={className}
    />
  );
};
export default SwitchUnit;
