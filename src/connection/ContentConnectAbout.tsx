/*
MYHELLOIOT
Copyright (C) 2021-2022 Adrián Romero
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
import SVGIcon from "../format/SVGIcon";
import {
  faCodeBranch,
  faPencil,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Typography, Tag, Button, Image, message } from "antd";
import { FormInstance } from "antd/lib/form";
import myhelloiot from "../assets/myhelloiot.png";
import basicsampledata from "./basicsampledata";
import loggingsampledata from "./loggingsampledata";
import pubsubsampledata from "./pubsubsampledata";
import inputtextsampledata from "./inputtextsampledata";
import lightssampledata from "./lightssampledata";
import gaugessampledata from "./gaugessampledata";
import mosquittosampledata from "./mosquittosampledata";
import { ReactComponent as GitHubRibbon } from "../assets/svg/github.svg";
import { ConnectInfoForm } from "./ConnectInfoForm";
import { VERSION } from "../version";

const { Title, Paragraph, Link } = Typography;

const ContentConnectAbout: React.FC<{
  form: FormInstance<ConnectInfoForm>;
}> = ({ form }) => {
  return (
    <>
      <Link
        href="https://github.com/adrianromero/myhelloiot"
        target="_blank"
        style={{
          position: "absolute",
          right: 0,
          top: 144,
        }}
      >
        <GitHubRibbon
          style={{
            transformOrigin: "top right",
            transform: "scale(0.6)",
          }}
        />
      </Link>

      <Typography>
        <Title level={2}>
          MYHELLOIOT{" "}
          <Tag icon={<SVGIcon icon={faCodeBranch} />} color="geekblue">
            {VERSION}
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
          select the EMQX test broker
          <Button
            type="link"
            size="small"
            icon={<SVGIcon icon={faPencil} />}
            onClick={() => {
              message.info("url: wss://broker.emqx.io:8084/mqtt");
              form.setFieldsValue({
                url: "wss://broker.emqx.io:8084/mqtt",
                username: "",
                password: "",
              });
            }}
          >
            Sets EMQX.IO test broker url
          </Button>
          or the Mosquitto test broker
          <Button
            type="link"
            size="small"
            icon={<SVGIcon icon={faPencil} />}
            onClick={() => {
              message.info("url: wss://test.mosquitto.org:8081");
              form.setFieldsValue({
                url: "wss://test.mosquitto.org:8081",
                username: "",
                password: "",
              });
            }}
          >
            Sets Mosquito test broker url
          </Button>
          .
        </Paragraph>
        <Title level={4}>Create a dashboard</Title>
        <Paragraph>
          Dashboards are defined using JSX syntax. The same syntax React uses.
          You can start playing with the following examples that will help you
          to understand how it works and how to create your own dashboards
          starting from the most simple example to subscribe and publish
          messages to a MQTT topic, and ending with a complex dashboard that
          includes different formats, icons, buttons, sliders, gauges...
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              Basic units examples
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: basic.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "basic.jsx",
                      type: "text/jsx",
                      data: basicsampledata,
                    },
                  });
                }}
              >
                Sets basic.jsx dashboard
              </Button>
              .
            </li>
            <li>
              Input text example
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: inputtext.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "inputtext.jsx",
                      type: "text/jsx",
                      data: inputtextsampledata,
                    },
                  });
                }}
              >
                Sets inputtext.jsx dashboard
              </Button>
              .
            </li>
            <li>
              Light switches example
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: lights.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "lights.jsx",
                      type: "text/jsx",
                      data: lightssampledata,
                    },
                  });
                }}
              >
                Sets lights.jsx dashboard
              </Button>
              .
            </li>
            <li>
              Gauges example
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: gauges.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "gauges.jsx",
                      type: "text/jsx",
                      data: gaugessampledata,
                    },
                  });
                }}
              >
                Sets gauges.jsx dashboard
              </Button>
              .
            </li>
            <li>
              Logging example
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: logging.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "logging.jsx",
                      type: "text/jsx",
                      data: loggingsampledata,
                    },
                  });
                }}
              >
                Sets logging.jsx dashboard
              </Button>
              .
            </li>
            <li>
              Publish / subscribe example
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: pubsub.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "pubsub.jsx",
                      type: "text/jsx",
                      data: pubsubsampledata,
                    },
                  });
                }}
              >
                Sets pubsub.jsx dashboard
              </Button>
              .
            </li>
            <li>
              Mosquitto SYS topics example
              <Button
                type="link"
                size="small"
                icon={<SVGIcon icon={faPencil} />}
                onClick={() => {
                  message.info("dashboard: mosquitto.jsx");
                  form.setFieldsValue({
                    dashboard: {
                      name: "mosquitto.jsx",
                      type: "text/jsx",
                      data: mosquittosampledata,
                    },
                  });
                }}
              >
                Sets mosquitto.jsx dashboard
              </Button>
              .
            </li>
          </ul>
        </Paragraph>
        <Title level={4}>Connect</Title>
        <Paragraph>
          And now you are ready to press the{" "}
          <Button
            size="small"
            icon={<SVGIcon icon={faPowerOff} />}
            type="primary"
            htmlType="submit"
          >
            Connect
          </Button>{" "}
          button and play with your MQTT dashboard.
        </Paragraph>
        <Title level={2}>License</Title>
        <Paragraph>
          MYHELLOIOT is licensed under the GNU General Public License, Version
          3, 29 June 2007.
        </Paragraph>
        <Paragraph>Copyright (C) 2021-2022 Adrián Romero.</Paragraph>
      </Typography>
    </>
  );
};

export default ContentConnectAbout;
