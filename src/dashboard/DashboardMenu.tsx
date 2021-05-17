import React from "react";

import {
  AlertFilled,
  ApiFilled,
  AudioFilled,
  BankFilled,
  BellFilled,
  BookFilled,
  BugFilled,
  BuildFilled,
  BulbFilled,
  CameraFilled,
  CarFilled,
  DashboardFilled,
  PictureFilled,
} from "@ant-design/icons";

export type DashboardMenuProps = {
  icon: string;
  name: string;
  children: React.ReactNode;
};

const icons: Map<string, React.ReactElement> = new Map([
  ["AlertFilled", <AlertFilled />],
  ["ApiFilled", <ApiFilled />],
  ["AudioFilled", <AudioFilled />],
  ["BankFilled", <BankFilled />],
  ["BellFilled", <BellFilled />],
  ["BookFilled", <BookFilled />],
  ["BugFilled", <BugFilled />],
  ["BuildFilled", <BuildFilled />],
  ["BulbFilled", <BulbFilled />],
  ["CameraFilled", <CameraFilled />],
  ["CarFilled", <CarFilled />],
  ["DashboardFilled", <DashboardFilled />],
]);

export function getIcon(name: string): React.ReactElement {
  return icons.get(name) || <PictureFilled />;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({
  icon = "PictureFilled",
  name,
  children,
}) => <>{children}</>;

export default DashboardMenu;
