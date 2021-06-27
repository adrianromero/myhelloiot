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

import React, { useEffect } from "react";
import { Layout } from "antd";
import AppHeader from "../AppHeader";
import ConnectionInfo from "./ConnectionInfo";
import PanelGrid from "./PanelGrid";

export type DashboardTitleProps = {
  title?: string;
  disconnectDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const DashboardTitle: React.FC<DashboardTitleProps> = ({
  title,
  disconnectDisabled,
  className,
  children,
}) => {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <Layout className={className}>
      <AppHeader title={title}>
        <ConnectionInfo disconnectDisabled={disconnectDisabled} />
      </AppHeader>
      <Layout.Content className="myhMainLayout">
        <PanelGrid> {children} </PanelGrid>
      </Layout.Content>
    </Layout>
  );
};

export default DashboardTitle;
