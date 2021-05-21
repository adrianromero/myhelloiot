import React, { useEffect, useState } from "react"; // FC functional control.
import { Slider } from "antd";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { NumberValidation } from "../format/FormatTypes";
import "antd/dist/antd.css";
import "../assets/main.css";

type SliderUnitProps = {
  pubtopic: string;
  subtopic: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  numberValidation: NumberValidation;
};

const SliderUnit: React.FC<SliderUnitProps> = ({
  pubtopic,
  subtopic,
  puboptions,
  suboptions,
  numberValidation,
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

  const onAfterChange = (value: number) => {
    const b = Buffer.from(value.toString());
    publish(pubtopic, b, puboptions);
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
