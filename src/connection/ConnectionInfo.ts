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

import { FileInfo } from "./UploadRaw";
import basicsampledata from "./basicsampledata";

export type ConnectInfo = {
  url: string;
  keepalive: number;
  connectTimeout: number;
  reconnectPeriod: number;
  onlinetopic: string;
  onlineqos: number;
  dashboard: FileInfo;
  dashboardcss: FileInfo;
};

export const defaultConnectInfo = {
  url: "wss://mymqttbroker",
  keepalive: 60,
  connectTimeout: 30000,
  reconnectPeriod: 1000,
  onlinetopic: "",
  onlineqos: 0,
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

const STORECONNECTINFO = "myhelloiot-connectinfo-" + window.location.href;

export const loadConnectInfo = (): ConnectInfo => {
  try {
    const lsvalue = localStorage.getItem(STORECONNECTINFO);
    if (lsvalue) {
      return JSON.parse(lsvalue);
    }
    return defaultConnectInfo;
  } catch (e) {
    return defaultConnectInfo;
  }
};

export const saveConnectInfo = (connectInfo: ConnectInfo): void => {
  try {
    localStorage.setItem(STORECONNECTINFO, JSON.stringify(connectInfo));
  } catch (e) {}
};
