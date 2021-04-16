import React, { useEffect, useState } from "react"; // FC functional control.
import { Card, Row, Col } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconFormat } from "../mqtt/FormatTypes";
import { ToIconString } from "../mqtt/IconFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type ViewCardProps = {
  title: string;
  topicsub: string;
  format?: IconFormat;
};

const ViewCard: React.FC<ViewCardProps> = ({
  title,
  topicsub,
  format = ToIconString(),
}) => {
  const [{ connected }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setBuffer(mqttmessage);
  });

  return (
    <Card className="myh-card myh-input-card" size="small" title={title}>
      <Row gutter={8} wrap={false}>
        <Col flex="auto">{format.toIcon(buffer)}</Col>
      </Row>
    </Card>
  );
};
export default ViewCard;
