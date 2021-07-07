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
import minisampledata from "./basicsampledata";

export type ConnectInfo = {
  url: string;
  username: string;
  password: string;
  clientId: string;
  keepalive: number;
  connectTimeout: number;
  reconnectPeriod: number;
  onlinetopic: string;
  onlineqos: number;
  dashboard: FileInfo;
  dashboardcss: FileInfo;
};

const storedClientId = localStorage.getItem("myhelloiot_defaultClientId");
let clientId;
if (storedClientId) {
  clientId = storedClientId;
} else {
  clientId =
    "myhelloiot_" + Math.random().toString(16).substr(2).padEnd(13, "0");
  localStorage.setItem("myhelloiot_defaultClientId", clientId);
}

export const defaultConnectInfo = {
  url: "wss://mymqttbroker",
  username: "",
  password: "",
  clientId,
  keepalive: 60,
  connectTimeout: 30000,
  reconnectPeriod: 1000,
  onlinetopic: "",
  onlineqos: 0,
  dashboard: { name: "mini.jsx", type: "text/jsx", data: minisampledata },
  dashboardcss: { name: "dashboard.css", type: "text/css", data: "" },
};
