import React, { useEffect, useState } from "react"; // FC functional control.
import { Switch, Card, Row, Col } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { StringEdit } from "../mqtt/FormatTypes";
import { ToString } from "../mqtt/StringEdit";

import "antd/dist/antd.css";
import "../assets/main.css";

type SwitchCardProps = {
  title?: string;
  topicpub: string;
  topicsub: string;
  format?: StringEdit;
};

const SwitchCard: React.FC<SwitchCardProps> = ({
  title,
  topicpub,
  topicsub,
  format = ToString(),
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
      <Row justify="center">
        <Col>Pepinillos fritos</Col>
      </Row>
    </Card>
  );
};
export default SwitchCard;
