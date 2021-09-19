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
} from "antd";
import { useSelector } from "react-redux";
import { ConnectInfo } from "./ConnectionInfo";
import ModalError from "../ModalError";
import AppHeader from "../AppHeader";
import { AppStoreValue, useDispatchConnect } from "../AppStoreProvider";
import UploadRaw from "./UploadRaw";
import ContentConnectAbout from "./ContentConnectAbout";
import "./ContentConnect.css";
import { ApiFilled } from "@ant-design/icons";

type ModalErrorInfo = {
  title: string;
  error: string;
  visible: boolean;
};

const PanelConnect: React.FC<{}> = () => {
  const [form] = Form.useForm<ConnectInfo>();
  const dispatchConnect = useDispatchConnect();
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
        onFinish={dispatchConnect}
        onFinishFailed={handleFail}
        className="myhConnectionForm"
      >
        <Layout className="myhLayout">
          <AppHeader>
            <Button icon={<ApiFilled />} type="primary" htmlType="submit">
              Connect
            </Button>
          </AppHeader>
          <Layout.Content className="myhLayoutContent">
            <div className="myhLayoutContent-panel">
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
                    tabPosition="bottom"
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
                  </Tabs>
                </TabPane>
                <TabPane tab="About" key="3">
                  <ContentConnectAbout form={form} />
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
