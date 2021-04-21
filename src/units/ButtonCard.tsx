import React, { useEffect, useState, MouseEvent } from "react";
import { Button, Card, Row, Col } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconEdit, ToLabelEdit } from "../mqtt/FormatTypes";
import { ToSwitch } from "../mqtt/StringEdit";

import "antd/dist/antd.css";
import "../assets/main.css";

type ButtonCardProps = {
  title?: string;
  footer?: string;
  topicpub: string;
  topicsub: string;
  format?: IconEdit;
};

const ButtonCard: React.FC<ButtonCardProps> = ({
  title,
  footer,
  topicpub,
  topicsub,
  format = ToLabelEdit(ToSwitch()),
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
            style={{ width: "100%", height: "80px" }}
            onClick={onClick}
            disabled={!connected}
          >
            {format.toIcon(buffer)}
          </Button>
        </Col>
      </Row>
      {footer && (
        <Row justify="center">
          <Col className="myh-card-footer">{footer}</Col>
        </Row>
      )}
    </Card>
  );
};
export default ButtonCard;
