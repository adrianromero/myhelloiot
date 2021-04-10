import React, { MouseEvent } from "react"; // FC functional control.
import { Story, Meta } from "@storybook/react";

import "antd/dist/antd.css";

import { Button, message } from "antd";

import MQTTProvider, {
  useMQTTContext,
  useMQTTSubscribe,
} from "../mqtt/MQTTProvider";

import { ToHEX, ToBase64 } from "../mqtt/StringFormat";
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
    // const url = "ws://broker.mqttdashboard.com:8000/mqtt";
    const url = "ws://192.168.1.12:9001";
    const username = "DVES_USER";
    const password = "DVES_PASS";

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
        <Button type="default" onClick={handleDisconnect}>
          Disconnect
        </Button>
        <Button type="default" onClick={handlePublish}>
          Publish Message
        </Button>
      </div>
      <div>{`Status: ${status}, Connected: ${connected}`}</div>
      <InputCard
        title="cosita"
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
      />
      <InputCard
        title="cosita2"
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToHEX}
      />
      <InputCard
        title="cosita2"
        topicpub="myhelloiot/cosita"
        topicsub="myhelloiot/cosita"
        format={ToBase64}
      />
    </div>
  );
};
