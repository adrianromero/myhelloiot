import React, { useEffect, useState } from "react"; // FC functional control.
import { Card, Row, Col, Progress } from "antd";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { IconFormatNumber } from "../mqtt/FormatTypes";
import { ToIconFormatNumber } from "../mqtt/IconFormat";

import "antd/dist/antd.css";
import "../assets/main.css";

type ViewCardProps = {
  title?: string;
  topicsub: string;
  format?: IconFormatNumber;
};

const ProgressCard: React.FC<ViewCardProps> = ({
  title,
  topicsub,
  format = ToIconFormatNumber(),
}) => {
  const [{ connected }] = useMQTTContext();
  const [buffer, setBuffer] = useState<Buffer>(Buffer.from([]));

  useEffect(() => {
    setBuffer(Buffer.from([]));
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setBuffer(mqttmessage);
  });

  const value = Number(buffer.toString());
  const percent = (100 * value) / (format.max - format.min);

  return (
    <Card className="myh-card myh-input-card" size="small" title={title}>
      <Row gutter={8} wrap={false}>
        <Col flex="auto">{format.toIcon(buffer)}</Col>
      </Row>
      <Row gutter={8} wrap={false}>
        <Col flex="auto">
          <Progress percent={percent} showInfo={false} />
        </Col>
      </Row>
    </Card>
  );
};
export default ProgressCard;
