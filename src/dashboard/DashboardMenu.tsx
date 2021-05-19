import React from "react";

import { PictureFilled } from "@ant-design/icons";

export type DashboardMenuProps = {
  icon: React.ReactNode;
  name: string;
  children: React.ReactNode;
};

const DashboardMenu: React.FC<DashboardMenuProps> = ({
  icon = <PictureFilled />,
  name,
  children,
}) => <>{children}</>;

export default DashboardMenu;
