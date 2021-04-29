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
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="url"
                className="ant-form-item-required"
                title="URL"
              >
                URL
              </label>
            </Col>
            <Col span={12}>
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
            <Col span={4} className="ant-form-item-label">
              <label htmlFor="username" title="User">
                User
              </label>
            </Col>
            <Col span={4}>
              <Form.Item name="username">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="password"
                className="ant-form-item-required"
                title="Password"
              >
                Password
              </label>
            </Col>
            <Col span={4}>
              <Form.Item name="password">
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="clientId"
                className="ant-form-item-required"
                title="Client ID"
              >
                Client ID
              </label>
            </Col>
            <Col span={4}>
              <Form.Item
                name="clientId"
                rules={[
                  {
                    required: true,
                    message: "Please define a Client ID.",
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="keepalive"
                className="ant-form-item-required"
                title="Keep alive"
              >
                Keep alive
              </label>
            </Col>
            <Col span={4}>
              <Form.Item
                name="keepalive"
                rules={[
                  {
                    required: true,
                    message: "Please define a Keep alive value.",
                  },
                ]}
              >
                <InputNumber autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="connectTimeout"
                className="ant-form-item-required"
                title="Connection timeout"
              >
                Connection timeout
              </label>
            </Col>
            <Col span={4}>
              <Form.Item
                name="connectTimeout"
                rules={[
                  {
                    required: true,
                    message: "Please define a Connection timeout value.",
                  },
                ]}
              >
                <InputNumber autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="reconnectPeriod"
                className="ant-form-item-required"
                title="Reconnect period"
              >
                Reconnect period
              </label>
            </Col>
            <Col span={4}>
              <Form.Item
                name="reconnectPeriod"
                rules={[
                  {
                    required: true,
                    message: "Please define a Reconnect period value.",
                  },
                ]}
              >
                <InputNumber autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={4} className="ant-form-item-label">
              <label htmlFor="onlinetopic" title="Online topic">
                Online topic
              </label>
            </Col>
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
            <Col span={4} className="ant-form-item-label">
              <label
                htmlFor="automatic"
                className="ant-form-item-required"
                title="Automatic connection"
              >
                Automatic connection
              </label>
            </Col>
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
