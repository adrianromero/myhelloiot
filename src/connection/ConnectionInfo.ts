/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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

import { FileInfo } from "./UploadRaw";
import basicsampledata from "./sampledata/basicsampledata";
import { cyrb53str } from "../CryptFunctions";
import type { QoS, IConnectPacket } from "mqtt-packet";

export type ConnectInfo = {
  clientId: string;
  url: string;
  keepalive: number;
  protocolVersion: IConnectPacket["protocolVersion"];
  clean: boolean;
  connectTimeout: number;
  reconnectPeriod: number;
  will: boolean;
  willtopic: string;
  willqos: QoS;
  willretain: boolean;
  willpayload: string;
  dashboard: FileInfo;
  dashboardcss: FileInfo;
};

export const defaultConnectInfo: ConnectInfo = {
  clientId: "",
  url: "wss://mymqttbroker",
  keepalive: 60,
  protocolVersion: 4,
  clean: true,
  connectTimeout: 30000,
  reconnectPeriod: 1000,
  will: false,
  willtopic: "",
  willqos: 0,
  willretain: false,
  willpayload: "",
  dashboard: {
    name: "basic.jsx",
    type: "text/jsx",
    data: basicsampledata,
  },
  dashboardcss: {
    name: "dashboard.css",
    type: "text/css",
    data: "",
  },
};

const STORECONNECTINFO = "myh-info-" + cyrb53str(window.location.href);

export const loadResourceConnectInfo = async (
  res: string
): Promise<ConnectInfo> => {
  const infofetch = fetch(
    new URL(`../assets/resources/${res}/connectinfo.json`, import.meta.url)
  );
  const jsxfetch = fetch(
    new URL(`../assets/resources/${res}/dashboardjsx.txt`, import.meta.url)
  );
  const cssfetch = fetch(
    new URL(`../assets/resources/${res}/dashboardcss.txt`, import.meta.url)
  );
  const [infobody, jsxbody, cssbody] = await Promise.all([
    infofetch,
    jsxfetch,
    cssfetch,
  ]);
  const [infodata, jsxdata, cssdata] = await Promise.all([
    infobody.json(),
    jsxbody.text(),
    cssbody.text(),
  ]);
  infodata.dashboard.data = jsxdata;
  infodata.dashboardcss.data = cssdata;
  return infodata;
};

export const loadStoreConnectInfo = (): ConnectInfo => {
  try {
    return JSON.parse(localStorage.getItem(STORECONNECTINFO) ?? "");
  } catch {
    return defaultConnectInfo;
  }
};

export const saveStoreConnectInfo = (connectInfo: ConnectInfo): void => {
  localStorage.setItem(STORECONNECTINFO, JSON.stringify(connectInfo));
};

export type ConnectCredentials = {
  username: string;
  password: string;
};

export const defaultConnectCredentials: ConnectCredentials = {
  username: "",
  password: "",
};

const STORECONNECTCREDENTIALS =
  "myh-credentials-" + cyrb53str(window.location.href);

export const loadStoreConnectCredentials = (): ConnectCredentials => {
  try {
    return JSON.parse(localStorage.getItem(STORECONNECTCREDENTIALS) ?? "");
  } catch {
    return defaultConnectCredentials;
  }
};

export const saveStoreConnectCredentials = (
  connectCredentials: ConnectCredentials
): void => {
  localStorage.setItem(
    STORECONNECTCREDENTIALS,
    JSON.stringify(connectCredentials)
  );
};

export enum ConnectedStatus {
  CONNECTED,
  DISCONNECTED,
}
const connectedstatuskeys = Object.keys(ConnectedStatus);

const STORECONNECTED = "myh-connected-" + cyrb53str(window.location.href);

export const loadStoreConnected = (): ConnectedStatus => {
  try {
    const connectedstatus = localStorage.getItem(
      STORECONNECTED
    ) as keyof typeof ConnectedStatus;
    if (connectedstatuskeys.includes(connectedstatus)) {
      return ConnectedStatus[connectedstatus] as unknown as ConnectedStatus;
    }
    return ConnectedStatus.DISCONNECTED;
  } catch {
    return ConnectedStatus.DISCONNECTED;
  }
};

export const saveStoreConnectConnected = (connected: ConnectedStatus): void => {
  localStorage.setItem(STORECONNECTED, ConnectedStatus[connected]);
};
