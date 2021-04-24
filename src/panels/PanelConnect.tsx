import React, { useEffect, MouseEvent } from "react";
import { Form, Input, Button, Row, Col, Radio } from "antd";

import { OnlineInfo, useMQTTContext } from "../mqtt/MQTTProvider";

import "./PanelConnect.css";
import { QoS } from "mqtt-packet";

type ConnectInfo = {
  url: string;
  username: string;
  password: string;
  onlinetopic: string;
  onlineqos: string;
};

const PanelConnect: React.FC<{}> = () => {
  const [{ status }, { connect, disconnect }] = useMQTTContext();

  const [form] = Form.useForm<ConnectInfo>();

  useEffect(() => {
    const item = window.localStorage.getItem("mqttconnect");
    if (item) {
      form.setFieldsValue(JSON.parse(item));
    } else {
      form.setFieldsValue({ url: "ws://localhost:9001", onlineqos: "0" });
    }
  });

  const handleConnect = ({
    url,
    username,
    password,
    onlinetopic,
    onlineqos,
  }: ConnectInfo) => {
    window.localStorage.setItem(
      "mqttconnect",
      JSON.stringify({ url, username, password, onlinetopic, onlineqos })
    );
    // const url = "ws://broker.mqttdashboard.com:8000/mqtt";
    // const username = "";
    // const password = "";

    const online: OnlineInfo | undefined = onlinetopic
      ? {
          topic: onlinetopic,
          qos: Number(onlineqos) as QoS,
          retain: true,
        }
      : undefined;

    connect({
      url,
      online,
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
    disconnect();
  };

  return (
    <div style={{ padding: "24px" }}>
      <Form
        form={form}
        name="connection"
        onFinish={handleConnect}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="myhConnectionForm"
      >
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
          <Input autoComplete="off" disabled={status !== "Disconnected"} />
        </Form.Item>
        <Form.Item label="User" name="username" wrapperCol={{ span: 8 }}>
          <Input autoComplete="off" disabled={status !== "Disconnected"} />
        </Form.Item>
        <Form.Item label="Password" name="password" wrapperCol={{ span: 8 }}>
          <Input.Password disabled={status !== "Disconnected"} />
        </Form.Item>

        <Form.Item label="Online topic">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item noStyle name="onlinetopic">
                <Input
                  autoComplete="off"
                  disabled={status !== "Disconnected"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item noStyle name="onlineqos">
                <Radio.Group disabled={status !== "Disconnected"}>
                  <Radio value="0">QoS 0</Radio>
                  <Radio value="1">QoS 1</Radio>
                  <Radio value="2">QoS 2</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button
            type="primary"
            disabled={status !== "Disconnected"}
            htmlType="submit"
          >
            Connect
          </Button>
          <Button
            type="primary"
            disabled={status === "Disconnected"}
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default PanelConnect;
