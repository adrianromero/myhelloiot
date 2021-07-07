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