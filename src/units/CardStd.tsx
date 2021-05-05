import React from "react";
import { Card, Row, Col } from "antd";

import "antd/dist/antd.css";
import "../assets/main.css";

type UnitCardProps = {
  title?: string;
  children: React.ReactNode;
};

const CardStd: React.FC<UnitCardProps> = ({ title, children }) => (
  <Card className="myh-card" size="small" title={title}>
    <Row gutter={8} wrap={false}>
      <Col flex="auto">{children}</Col>
    </Row>
  </Card>
);

export default CardStd;
