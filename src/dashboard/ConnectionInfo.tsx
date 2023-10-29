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

import React from "react";
import { useDispatch } from "react-redux";
import SVGIcon from "../format/SVGIcon";
import { faPowerOff, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Typography, Button, Divider, Popover } from "antd";
import { useMQTTContext } from "../mqtt/MQTTProvider";
import { DispatchDisconnect } from "../AppStoreProvider";

import "./ConnectionInfo.css";

const { Text } = Typography;

type ConnectionInfoProps = {
  disconnectDisabled?: boolean;
};

const ConnectionInfo: React.FC<ConnectionInfoProps> = ({
  disconnectDisabled = false,
}) => {
  const [{ options, status }] = useMQTTContext();
  const dispatch = useDispatch<DispatchDisconnect>();

  const {
    protocol,
    hostname,
    port,
    path,
    protocolId,
    protocolVersion,
    username,
    clientId,
  } = options;

  const { label, icon } = (status === "Connected")
    ? {
      label: options.hostname ?? "",
      icon: <SVGIcon icon={faCircleCheck} style={{ color: "#52c41a" }} />
    }
    : {
      label: status,
      icon: <SVGIcon
        icon={faSpinner}
        style={{
          color: "#ffffff",
          animation: "loadingCircle 1s infinite linear",
        }}
      />
    };

  let protocolVersionLabel;
  if (protocolVersion === 3) {
    protocolVersionLabel = "3.1";
  } else if (protocolVersion === 4) {
    protocolVersionLabel = "3.1.1";
  } else if (protocolVersion === 5) {
    protocolVersionLabel = "5.0";
  } else {
    protocolVersionLabel = "Unknonw";
  }

  const popover = (
    <>
      <div style={{ width: 280 }}>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>User name:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {username}
            </Text>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>Protocol:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {protocol}
            </Text>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>Host name:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {hostname}
            </Text>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>Port:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {port}
            </Text>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>Path:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {path}
            </Text>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>MQTT protocol:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {protocolId} {protocolVersionLabel}
            </Text>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="120px">
            <Text>Client Id:</Text>
          </Col>
          <Col flex="auto">
            <Text type="secondary" strong>
              {clientId}
            </Text>
          </Col>
        </Row>
      </div>
      {!disconnectDisabled && (
        <>
          <Divider />
          <Button
            type="primary"
            icon={<SVGIcon icon={faPowerOff} />}
            onClick={() => dispatch({ type: "disconnect" })}
          >
            Disconnect
          </Button>
        </>
      )}
    </>
  );

  return (
    <Popover placement="bottomRight" content={popover} trigger="click">
      <Button type="text"><span style={{ color: "darkgray" }}>{label}</span><span className="connectioninfo-buttonicon">{icon}</span></Button>
    </Popover>
  );
};

export default ConnectionInfo;