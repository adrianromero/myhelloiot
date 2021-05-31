import React from "react"; // FC functional control.
import { Card, Row, Col } from "antd";

import "antd/dist/antd.css";
import "../assets/main.css";

export type CProps = {
  className?: string;
  children: React.ReactNode;
};

export const C: React.FC<CProps> = ({ className, children }) => (
  <Col className={className} xs={24} sm={12} md={12} lg={6}>
    {children}
  </Col>
);

export type CCardProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export const CCard: React.FC<CCardProps> = ({ title, className, children }) => (
  <C>
    <Card className={`myh-card ${className || ""}`} size="small" title={title}>
      {children}
    </Card>
  </C>
);

export type PanelGridProps = {
  className?: string;
  children: React.ReactNode;
};

const PanelGrid: React.FC<PanelGridProps> = ({ className, children }) => (
  <div className={`myhAppContent-panel ${className || ""}`}>
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
