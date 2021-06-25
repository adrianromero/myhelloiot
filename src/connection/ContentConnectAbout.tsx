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

import React from "react";
import { BranchesOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Typography, Tag, Button, Image, message } from "antd";
import { FormInstance } from "antd/lib/form";
import myhelloiot from "../assets/myhelloiot.png";
import sampledata from "./sampledata";
import { ReactComponent as GitHubRibbon } from "../assets/svg/github.svg";
import { ConnectInfo } from "./ConnectionInfo";

const { Title, Paragraph, Link, Text } = Typography;

const ContentConnectAbout: React.FC<{ form: FormInstance<ConnectInfo> }> = ({
  form,
}) => {
  return (
    <Card className="myhConnectionForm-aboutcard">
      <Link
        href="https://github.com/adrianromero/myhelloiot"
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
          <Link href="https://en.wikipedia.org/wiki/MQTT" target="_blank">
            MQTT
          </Link>{" "}
          dashboard application inspired in my other MQTT project{" "}
          <Link href="https://github.com/adrianromero/helloiot" target="_blank">
            HelloIoT
          </Link>
          . You can use MYHELLOIOT as a MQTT client application to publish and
          subscribe to topics or you can use MYHELLOIOT as a client platform to
          create your own dashboard. MYHELLOIOT is a{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Progressive_web_application"
            target="_blank"
          >
            PWA
          </Link>{" "}
          application and it can run on your favorite browser or installed on
          Windows, MacOS, Linux or, and even in mobile devices iOS or Android.
        </Paragraph>
        <Paragraph>
          <Image src={myhelloiot} width={480} />
        </Paragraph>
        <Title level={2}>Getting started</Title>
        <Title level={4}>MQTT connection options</Title>
        <Paragraph>
          You can use any MQTT broker with WebSockets/SSL support. For example
          select the EMQX test broker{" "}
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              message.info("url: wss://broker.emqx.io:8084/mqtt");
              form.setFieldsValue({
                url: "wss://broker.emqx.io:8084/mqtt",
              });
            }}
          >
            Sets EMQX.IO test broker url
          </Button>{" "}
          or the Mosquitto test broker{" "}
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              message.info("url: wss://test.mosquitto.org:8081");
              form.setFieldsValue({
                url: "wss://test.mosquitto.org:8081",
              });
            }}
          >
            Sets Mosquito test broker url
          </Button>
          .
        </Paragraph>
        <Title level={4}>Create a dashboard</Title>
        <Paragraph>
          You can start with this complete sample{" "}
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              message.info("dashboard: sample.jsx");
              form.setFieldsValue({
                dashboard: {
                  name: "sample.jsx",
                  type: "text/jsx",
                  data: sampledata,
                },
              });
            }}
          >
            Sets sample.jsx dashboard
          </Button>
          .
        </Paragraph>
        <Title level={4}>Connect</Title>
        <Paragraph>
          And now you are ready to press the <Text code>Connect</Text> button
          and play with your MQTT dashboard.
        </Paragraph>
        <Title level={2}>License</Title>
        <Paragraph>
          MYHELLOIOT is licensed under the GNU General Public License, Version
          3, 29 June 2007.
        </Paragraph>
        <Paragraph>Copyright (C) 2021 Adrián Romero.</Paragraph>
      </Typography>
    </Card>
  );
};

export default ContentConnectAbout;
