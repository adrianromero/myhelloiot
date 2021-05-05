import React, { useEffect, useState, MouseEvent } from "react";
import { Button } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconEdit } from "../mqtt/FormatTypes";
import { LabelIconEdit } from "../mqtt/IconFormat";
import { SwitchValueEdit } from "../mqtt/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type ButtonUnitProps = {
  topicpub: string;
  topicsub?: string;
  format?: IconEdit;
};

const ButtonUnit: React.FC<ButtonUnitProps> = ({
  topicpub,
  topicsub = "",
  format = LabelIconEdit(SwitchValueEdit()),
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setBuffer(mqttmessage);
  });

  const onClick = (ev: MouseEvent<HTMLElement>) => {
    const next: Buffer = format.next(buffer);
    setBuffer(next);
    publish(topicpub, next);
  };

  return (
    <Button
      className="myh-value"
      type="primary"
      style={{ width: "100%", height: "70px" }}
      onClick={onClick}
      disabled={!connected}
    >
      {format.toIcon(buffer)}
    </Button>
  );
};
export default ButtonUnit;
