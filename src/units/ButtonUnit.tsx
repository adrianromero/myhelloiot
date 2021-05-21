import React, { useEffect, useState, MouseEvent } from "react";
import { Button } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconValueFormat } from "../format/FormatTypes";
import { LabelIconValueFormat } from "../format/IconFormat";
import { SwitchValueFormat } from "../format/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type ButtonUnitProps = {
  pubtopic: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: IconValueFormat;
};

const ButtonUnit: React.FC<ButtonUnitProps> = ({
  pubtopic,
  subtopic = "",
  puboptions,
  suboptions,
  format = LabelIconValueFormat(SwitchValueFormat()),
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    (topic: string, mqttmessage: Buffer) => {
      setBuffer(mqttmessage);
    },
    suboptions
  );

  const onClick = (ev: MouseEvent<HTMLElement>) => {
    const next: Buffer = format.next(buffer);
    setBuffer(next);
    publish(pubtopic, next, puboptions);
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
