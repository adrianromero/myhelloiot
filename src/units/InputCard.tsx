import React, { useState, useEffect } from "react"; // FC functional control.
import { Button, Card, Space, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { StringFormat, ToString } from "../mqtt/StringFormat";

import "antd/dist/antd.css";
import "./InputCard.css";

type InputCardProps = {
  title: string;
  topicpub: string;
  topicsub: string;
  format?: StringFormat;
};

const InputCard: React.FC<InputCardProps> = ({
  title,
  topicpub,
  topicsub,
  format = ToString,
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [mqttValue, setMqttValue] = useState("");
  useEffect(() => {
    setMqttValue("");
  }, [connected]);

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    setMqttValue(format.toString(mqttmessage));
  });

  const handlePublish = (e: React.MouseEvent<HTMLElement>) => {
    publish(topicpub, format.fromString(mqttValue));
  };

  return (
    <Card className="myh-input-card" title={title}>
      <Space direction="horizontal">
        <Input
          value={mqttValue}
          disabled={!connected}
          onChange={(e) => setMqttValue(e.target.value)}
        />
        <Button
          icon={<SendOutlined style={{ lineHeight: 1.3 }} />}
          type="primary"
          disabled={!connected}
          onClick={handlePublish}
        />
      </Space>
    </Card>
  );
};
export default InputCard;
