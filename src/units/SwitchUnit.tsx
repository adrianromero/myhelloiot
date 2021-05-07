import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueEdit } from "../mqtt/FormatTypes";
import { StrValueEdit } from "../mqtt/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type SwitchUnitProps = {
  topicpub: string;
  topicsub: string;
  format?: ValueEdit;
};

const SwitchUnit: React.FC<SwitchUnitProps> = ({
  topicpub,
  topicsub,
  format = StrValueEdit(),
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(false);
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setChecked(format.toString(mqttmessage) === "1");
  });

  const onChange = (value: boolean) => {
    setChecked(value);
    publish(topicpub, format.fromString(value ? "1" : "0"));
  };

  return <Switch checked={checked} onChange={onChange} disabled={!connected} />;
};
export default SwitchUnit;
