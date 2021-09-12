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
  Button,
  Input,
  Checkbox,
  Radio,
  Form,
  Row,
  Col,
  RadioChangeEvent,
  message,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { QoS } from "mqtt";

import { useMQTTContext } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import {
  StrValueFormat,
  JSONValueFormat,
  HEXValueFormat,
  Base64ValueFormat,
} from "../format/ValueFormat";

type PublisherProps = {
  prefixtopic?: string;
  className?: string;
};

enum FMT {
  PLAIN,
  JSON,
  HEX,
  BASE64,
}

type PublisherValues = {
  topic: string;
  value: string;
  retain: boolean;
  qos: QoS;
  fmt: FMT;
};

const FMTValueFormat: Map<FMT, { format: ValueFormat; message: string }> =
  new Map([
    [
      FMT.PLAIN,
      { format: StrValueFormat(), message: "Value cannot be formatted." },
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
  className,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [form] = Form.useForm<PublisherValues>();
  useEffect(() => {
    form.setFieldsValue({
      topic: "",
      value: "",
      retain: false,
      qos: 0,
      fmt: FMT.PLAIN,
    });
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const [fmt, setFmt] = useState<FMT>(FMT.PLAIN);

  useEffect(() => {
    form.validateFields(["value"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fmt]);

  const onFinish = (values: PublisherValues) => {
    const format: ValueFormat =
      FMTValueFormat.get(values.fmt)?.format ?? StrValueFormat();
    publish(prefixtopic + values.topic, format.fromDisplay(values.value), {
      qos: values.qos,
      retain: values.retain,
    });
    message.success(`Published: ${values.value}`);
  };

  const onFMTChange = (e: RadioChangeEvent) => {
    setFmt(e.target.value);
  };

  return (
    <Form
      className={`myhPublisher ${className || ""}`}
      form={form}
      name={`publisher_${Math.random().toString(16).substr(2).padEnd(13, "0")}`}
      onFinish={onFinish}
    >
      <Row gutter={8}>
        <Col xs={0} sm={0} md={0} lg={4} />
        <Col xs={24} sm={24} md={24} lg={16}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr min-content",
              columnGap: 8,
            }}
          >
            <div>
              <Form.Item name="topic">
                <Input autoComplete="off" disabled={!connected} />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Button
                  icon={<SendOutlined style={{ lineHeight: 1.3 }} />}
                  type="primary"
                  disabled={!connected}
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} />
      </Row>

      <Row gutter={8}>
        <Col xs={0} sm={0} md={0} lg={4} />
        <Col xs={24} sm={6} md={6} lg={4}>
          <Form.Item name="retain" valuePropName="checked">
            <Checkbox>Retain</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={18} lg={12}>
          <Form.Item name="qos">
            <Radio.Group>
              <Radio value={0}>QoS 0</Radio>
              <Radio value={1}>QoS 1</Radio>
              <Radio value={2}>QoS 2</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} />
      </Row>

      <Row gutter={8}>
        <Col xs={0} sm={0} md={0} lg={4} />
        <Col xs={24} sm={24} md={24} lg={16}>
          <Form.Item name="fmt">
            <Radio.Group onChange={onFMTChange}>
              <Radio value={FMT.PLAIN}>Plain</Radio>
              <Radio value={FMT.JSON}>JSON</Radio>
              <Radio value={FMT.HEX}>HEX</Radio>
              <Radio value={FMT.BASE64}>Base64</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} />
      </Row>

      <Row gutter={8} wrap={false}>
        <Col xs={0} sm={0} md={0} lg={4} />
        <Col xs={24} sm={24} md={24} lg={16}>
          <Form.Item
            name="value"
            rules={[
              {
                validator: (r, value) => {
                  try {
                    const format: ValueFormat =
                      FMTValueFormat.get(fmt)?.format ?? StrValueFormat();
                    format.fromDisplay(value);
                    return Promise.resolve();
                  } catch {
                    return Promise.reject(
                      new Error(
                        FMTValueFormat.get(fmt)?.message ??
                          "Value cannot be formatted."
                      )
                    );
                  }
                },
              },
            ]}
          >
            <Input.TextArea
              className="myh-value"
              rows={6}
              autoComplete="off"
              disabled={!connected}
            />
          </Form.Item>
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} />
      </Row>
    </Form>
  );
};
export default Publisher;
