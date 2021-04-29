import React, { MouseEvent } from "react"; // FC functional control.
import { Story, Meta } from "@storybook/react";
import "antd/dist/antd.css";

import { Button, Row, Col, message } from "antd";

import MQTTProvider, {
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";

import { HEXValueEdit } from "../mqtt/ValueFormat";

import InputCard from "../units/InputCard";

export default {
  title: "MQTT/MQTTProvider",
  decorators: [
    (Story) => (
      <MQTTProvider>
        <Story />
      </MQTTProvider>
    ),
  ],
} as Meta;

export const MQTTProviderStory: Story<void> = () => {
  const [
    { status, connected },
    { connect, disconnect, publish },
  ] = useMQTTContext();

  useMQTTSubscribe("pepe/cosa/cosita", (topic: string, mqttmessage: Buffer) => {
    message.info(mqttmessage.toString());
  });

  const handleConnect = (e: MouseEvent<HTMLElement>) => {
    message.info("me conecto");
    const url = "ws://broker.mqttdashboard.com:8000/mqtt";
    const username = "";
    const password = "";

    connect({
      url,
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
    message.info("me desconecto");
    disconnect();
  };
  const handlePublish = (e: MouseEvent<HTMLElement>) => {
    publish("pepe/cosa/cosita", "cocoloco");
  };

  return (
    <div className="App">
      <div>
        <Button type="primary" onClick={handleConnect}>
          Connect
        </Button>
        <Button type="primary" onClick={handleDisconnect}>
          Disconnect
        </Button>
        <Button type="default" onClick={handlePublish}>
          Publish Message
        </Button>
      </div>
      <div>{`Status: ${status}, Connected: ${connected}`}</div>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <InputCard
            title="cosita"
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </Col>
        <Col span={4}>
          <InputCard
            title="cosita2"
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={HEXValueEdit()}
          />
        </Col>
      </Row>
    </div>
  );
};
