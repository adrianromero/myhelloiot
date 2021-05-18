import React from "react"; // FC functional control.
import { Card, Row, Col } from "antd";

import "antd/dist/antd.css";
import "../assets/main.css";

export const C: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Col xs={24} sm={12} md={12} lg={6}>
    {children}
  </Col>
);

export type CCardProps = {
  title?: string;
  children: React.ReactNode;
};

export const CCard: React.FC<CCardProps> = ({ title, children }) => (
  <C>
    <Card className="myh-card" size="small" title={title}>
      {children}
    </Card>
  </C>
);

const PanelGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="myhAppContent-panel">
    <Row
      gutter={[
        { xs: 8, sm: 8, md: 8, lg: 8 },
        { xs: 8, sm: 8, md: 8, lg: 8 },
      ]}
    >
      {children}
    </Row>
  </div>
);

export default PanelGrid;
