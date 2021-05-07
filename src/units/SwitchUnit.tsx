import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";

import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueEdit } from "../format/FormatTypes";
import { StrValueEdit } from "../format/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type SwitchUnitProps = {
  pubtopic: string;
  subtopic: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: ValueEdit;
};

const SwitchUnit: React.FC<SwitchUnitProps> = ({
  pubtopic,
  subtopic,
  puboptions,
  suboptions,
  format = StrValueEdit(),
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(false);
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    (topic: string, mqttmessage: Buffer) => {
      setChecked(format.toString(mqttmessage) === "1");
    },
    suboptions
  );

  const onChange = (value: boolean) => {
    setChecked(value);
    publish(pubtopic, format.fromString(value ? "1" : "0"), puboptions);
  };

  return <Switch checked={checked} onChange={onChange} disabled={!connected} />;
};
export default SwitchUnit;
