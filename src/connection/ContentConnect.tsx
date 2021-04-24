import React, { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Row,
  Col,
  Radio,
  Layout,
} from "antd";

import { useMQTTContext } from "../mqtt/MQTTProvider";
import { connectWithInfo } from "../ConnectionInfo";
import { ConnectInfo } from "../ConnectionInfo";
import "./ContentConnect.css";

const PanelConnect: React.FC<{}> = () => {
  const [, { connect }] = useMQTTContext();

  const [form] = Form.useForm<ConnectInfo>();

  useEffect(() => {
    const item = window.localStorage.getItem("mqttconnect");
    if (item) {
      form.setFieldsValue(JSON.parse(item));
    } else {
      form.setFieldsValue({
        url: "ws://localhost:9001",
        username: "",
        password: "",
        clientId:
          "myhelloiot_" + Math.random().toString(16).substr(2).padEnd(13, "0"),
        keepalive: 60,
        connectTimeout: 30000,
        reconnectPeriod: 1000,
        onlinetopic: "",
        onlineqos: 0,
        automatic: false,
      });
    }
  });

  const handleConnect = (connectinfo: ConnectInfo) => {
    window.localStorage.setItem("mqttconnect", JSON.stringify(connectinfo));
    connectWithInfo(connect, connectinfo);
  };

  return (
    <Layout.Content>
      <div style={{ padding: "24px" }}>
        <Form
          form={form}
          name="connection"
          onFinish={handleConnect}
          className="myhConnectionForm"
        >
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Connect
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span="2">*URL:</Col>
            <Col span="10">
              <Form.Item
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
          </Row>
          <Row gutter={[8, 8]}>
            <Col span="2">User:</Col>
            <Col span="4">
              <Form.Item name="username">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span="2">Password:</Col>
            <Col span="4">
              <Form.Item name="password">
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span="2">Client ID:</Col>
            <Col span="4">
              <Form.Item name="clientId">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span="2">Keep alive:</Col>
            <Col span="4">
              <Form.Item name="keepalive">
                <InputNumber autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span="2">Connection timeout:</Col>
            <Col span="4">
              <Form.Item name="connectTimeout">
                <InputNumber autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span="2">Reconnect period:</Col>
            <Col span={4}>
              <Form.Item name="reconnectPeriod">
                <InputNumber autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span="2">Online topic:</Col>
            <Col span={4}>
              <Form.Item name="onlinetopic">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="onlineqos">
                <Radio.Group>
                  <Radio value={0}>QoS 0</Radio>
                  <Radio value={1}>QoS 1</Radio>
                  <Radio value={2}>QoS 2</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={2}>Automatic connection:</Col>
            <Col span={4}>
              <Form.Item name="automatic" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout.Content>
  );
};
export default PanelConnect;
