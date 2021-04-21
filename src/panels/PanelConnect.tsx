import React, { useEffect, MouseEvent } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";

import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";

type ConnectInfo = { url: string; username: string; password: string };

const PanelConnect: React.FC<{}> = () => {
  const [
    { status, connected },
    { connect, disconnect, publish },
  ] = useMQTTContext();

  const [form] = Form.useForm<ConnectInfo>();
  useMQTTSubscribe("pepe/cosa/cosita", (topic: string, mqttmessage: Buffer) => {
    message.info(mqttmessage.toString());
  });

  useEffect(() => {
    const item = window.localStorage.getItem("mqttconnect");
    if (item) {
      form.setFieldsValue(JSON.parse(item));
    }
  });

  const handleConnect = ({ url, username, password }: ConnectInfo) => {
    window.localStorage.setItem(
      "mqttconnect",
      JSON.stringify({ url, username, password })
    );
    message.info("me conecto");
    // const url = "ws://broker.mqttdashboard.com:8000/mqtt";
    // const username = "";
    // const password = "";

    connect({
      url,
      options: {
        username,
        password,
        connectTimeout: 5000,
        clientId:
          "myhelloiot_" + Math.random().toString(16).substr(2).padEnd(13, "0"),
      },
    });
  };

  const handleDisconnect = (e: MouseEvent<HTMLElement>) => {
    message.info("me desconecto");
    disconnect();
  };
  const handlePublish = (e: MouseEvent<HTMLElement>) => {
    publish("pepe/cosa/cosita", "cocoloco");
  };
  return (
    <div style={{ padding: "24px" }}>
      <Form form={form} name="connection" onFinish={handleConnect}>
        <Row gutter={8} wrap={false}>
          <Col span="6">
            <Form.Item
              label="URL"
              name="url"
              rules={[
                {
                  required: true,
                  message: "Please input the url of the MQTT broker.",
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span="6">
            <Form.Item label="User" name="username">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span="6">
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8} wrap={false}>
          <Col>
            <Button type="primary" htmlType="submit">
              Connect
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </Col>
          <Col>
            <Button type="default" onClick={handlePublish}>
              Publish Message
            </Button>
          </Col>
          <Col>
            <div>{`Status: ${status}, Connected: ${connected}`}</div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default PanelConnect;
