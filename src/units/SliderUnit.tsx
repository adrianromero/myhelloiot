import React, { useEffect, useState } from "react"; // FC functional control.
import { Slider } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { NumberValidation } from "../mqtt/FormatTypes";
import "antd/dist/antd.css";
import "../assets/main.css";

type SliderUnitProps = {
  topicpub: string;
  topicsub: string;
  numberValidation: NumberValidation;
};

const SliderUnit: React.FC<SliderUnitProps> = ({
  topicpub,
  topicsub,
  numberValidation,
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setBuffer(mqttmessage);
  });

  const onAfterChange = (value: number) => {
    const b = Buffer.from(value.toString());
    publish(topicpub, b);
  };
  const onChange = (value: number) => {
    const b = Buffer.from(value.toString());
    setBuffer(b);
  };

  return (
    <Slider
      value={Number(buffer.toString())}
      min={numberValidation.min}
      max={numberValidation.max}
      step={numberValidation.step}
      onChange={onChange}
      onAfterChange={onAfterChange}
      disabled={!connected}
    />
  );
};
export default SliderUnit;
