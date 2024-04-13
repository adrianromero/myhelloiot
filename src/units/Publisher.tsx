/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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
  Button,
  Input,
  Radio,
  Form,
  Row,
  Col,
  RadioChangeEvent,
  notification,
  Switch,
  Select,
} from "antd";
import SVGIcon from "../format/SVGIcon";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import type { QoS } from "mqtt-packet";
import { useMQTTContext } from "../mqtt/MQTTHooks";
import { ValueFormat } from "../format/FormatTypes";
import {
  StringValueFormat,
  JSONValueFormat,
  HEXValueFormat,
  Base64ValueFormat,
} from "../format/ValueFormat";
import Title from "antd/lib/typography/Title";

import "./Publisher.css";

type PublisherProps = {
  prefixtopic?: string;
  topic?: string;
  value?: string;
  retain?: boolean;
  qos?: QoS;
  fmt?: FMT;
  optiontopic?: boolean;
  optionretain?: boolean;
  optionqos?: boolean;
  optionfmt?: boolean;
  className?: string;
};

enum FMT {
  PLAIN = "plain",
  JSON = "json",
  HEX = "hex",
  BASE64 = "base64",
}

type PublisherValues = {
  topic?: string;
  value: string;
  retain?: boolean;
  qos?: QoS;
  fmt?: FMT;
};

const FMTValueFormat: Map<FMT, { format: ValueFormat; message: string }> =
  new Map([
    [
      FMT.PLAIN,
      { format: StringValueFormat(), message: "Value cannot be formatted." },
    ],
    [
      FMT.JSON,
      {
        format: JSONValueFormat(),
        message: "Value cannot be formatted to JSON.",
      },
    ],
    [
      FMT.HEX,
      {
        format: HEXValueFormat(),
        message: "Value cannot be formatted to hexadecimal.",
      },
    ],
    [
      FMT.BASE64,
      {
        format: Base64ValueFormat(),
        message: "Value cannot be formatted to base 64.",
      },
    ],
  ]);

const Publisher: React.FC<PublisherProps> = ({
  prefixtopic = "",
  topic = "",
  value = "",
  retain = false,
  qos = 0,
  fmt = FMT.PLAIN,
  optiontopic = true,
  optionretain = true,
  optionqos = true,
  optionfmt = true,
  className = "",
}) => {
  const [{ ready }, { publish }] = useMQTTContext();
  const [form] = Form.useForm<PublisherValues>();
  useEffect(() => {
    form.setFieldsValue({
      topic,
      value,
      retain,
      qos,
      fmt,
    });
  }, [ready, topic, value, retain, qos, fmt]); // eslint-disable-line react-hooks/exhaustive-deps

  const [formFmt, setFormFmt] = useState<FMT>(FMT.PLAIN);
  const [notificationInstance, notificationContext] = notification.useNotification();

  useEffect(() => {
    form.validateFields(["value"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFmt]);

  const onFinish = (formvalues: PublisherValues) => {
    const values = { topic, retain, qos, fmt, ...formvalues };
    const format: ValueFormat =
      FMTValueFormat.get(values.fmt ?? fmt)?.format ?? StringValueFormat();
    publish(prefixtopic + values.topic, format.fromDisplay(values.value), {
      qos: values.qos,
      retain: values.retain,
    });
    notificationInstance.success({
      message:
        prefixtopic + values.topic ? prefixtopic + values.topic : "<EMPTY>",
      description: values.value ? values.value : "<EMPTY>",
      duration: 2.5,
      placement: "bottomRight",
    });
  };

  return (
    <div className={`myhPublisher ${className}`}>
      <Form
        form={form}
        name={`publisher_${Math.random()
          .toString(16)
          .substring(2)
          .padEnd(13, "0")}`}
        onFinish={onFinish}
      >
        <div className="myhPublisher-header">
          <div className="myhPublisher-title">
            <Title level={5}>{prefixtopic + (optiontopic ? "" : topic)}</Title>
          </div>
          <div className="myhPublisher-send">
            <div className="myhPublisher-sendinput">
              {optiontopic && (
                <Form.Item name="topic">
                  <Input autoComplete="off" />
                </Form.Item>
              )}
            </div>
            <div>
              <Form.Item>
                <Button
                  icon={<SVGIcon icon={faPaperPlane} />}
                  type="primary"
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </div>
          </div>
          {optionfmt && (
            <div className="myhPublisher-toolbar">
              <Form.Item name="fmt" noStyle>
                {/* margin-bottom: 12px;  and align  right */}
                <Radio.Group
                  options={[
                    { label: "Plain", value: FMT.PLAIN },
                    { label: "HEX", value: FMT.HEX },
                    { label: "Base64", value: FMT.BASE64 }
                  ]}
                  onChange={(e: RadioChangeEvent) => setFormFmt(e.target.value)}
                  optionType="button" />
              </Form.Item>
            </div>
          )}
        </div>

        <Row gutter={8}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name="value"
              rules={[
                {
                  validator: (_r, value) => {
                    try {
                      const format: ValueFormat =
                        FMTValueFormat.get(formFmt)?.format ??
                        StringValueFormat();
                      format.fromDisplay(value);
                      return Promise.resolve();
                    } catch (error) {
                      return Promise.reject(
                        new Error(
                          FMTValueFormat.get(formFmt)?.message ??
                          "Value cannot be formatted."
                        )
                      );
                    }
                  },
                },
              ]}
            >
              <Input.TextArea
                rows={6}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        {(optionretain || optionqos) && (
          <Row className="ant-form-item" gutter={8}>
            <Col xs={0} sm={0} md={0} lg={4} />
            {optionqos && (<>
              <Col
                xs={12}
                sm={6}
                md={6}
                lg={4}
                className="ant-form-item-label"
              >
                <label
                  htmlFor="qos"
                  className="ant-form-item-required"
                  title="QoS"
                >
                  QoS
                </label>
              </Col>
              <Col xs={12} sm={18} md={6} lg={4}>
                <Form.Item name="qos">
                  <Select<QoS>
                    style={{ width: 120 }}
                    options={[
                      { value: 0, label: "0" },
                      { value: 1, label: "1" },
                      { value: 2, label: "2" }
                    ]}
                  />
                </Form.Item>
              </Col>
            </>)}
            {optionretain && (<>
              <Col
                xs={12}
                sm={6}
                md={6}
                lg={4}
                className="ant-form-item-label"
              >
                <label
                  htmlFor="retail"
                  className="ant-form-item-required"
                  title="Retain"
                >
                  Retain
                </label>
              </Col>
              <Col xs={12} sm={18} md={6} lg={4}>
                <Form.Item name="retain" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </>
            )}
            <Col xs={0} sm={0} md={0} lg={4} />
          </Row>
        )}
      </Form>
      {notificationContext}
    </div>
  );
};
export default Publisher;
