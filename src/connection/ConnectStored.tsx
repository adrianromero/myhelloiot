/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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
    Layout,
    Tabs,
    Checkbox,
    Select,
    Switch,
} from "antd";
import type { QoS } from "mqtt-packet";
import { useAppDispatch } from "../app/hooks";
import {
    connect,
    loadConnectionCredentials,
    loadConnectionInfo,
} from "../app/sliceConnection";
import {
    ConnectCredentials,
    ConnectInfo,
    ConnectedStatus,
    saveStoreConnectConnected,
    saveStoreConnectCredentials,
    saveStoreConnectInfo,
} from "./ConnectionInfo";
import { ConnectInfoForm } from "./ConnectInfoForm";
import ModalError from "../ModalError";
import AppHeader from "../AppHeader";
import UploadRaw from "./UploadRaw";
import ContentConnectAbout from "./ContentConnectAbout";
import "./ContentConnect.css";
import SVGIcon from "../format/SVGIcon";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

type ModalErrorInfo = {
    title: string;
    errorMessage: string;
    visible: boolean;
};

const ConnectStored: React.FC<{
    connectInfo: ConnectInfo;
    connectCredentials: ConnectCredentials;
}> = ({ connectInfo, connectCredentials }) => {
    const [form] = Form.useForm<ConnectInfoForm>();
    const will = Form.useWatch("will", form);
    const dispatch = useAppDispatch();
    const HIDDEN: ModalErrorInfo = {
        visible: false,
        title: "",
        errorMessage: "",
    };
    const [errorinf, showError] = useState<ModalErrorInfo>(HIDDEN);

    useEffect(() => {
        const connectInfoForm: ConnectInfoForm = {
            ...connectInfo,
            ...connectCredentials,
        };
        form.setFieldsValue(connectInfoForm);
        window.scrollTo(0, 0);
    }, [form, connectInfo, connectCredentials]);

    useEffect(() => {
        form.validateFields(["willtopic", "willqos", "willretain"]);
    }, [form, will]);

    const handleFail = (): void => {
        showError({
            visible: true,
            title: "Connection values error",
            errorMessage: "Please fix the values with validation messages",
        });
    };
    return (
        <>
            <ModalError {...errorinf} onOk={() => showError(HIDDEN)} />
            <Form
                form={form}
                name="connection"
                onFinish={connectInfoForm => {
                    const connectInfoNew: ConnectInfo = {
                        clientId: connectInfoForm.clientId,
                        url: connectInfoForm.url,
                        keepalive: connectInfoForm.keepalive,
                        protocolVersion: connectInfoForm.protocolVersion,
                        clean: connectInfoForm.clean,
                        connectTimeout: connectInfoForm.connectTimeout,
                        reconnectPeriod: connectInfoForm.reconnectPeriod,
                        will: connectInfoForm.will,
                        willtopic: connectInfoForm.willtopic,
                        willqos: connectInfoForm.willqos,
                        willretain: connectInfoForm.willretain,
                        willpayload: connectInfoForm.willpayload,
                        dashboard: connectInfoForm.dashboard,
                        dashboardcss: connectInfoForm.dashboardcss,
                    };
                    const connectCredentialsNew: ConnectCredentials = {
                        username: connectInfoForm.username,
                        password: connectInfoForm.password,
                    };

                    try {
                        saveStoreConnectInfo(connectInfoNew);
                        saveStoreConnectCredentials(connectCredentialsNew);
                        saveStoreConnectConnected(ConnectedStatus.CONNECTED);
                        dispatch(
                            loadConnectionInfo({ connectInfo: connectInfoNew }),
                        );
                        dispatch(
                            loadConnectionCredentials({
                                connectCredentials: connectCredentialsNew,
                            }),
                        );
                        dispatch(connect());
                    } catch {
                        showError({
                            visible: true,
                            title: "Connection error",
                            errorMessage:
                                "Connection values cannot be stored locally. Please review the application permissions.",
                        });
                    }
                }}
                onFinishFailed={handleFail}
                className="myhConnectionForm"
            >
                <Layout className="myhLayout">
                    <AppHeader title="Dashboard properties">
                        <Button
                            icon={<SVGIcon icon={faPowerOff} />}
                            type="primary"
                            htmlType="submit"
                        >
                            Connect
                        </Button>
                    </AppHeader>
                    <Layout.Content className="myhLayoutContent">
                        <div className="myhLayoutContent-panel">
                            <Tabs
                                defaultActiveKey="1"
                                items={[
                                    {
                                        label: "About",
                                        key: "1",
                                        children: (
                                            <ContentConnectAbout form={form} />
                                        ),
                                    },
                                    {
                                        label: "MQTT Connection",
                                        key: "3",
                                        forceRender: true,
                                        children: (
                                            <Row
                                                className="ant-form-item"
                                                gutter={[
                                                    8,
                                                    {
                                                        xs: 2,
                                                        sm: 2,
                                                        md: 8,
                                                        lg: 8,
                                                    },
                                                ]}
                                            >
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
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
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={18}
                                                    lg={12}
                                                >
                                                    <Form.Item
                                                        name="url"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please input the url of the MQTT broker.",
                                                            },
                                                        ]}
                                                    >
                                                        <Input autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="username"
                                                        title="User"
                                                    >
                                                        User
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
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
                                                    <label
                                                        htmlFor="password"
                                                        title="Password"
                                                    >
                                                        Password
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item name="password">
                                                        <Input.Password />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="clientId"
                                                        title="Client ID"
                                                    >
                                                        Client ID
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item name="clientId">
                                                        <Input autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={12}
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
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="keepalive"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please define a Keep alive value.",
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="protocolVersion"
                                                        className="ant-form-item-required"
                                                        title="Protocol version"
                                                    >
                                                        Protocol version
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="protocolVersion"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please define a Protocol version.",
                                                            },
                                                        ]}
                                                    >
                                                        <Select<number>
                                                            style={{
                                                                width: 120,
                                                            }}
                                                            options={[
                                                                {
                                                                    value: 3,
                                                                    label: "MQIsdp 3.1",
                                                                },
                                                                {
                                                                    value: 4,
                                                                    label: "MQTT 3.1.1",
                                                                },
                                                                {
                                                                    value: 5,
                                                                    label: "MQTT 5.0",
                                                                },
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="clean"
                                                        className="ant-form-item-required"
                                                        title="Clean session"
                                                    >
                                                        Clean session
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="clean"
                                                        valuePropName="checked"
                                                    >
                                                        <Switch />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={12}
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
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
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
                                                    xs={12}
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
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="reconnectPeriod"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please define a Reconnect period value.",
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={8}
                                                ></Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={18}
                                                    lg={12}
                                                >
                                                    <Form.Item
                                                        name="will"
                                                        valuePropName="checked"
                                                    >
                                                        <Checkbox>
                                                            Last will message
                                                        </Checkbox>
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Form.Item noStyle shouldUpdate>
                                                    {({ getFieldValue }) => {
                                                        const disabled =
                                                            !getFieldValue(
                                                                "will",
                                                            );

                                                        return (
                                                            <>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                                <Col
                                                                    xs={24}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willtopic"
                                                                        className="ant-form-item-required"
                                                                        title="Topic"
                                                                    >
                                                                        Topic
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={24}
                                                                    sm={18}
                                                                    md={18}
                                                                    lg={12}
                                                                >
                                                                    <Form.Item
                                                                        name="willtopic"
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    !disabled,
                                                                                message:
                                                                                    "Please input the url of the topic for the last will message.",
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />

                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                                <Col
                                                                    xs={24}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willpayload"
                                                                        title="Payload"
                                                                    >
                                                                        Payload
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={24}
                                                                    sm={18}
                                                                    md={18}
                                                                    lg={12}
                                                                >
                                                                    <Form.Item name="willpayload">
                                                                        <Input
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />

                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                                <Col
                                                                    xs={12}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willqos"
                                                                        className="ant-form-item-required"
                                                                        title="QoS"
                                                                    >
                                                                        QoS
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={12}
                                                                    sm={18}
                                                                    md={6}
                                                                    lg={4}
                                                                >
                                                                    <Form.Item
                                                                        name="willqos"
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    !disabled,
                                                                                message:
                                                                                    "Please input the QoS for the last will message.",
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Select<QoS>
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            style={{
                                                                                width: 120,
                                                                            }}
                                                                            options={[
                                                                                {
                                                                                    value: 0,
                                                                                    label: "0",
                                                                                },
                                                                                {
                                                                                    value: 1,
                                                                                    label: "1",
                                                                                },
                                                                                {
                                                                                    value: 2,
                                                                                    label: "2",
                                                                                },
                                                                            ]}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={12}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willretail"
                                                                        className="ant-form-item-required"
                                                                        title="Retain"
                                                                    >
                                                                        Retain
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={12}
                                                                    sm={18}
                                                                    md={6}
                                                                    lg={4}
                                                                >
                                                                    <Form.Item
                                                                        name="willretain"
                                                                        valuePropName="checked"
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    !disabled,
                                                                                message:
                                                                                    "Please input the retain value for the last will message.",
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Switch
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                            </>
                                                        );
                                                    }}
                                                </Form.Item>
                                            </Row>
                                        ),
                                    },
                                    {
                                        label: "Dashboard",
                                        key: "4",
                                        forceRender: true,
                                        children: (
                                            <Row
                                                gutter={[
                                                    8,
                                                    {
                                                        xs: 2,
                                                        sm: 2,
                                                        md: 8,
                                                        lg: 8,
                                                    },
                                                ]}
                                            >
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={16}
                                                >
                                                    <Form.Item
                                                        name="dashboard"
                                                        rules={[
                                                            {
                                                                validator: (
                                                                    _,
                                                                    value,
                                                                ) =>
                                                                    value?.data?.trim()
                                                                        ? Promise.resolve()
                                                                        : Promise.reject(
                                                                              new Error(
                                                                                  "Please upload a dashboard definition file.",
                                                                              ),
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
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                            </Row>
                                        ),
                                    },
                                    {
                                        label: "Styles",
                                        key: "5",
                                        forceRender: true,
                                        children: (
                                            <Row
                                                gutter={[
                                                    8,
                                                    {
                                                        xs: 2,
                                                        sm: 2,
                                                        md: 8,
                                                        lg: 8,
                                                    },
                                                ]}
                                            >
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={16}
                                                >
                                                    <Form.Item name="dashboardcss">
                                                        <UploadRaw
                                                            accept=".css"
                                                            className="myhConnectionForm-dashboardcss"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                            </Row>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </Layout.Content>
                </Layout>
            </Form>
        </>
    );
};
export default ConnectStored;
