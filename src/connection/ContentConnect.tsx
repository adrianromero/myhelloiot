/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Radio,
  Layout,
  Tabs,
  Typography,
  Card,
  Tag,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ConnectInfo } from "./ConnectionInfo";
import ModalError from "../ModalError";
import AppHeader from "../AppHeader";
import { AppStoreValue, AppStoreDispatch } from "../AppStoreProvider";
import UploadRaw from "./UploadRaw";
import { ReactComponent as GitHubRibbon } from "../assets/svg/github.svg";
import myhelloiot from "../assets/myhelloiot.png";
import "./ContentConnect.css";
import { BranchesOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

type ModalErrorInfo = {
  title: string;
  error: string;
  visible: boolean;
};

const PanelConnect: React.FC<{}> = () => {
  const [form] = Form.useForm<ConnectInfo>();
  const dispatch = useDispatch<AppStoreDispatch>();
  const connectInfo = useSelector<AppStoreValue, ConnectInfo>(
    (s) => s.connectInfo
  );
  const HIDDEN: ModalErrorInfo = { visible: false, title: "", error: "" };
  const [errorinf, showError] = useState<ModalErrorInfo>(HIDDEN);

  const { TabPane } = Tabs;

  useEffect(() => {
    form.setFieldsValue(connectInfo);
    window.scrollTo(0, 0);
  }, [connectInfo, form]);

  const handleConnect = (newConnectInfo: ConnectInfo): void => {
    dispatch({
      type: "set",
      newState: { connected: "connected", connectInfo: newConnectInfo },
    });
  };

  const handleFail = (): void => {
    showError({
      visible: true,
      title: "Connection values error",
      error: "Please fix the values with validation messages",
    });
  };

  return (
    <>
      <ModalError {...errorinf} onOk={() => showError(HIDDEN)} />
      <Form
        form={form}
        name="connection"
        onFinish={handleConnect}
        onFinishFailed={handleFail}
        className="myhConnectionForm"
      >
        <Layout>
          <AppHeader>
            <div className="myhMenuDisplayButton"></div>
            <Button type="primary" htmlType="submit">
              Connect
            </Button>
          </AppHeader>
          <Layout.Content className="myhMainLayout">
            <div className="myhAppContent-panel">
              <Tabs defaultActiveKey="1">
                <TabPane tab="MQTT connection" key="1" forceRender>
                  <Row gutter={[8, { xs: 2, sm: 2, md: 8, lg: 8 }]}>
                    <Col xs={0} sm={0} md={0} lg={4} />
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label
                        htmlFor="url"
                        className="ant-form-item-required"
                        title="URL"
                      >
                        URL
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={18} lg={12}>
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
                    <Col xs={0} sm={0} md={0} lg={4} />

                    <Col xs={0} sm={0} md={0} lg={4} />
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label htmlFor="username" title="User">
                        User
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
                      <Form.Item name="username">
                        <Input autoComplete="off" />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label htmlFor="password" title="Password">
                        Password
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
                      <Form.Item name="password">
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} />

                    <Col xs={0} sm={0} md={0} lg={4} />
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label
                        htmlFor="clientId"
                        className="ant-form-item-required"
                        title="Client ID"
                      >
                        Client ID
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
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
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label
                        htmlFor="keepalive"
                        className="ant-form-item-required"
                        title="Keep alive"
                      >
                        Keep alive
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
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
                    <Col xs={0} sm={0} md={0} lg={4} />

                    <Col xs={0} sm={0} md={0} lg={4} />
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label
                        htmlFor="connectTimeout"
                        className="ant-form-item-required"
                        title="Connection timeout"
                      >
                        Connection timeout
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
                      <Form.Item
                        name="connectTimeout"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please define a Connection timeout value.",
                          },
                        ]}
                      >
                        <InputNumber autoComplete="off" />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label
                        htmlFor="reconnectPeriod"
                        className="ant-form-item-required"
                        title="Reconnect period"
                      >
                        Reconnect period
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
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
                    <Col xs={0} sm={0} md={0} lg={4} />

                    <Col xs={0} sm={0} md={0} lg={4} />
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={4}
                      className="ant-form-item-label"
                    >
                      <label htmlFor="onlinetopic" title="Online topic">
                        Online topic
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={6} lg={4}>
                      <Form.Item name="onlinetopic">
                        <Input autoComplete="off" />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ offset: 0, span: 24 }}
                      sm={{ offset: 6, span: 18 }}
                      md={{ offset: 0, span: 12 }}
                      lg={{ offset: 0, span: 8 }}
                    >
                      <Form.Item name="onlineqos">
                        <Radio.Group>
                          <Radio value={0}>QoS 0</Radio>
                          <Radio value={1}>QoS 1</Radio>
                          <Radio value={2}>QoS 2</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} />
                  </Row>
                </TabPane>
                <TabPane tab="Dashboard" key="2" forceRender>
                  <Tabs
                    defaultActiveKey="1"
                    type="card"
                    tabPosition="left"
                    size="small"
                  >
                    <TabPane tab="JSX" key="2" forceRender>
                      <Row gutter={[8, { xs: 2, sm: 2, md: 8, lg: 8 }]}>
                        <Col xs={0} sm={0} md={0} lg={4} />
                        <Col xs={24} sm={24} md={24} lg={16}>
                          <Form.Item
                            name="dashboard"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value?.data?.trim()
                                    ? Promise.resolve()
                                    : Promise.reject(
                                        new Error(
                                          "Please upload a dashboard definition file."
                                        )
                                      ),
                              },
                            ]}
                          >
                            <UploadRaw
                              accept=".jsx"
                              className="myhConnectionForm-dashboard"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={4} />
                      </Row>
                    </TabPane>
                    <TabPane tab="CSS" key="3" forceRender>
                      <Row gutter={[8, { xs: 2, sm: 2, md: 8, lg: 8 }]}>
                        <Col xs={0} sm={0} md={0} lg={4} />
                        <Col xs={24} sm={24} md={24} lg={16}>
                          <Form.Item name="dashboardcss">
                            <UploadRaw
                              accept=".css"
                              className="myhConnectionForm-dashboardcss"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={4} />
                      </Row>
                    </TabPane>
                    <TabPane tab="Options" key="4" forceRender>
                      Options
                    </TabPane>
                  </Tabs>
                </TabPane>
                <TabPane tab="About" key="3">
                  <Card>
                    <Link
                      href="https://github.com/adrianromero"
                      target="_blank"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                      }}
                    >
                      <GitHubRibbon
                        style={{
                          transformOrigin: "top right",
                          transform: "scale(0.8)",
                        }}
                      />
                    </Link>

                    <Typography>
                      <Title level={2}>
                        MYHELLOIOT{" "}
                        <Tag icon={<BranchesOutlined />} color="geekblue">
                          1.0.0
                        </Tag>
                      </Title>
                      <Paragraph>
                        MYHELLOIOT is a{" "}
                        <Link
                          href="https://en.wikipedia.org/wiki/MQTT"
                          target="_blank"
                        >
                          MQTT
                        </Link>{" "}
                        dashboard application. You can use MYHELLOIOT as a MQTT
                        client application to publish and subscribe to topics or
                        you can use MYHELLOIOT as a client platform to create
                        your own dashboard. MYHELLOIOT is a PWA application and
                        it can run on your favorite browser or installed on
                        Windows, MacOS, Linux or Android.
                      </Paragraph>
                      <Paragraph>
                        <Image src={myhelloiot} width={480} />
                      </Paragraph>
                      <Paragraph>
                        After massive project practice and summaries, Ant
                        Design, a design language for background applications,
                        is refined by Ant UED Team, which aims to
                        <Text strong>
                          uniform the user interface specs for internal
                          background projects, lower the unnecessary cost of
                          design differences and implementation and liberate the
                          resources of design and front-end development
                        </Text>
                        .
                      </Paragraph>
                      <Title level={2}>Guidelines and Resources</Title>
                      <Paragraph>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (
                        <Text code>Sketch</Text> and <Text code>Axure</Text>),
                        to help people create their product prototypes
                        beautifully and efficiently.
                      </Paragraph>

                      <Paragraph>
                        <ul>
                          <li>
                            <Button
                              onClick={() =>
                                form.setFieldsValue({
                                  url: "wss://broker.emqx.io:8084/mqtt",
                                })
                              }
                            >
                              Sets the EMQ.IO test broker
                            </Button>
                          </li>
                          <li>
                            <Button
                              onClick={() =>
                                form.setFieldsValue({
                                  url: "wss://test.mosquitto.org:8081",
                                })
                              }
                            >
                              Sets Mosquito test broker
                            </Button>
                          </li>
                          <li>
                            <Button onClick={() => form.submit()}>
                              Conneeeects
                            </Button>
                          </li>
                          <li>
                            <Link
                              href="https://github.com/adrianromero/myhelloiot"
                              target="_blank"
                            >
                              MyHelloIoT on Github
                            </Link>
                          </li>
                        </ul>
                      </Paragraph>
                    </Typography>
                  </Card>
                </TabPane>
              </Tabs>
            </div>
          </Layout.Content>
        </Layout>
      </Form>
    </>
  );
};
export default PanelConnect;
