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
import { Form, Input, Button, Row, Col, Layout, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { DispatchConnect } from "../AppStoreProvider";
import { ConnectInfo } from "./ConnectionInfo";
import { ConnectInfoForm } from "./ConnectInfoForm";
import ModalError from "../ModalError";
import AppHeader from "../AppHeader";
import "./ContentConnect.css";
import { ApiFilled } from "@ant-design/icons";

type ModalErrorInfo = {
  title: string;
  error: string;
  visible: boolean;
};

const ConnectRemote: React.FC<{
  connectInfo: ConnectInfo;
  username: string;
  password: string;
  clientId: string;
}> = ({ connectInfo, username, password, clientId }) => {
  const [form] = Form.useForm<ConnectInfoForm>();
  const dispatchConnect = useDispatch<DispatchConnect>();
  const HIDDEN: ModalErrorInfo = { visible: false, title: "", error: "" };
  const [errorinf, showError] = useState<ModalErrorInfo>(HIDDEN);

  const { TabPane } = Tabs;

  useEffect(() => {
    const connectInfoForm: ConnectInfoForm = {
      ...connectInfo,
      username,
      password,
      clientId,
    };
    form.setFieldsValue(connectInfoForm);
    window.scrollTo(0, 0);
  }, [connectInfo, username, password, clientId, form]);

  const handleFail = (): void => {
    showError({
      visible: true,
      title: "Connection values error",
      error: "Please fix the values with validation messages",
    });
  };

  const search = new URLSearchParams(window.location.search);
  const appname =
    search.get("connectinfoname") ?? search.get("connectinfo") ?? undefined;

  return (
    <>
      <ModalError {...errorinf} onOk={() => showError(HIDDEN)} />
      <Form
        form={form}
        name="connection"
        onFinish={(connectInfoForm) => {
          dispatchConnect({
            type: "connect",
            username: connectInfoForm.username,
            password: connectInfoForm.password,
            clientId: connectInfoForm.clientId,
          });
        }}
        onFinishFailed={handleFail}
        className="myhConnectionForm"
      >
        <Layout className="myhLayout">
          <AppHeader subtitle={appname}>
            <Button icon={<ApiFilled />} type="primary" htmlType="submit">
              Connect
            </Button>
          </AppHeader>
          <Layout.Content className="myhLayoutContent">
            <div className="myhLayoutContent-panel">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Credentials" key="1" forceRender>
                  <Row gutter={[8, { xs: 2, sm: 2, md: 8, lg: 8 }]}>
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
                    <Col xs={24} sm={18} md={18} lg={12}>
                      <Form.Item name="username">
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
                      <label htmlFor="password" title="Password">
                        Password
                      </label>
                    </Col>
                    <Col xs={24} sm={18} md={18} lg={12}>
                      <Form.Item name="password">
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} />
                  </Row>
                </TabPane>
                <TabPane tab="MQTT Connection" key="2" forceRender>
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
                        <Input autoComplete="off" disabled />
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
                        <Input autoComplete="off" disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={12} lg={12} />{" "}
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Layout.Content>{" "}
        </Layout>
      </Form>
    </>
  );
};
export default ConnectRemote;
