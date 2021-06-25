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

import { Row, Col, Typography } from "antd";
import React from "react";
import { MQTTConnectionOptions } from "../mqtt/MQTTProvider";

const { Text } = Typography;

type ConnectionInfoProps = {
  options: MQTTConnectionOptions;
};

const ConnectionInfo: React.FC<ConnectionInfoProps> = ({ options }) => {
  const {
    protocol,
    hostname,
    port,
    path,
    protocolId,
    protocolVersion,
    clientId,
  } = options;

  return (
    <div style={{ width: 300 }}>
      <Row wrap={false}>
        <Col flex="120px">
          <Text type="secondary">Protocol:</Text>
        </Col>
        <Col flex="auto">
          <Text>{protocol}</Text>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="120px">
          <Text type="secondary">Host name:</Text>
        </Col>
        <Col flex="auto">
          <Text>{hostname}</Text>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="120px">
          <Text type="secondary">Port:</Text>
        </Col>
        <Col flex="auto">
          <Text>{port}</Text>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="120px">
          <Text type="secondary">Path:</Text>
        </Col>
        <Col flex="auto">
          <Text>{path}</Text>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="120px">
          <Text type="secondary">Protocol:</Text>
        </Col>
        <Col flex="auto">
          <Text>
            {protocolId} {protocolVersion}
          </Text>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="120px">
          <Text type="secondary">Client Id:</Text>
        </Col>
        <Col flex="auto">
          <Text>{clientId}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default ConnectionInfo;
