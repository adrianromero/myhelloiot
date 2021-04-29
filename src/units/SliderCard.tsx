import React, { useEffect, useState } from "react"; // FC functional control.
import { Card, Row, Col, Slider } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconFormatNumber } from "../mqtt/FormatTypes";
import { ToIconFormatNumber } from "../mqtt/IconFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type SliderCardProps = {
  title?: string;
  topicpub: string;
  topicsub: string;
  format?: IconFormatNumber;
};

const SliderCard: React.FC<SliderCardProps> = ({
  title,
  topicpub,
  topicsub,
  format = ToIconFormatNumber(),
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
    <Card className="myh-card myh-input-card" size="small" title={title}>
      <Row gutter={8} wrap={false}>
        <Col flex="auto">{format.toIcon(buffer)}</Col>
      </Row>
      <Row gutter={8} wrap={false}>
        <Col flex="auto">
          <Slider
            value={Number(buffer.toString())}
            min={format.min}
            max={format.max}
            step={format.step}
            onChange={onChange}
            onAfterChange={onAfterChange}
            disabled={!connected}
          />
        </Col>
      </Row>
    </Card>
  );
};
export default SliderCard;
