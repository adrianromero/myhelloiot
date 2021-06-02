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

import React, { useEffect } from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt";

import { useMQTTContext, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { ValueFormat } from "../format/FormatTypes";
import { StrValueFormat } from "../format/ValueFormat";

type InputUnitProps = {
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  format?: ValueFormat;
  className?: string;
};

const InputUnit: React.FC<InputUnitProps> = ({
  pubtopic = "",
  subtopic = "",
  puboptions,
  suboptions,
  format = StrValueFormat(),
  className,
}) => {
  const [{ connected, ready }, { publish }] = useMQTTContext();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      mqttValue: "",
    });
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useMQTTSubscribe(
    subtopic,
    (topic: string, mqttmessage: Buffer) => {
      form.setFieldsValue({
        mqttValue: format.toDisplay(mqttmessage),
      });
    },
    suboptions
  );

  const onFinish = (values: any) => {
    publish(pubtopic, format.fromDisplay(values.mqttValue), puboptions);
  };

  return (
    <Form
      form={form}
      name={`inputcard_${Math.random().toString(16).substr(2).padEnd(13, "0")}`}
      onFinish={onFinish}
      className={className}
    >
      <Row gutter={8} wrap={false}>
        <Col flex="auto">
          <Form.Item
            name="mqttValue"
            rules={[
              {
                validator: (_, value) => {
                  try {
                    format.fromDisplay(value);
                    return Promise.resolve();
                  } catch {
                    return Promise.reject(
                      new Error("Value cannot be formatted.")
                    );
                  }
                },
              },
            ]}
          >
            <Input
              className={`myh-value ${format.className()}`}
              autoComplete="off"
              readOnly={pubtopic === ""}
              bordered={pubtopic !== ""}
              disabled={!connected}
            />
          </Form.Item>
        </Col>
        {pubtopic !== "" && (
          <Col flex="none">
            <Form.Item>
              <Button
                icon={<SendOutlined style={{ lineHeight: 1.3 }} />}
                type="primary"
                disabled={!connected}
                htmlType="submit"
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};
export default InputUnit;
