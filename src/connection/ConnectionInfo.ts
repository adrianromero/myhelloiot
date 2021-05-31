import { FileInfo } from "./UploadRaw";

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
