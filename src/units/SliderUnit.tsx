import React, { useEffect, useState } from "react"; // FC functional control.
import { Slider } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";

import "antd/dist/antd.css";
import "../assets/main.css";

type ViewCardProps = {
  topicpub: string;
  topicsub: string;
};

const SliderCard: React.FC<ViewCardProps> = ({ topicpub, topicsub }) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setBuffer(mqttmessage);
  });

  const onChange = (value: number) => {
    const b = Buffer.from(value.toString());
    setBuffer(b);
    publish(topicpub, b);
  };

  return (
    <Slider
      value={Number(buffer.toString())}
      min={0}
      max={100}
      step={1}
      onChange={onChange}
      disabled={!connected}
    />
  );
};
export default SliderCard;
