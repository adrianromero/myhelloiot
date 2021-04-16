import React, { useEffect, useState, MouseEvent } from "react";
import { Button, Card, Row, Col } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { StringEdit } from "../mqtt/FormatTypes";
import { ToSwitch } from "../mqtt/StringEdit";

import "antd/dist/antd.css";
import "../assets/main.css";

type ButtonCardProps = {
  title: string;
  topicpub: string;
  topicsub: string;
  format?: StringEdit;
};

const ButtonCard: React.FC<ButtonCardProps> = ({
  title,
  topicpub,
  topicsub,
  format = ToSwitch(),
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
    <Card className="myh-card myh-switch-card" size="small" title={title}>
      <Row justify="center">
        <Col span="24">
          <Button
            className="myh-value"
            type="primary"
            style={{ width: "100%", height: "100%" }}
            onClick={onClick}
            disabled={!connected}
          >
            {format.toString(buffer) || "\u00A0"}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
export default ButtonCard;
