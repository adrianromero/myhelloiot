import React, { useEffect } from "react"; // FC functional control.
import { Button, Card, Input, Form, Row, Col } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueEdit } from "../mqtt/FormatTypes";
import { StrValueEdit } from "../mqtt/ValueFormat";

import "antd/dist/antd.css";
import "../assets/main.css";
import "./InputCard.css";

type InputCardProps = {
  title?: string;
  topicpub?: string;
  topicsub?: string;
  format?: ValueEdit;
};

const InputCard: React.FC<InputCardProps> = ({
  title,
  topicpub = "",
  topicsub = "",
  format = StrValueEdit(),
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
      <Form
        form={form}
        name={`inputcard_${Math.random()
          .toString(16)
          .substr(2)
          .padEnd(13, "0")}`}
        onFinish={onFinish}
      >
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
                className={`myh-value ${format.className()}`}
                autoComplete="off"
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
