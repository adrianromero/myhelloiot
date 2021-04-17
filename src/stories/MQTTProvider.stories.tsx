import React, { MouseEvent } from "react"; // FC functional control.
import { Story, Meta } from "@storybook/react";
import "antd/dist/antd.css";

import { Button, Row, Col, message } from "antd";

import MQTTProvider, {
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";

import { ToComposedIconEdit, ToIconFormat } from "../mqtt/FormatTypes";
import { ToHEX, ToBase64, ToIntlNumber, ToSwitch } from "../mqtt/StringEdit";
import { ToIconBulb } from "../mqtt/IconFormat";
import InputCard from "../units/InputCard";
import SwitchCard from "../units/SwitchCard";
import ButtonCard from "../units/ButtonCard";
import ViewCard from "../units/ViewCard";

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
    // const url = "ws://192.168.1.12:9001";
    // const username = "DVES_USER";
    // const password = "DVES_PASS";

    connect(url, {
      username,
      password,
      connectTimeout: 5000,
      clientId:
        "myhelloiot_" + Math.random().toString(16).substr(2).padEnd(13, "0"),
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
            format={ToHEX()}
          />
        </Col>
        <Col span={4}>
          <InputCard
            title="cosita2"
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={ToBase64()}
          />
        </Col>
        <Col span={4}>
          <InputCard
            title="Subscribe only"
            topicpub=""
            topicsub="myhelloiot/cosita"
          />
        </Col>
        <Col span={4}>
          <InputCard
            title="Publish only"
            topicpub="myhelloiot/cosita"
            topicsub=""
          />
        </Col>
        <Col span={4}>
          <InputCard
            title={"\u00A0"}
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </Col>
        <Col span={4}>
          <ViewCard
            title={"El viewer de number receive"}
            topicsub="myhelloiot/cosita"
          />
        </Col>
        <Col span={4}>
          <SwitchCard
            title={"El switch de cosita"}
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </Col>
        <Col span={4}>
          <ButtonCard
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
          />
        </Col>
        <Col span={4}>
          <ButtonCard
            topicpub="myhelloiot/cosita"
            topicsub="myhelloiot/cosita"
            format={ToComposedIconEdit(ToSwitch(), ToIconBulb())}
          />
        </Col>
        <Col span={4}>
          <InputCard
            title={"El switch de number send"}
            topicpub="myhelloiot/number"
            topicsub=""
            format={ToIntlNumber({ style: "unit", unit: "celsius" })}
          />
        </Col>
        <Col span={4}>
          <ViewCard
            title={"El viewer de number receive"}
            topicsub="myhelloiot/number"
            format={ToIconFormat(
              ToIntlNumber({
                style: "unit",
                unit: "celsius",
              })
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
