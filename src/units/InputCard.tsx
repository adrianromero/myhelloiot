import React, { useEffect } from "react"; // FC functional control.
import { Button, Card, Input, Form, Row, Col } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { StringFormat, ToString } from "../mqtt/StringFormat";

import "antd/dist/antd.css";
import "../assets/main.css";
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
  format = ToString(),
}) => {
  const [{ connected }, { publish }] = useMQTTContext();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      mqttValue: "",
    });
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(topicsub, (topic: string, mqttmessage: Buffer) => {
    form.setFieldsValue({
      mqttValue: format.toString(mqttmessage),
    });
  });

  const onFinish = (values: any) => {
    publish(topicpub, format.fromString(values.mqttValue));
  };

  return (
    <Card className="myh-card myh-input-card" size="small" title={title}>
      <Form form={form} name="inputcard" onFinish={onFinish}>
        <Row gutter={8} wrap={false}>
          <Col flex="auto">
            <Form.Item
              name="mqttValue"
              rules={[
                {
                  validator: (_, value) => {
                    try {
                      format.fromString(value);
                      return Promise.resolve();
                    } catch {
                      return Promise.reject(
                        new Error("Value cannot be formatted.")
                      );
                    }
                  },
                },
              ]}
            >
              <Input
                className={format.className()}
                readOnly={topicpub === ""}
                bordered={topicpub !== ""}
                disabled={!connected}
              />
            </Form.Item>
          </Col>
          {topicpub !== "" && (
            <Col flex="none">
              <Form.Item>
                <Button
                  icon={<SendOutlined style={{ lineHeight: 1.3 }} />}
                  type="primary"
                  disabled={!connected}
                  htmlType="submit"
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Card>
  );
};
export default InputCard;
