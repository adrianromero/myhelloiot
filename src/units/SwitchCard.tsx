import React, { useEffect, useState } from "react"; // FC functional control.
import { Switch, Card, Row, Col } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueEdit } from "../mqtt/FormatTypes";
import { StrValueEdit } from "../mqtt/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type SwitchCardProps = {
  title?: string;
  footer?: string;
  topicpub: string;
  topicsub: string;
  format?: ValueEdit;
};

const SwitchCard: React.FC<SwitchCardProps> = ({
  title,
  footer,
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

  return (
    <Card className="myh-card myh-switch-card" size="small" title={title}>
      <Row justify="center">
        <Col>
          <Switch checked={checked} onChange={onChange} disabled={!connected} />
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
export default SwitchCard;
