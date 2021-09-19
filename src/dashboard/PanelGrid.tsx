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
import { Card, Row, Col } from "antd";

import "./PanelGrid.css";

export type CProps = {
  className?: string;
  children: React.ReactNode;
};

export const C: React.FC<CProps> = ({ className, children }) => (
  <Col className={className} xs={24} sm={12} md={12} lg={6}>
    {children}
  </Col>
);

export type LProps = {
  className?: string;
  children: React.ReactNode;
};

export const L: React.FC<LProps> = ({ className, children }) => (
  <Col className={className} xs={24} sm={24} md={24} lg={24}>
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
    <Card className={`myhCCard ${className || ""}`} size="small" title={title}>
      {children}
    </Card>
  </C>
);

export type LSectionProps = {
  className?: string;
  children: React.ReactNode;
};

export const LSection: React.FC<LSectionProps> = ({ className, children }) => (
  <L>
    <div className={`myhLSection ${className || ""}`}>{children}</div>
  </L>
);

export type PanelGridProps = {
  className?: string;
  children: React.ReactNode;
};

export const PanelGrid: React.FC<PanelGridProps> = ({
  className = "",
  children,
}) => (
  <div className={`myhLayoutContent-panel ${className}`}>
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

export const PanelContent: React.FC<PanelGridProps> = ({
  className = "",
  children,
}) => <div className={`myhLayoutContent-panel ${className}`}>{children}</div>;
