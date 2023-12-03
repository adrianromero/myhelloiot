/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ConnectInfo } from "../connection/ConnectionInfo";
import { cyrb53str } from "../CryptFunctions";

export interface ConnectionState {
  connectInfo?: ConnectInfo;
  connected: string;
  attrshash?: string;
  attrs: { [key: string]: string };
}

export type PropertiesAction = {
  attrs: {
    [key: string]: string;
  };
};

export type LoadConnectionInfoAction = {
  connectInfo: ConnectInfo;
};

const STORERUNTIME = "myh-runtime-" + cyrb53str(window.location.href);

const emptyConnectionState: ConnectionState = {
  connected: "",
  attrs: {},
};

export const connectionSave = (state: ConnectionState) => {
  try {
    localStorage.setItem(
      STORERUNTIME,
      JSON.stringify([state.connected, state.attrshash, state.attrs])
    );
  } catch (error) {
    // notification.warning({
    //   message: "Store state",
    //   description: "Application state cannot stored locally. Please review the application permissions."
    // });
    console.error(
      "Application cannot stored state locally. Please review the application permissions."
    );
  }
};

const connectionLoad = (): ConnectionState => {
  try {
    const lsvalue = localStorage.getItem(STORERUNTIME);
    if (lsvalue) {
      const runtime = JSON.parse(lsvalue);
      return {
        ...emptyConnectionState,
        connected: runtime[0],
        attrshash: runtime[1],
        attrs: runtime[2],
      };
    }
    return emptyConnectionState;
  } catch (error) {
    return emptyConnectionState;
  }
};
export const connectionSlice = createSlice({
  name: "connection",
  initialState: connectionLoad(),
  reducers: {
    connect: (state, action: PayloadAction<LoadConnectionInfoAction>) => {
      const { connectInfo } = action.payload;
      state.connectInfo = connectInfo;
      state.connected = "connected";
      const prevHash = state.attrshash;
      const hash = cyrb53str(state?.connectInfo?.dashboard.data ?? "");
      if (hash !== prevHash) {
        state.attrshash = hash;
        state.attrs = {};
      }
    },
    disconnect: (state) => {
      state.connected = "";
    },
    putProperties: (state, action: PayloadAction<PropertiesAction>) => {
      const { attrs } = action.payload;
      state.attrs = {
        ...state.attrs,
        ...attrs,
      };
    },
    loadConnectionInfo: (
      state,
      action: PayloadAction<LoadConnectionInfoAction>
    ) => {
      const { connectInfo } = action.payload;
      state.connectInfo = connectInfo;
    },
  },
});

export const { connect, disconnect, putProperties, loadConnectionInfo } =
  connectionSlice.actions;

export const selectConnected = (state: RootState) => state.connection.connected;
export const selectConnectInfo = (state: RootState) =>
  state.connection.connectInfo;
export const selectProperty = (name: string) => (state: RootState) =>
  state.connection.attrs[name];

export default connectionSlice.reducer;
