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
import {
  ConnectCredentials,
  ConnectedStatus,
  ConnectInfo,
} from "../connection/ConnectionInfo";
//import { cyrb53str } from "../CryptFunctions";

export type ApplicationConnected = ConnectedStatus;

export type StatusInitial = { name: "INITIAL" };
export type StatusLoading = { name: "LOADING" };
export type StatusReady = {
  name: "READY";
  connectInfo: ConnectInfo;
  connectCredentials: ConnectCredentials;
  connected: ApplicationConnected;
  attrshash?: string;
  attrs: { [key: string]: string };
};
export type StatusError = { name: "ERROR"; message: string; error: unknown };

export type ApplicationStatus =
  | StatusInitial
  | StatusLoading
  | StatusReady
  | StatusError;

export interface ConnectionState {
  status: ApplicationStatus;
}

export type StatusReadyAction = {
  connectInfo: ConnectInfo;
  connectCredentials: ConnectCredentials;
  connected: ApplicationConnected;
};

export type StatusErrorAction = {
  message: string;
  error: unknown;
};

export type PropertiesAction = {
  attrs: {
    [key: string]: string;
  };
};

export type LoadConnectionInfoAction = {
  connectInfo: ConnectInfo;
};

export type LoadConnectionCredentialsAction = {
  connectCredentials: ConnectCredentials;
};

const INITIALCONNECTIONSTATE: ConnectionState = {
  status: { name: "INITIAL" },
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState: INITIALCONNECTIONSTATE,
  reducers: {
    statusLoading: (state) => {
      state.status = { name: "LOADING" };
    },
    statusReady: (state, action: PayloadAction<StatusReadyAction>) => {
      state.status = {
        name: "READY",
        connected: action.payload.connected,
        connectCredentials: action.payload.connectCredentials,
        connectInfo: action.payload.connectInfo,
        attrs: {},
      };
    },
    statusError: (state, action: PayloadAction<StatusErrorAction>) => {
      const { message, error } = action.payload;
      state.status = {
        name: "ERROR",
        message,
        error,
      };
    },
    connect: (state) => {
      if (state.status.name === "READY") {
        state.status.connected = ConnectedStatus.CONNECTED;
      } else {
        state.status = {
          name: "ERROR",
          message: "Reducer connect cannot be executed if status is not READY.",
          error: null,
        };
      }
      //TODO: Load ands save attributes.
      // const prevHash = state.attrshash;
      // const hash = cyrb53str(state?.connectInfo?.dashboard.data ?? "");
      // if (hash !== prevHash) {
      //   state.attrshash = hash;
      //   state.attrs = {};
      // }
    },
    disconnect: (state) => {
      if (state.status.name === "READY") {
        state.status.connected = ConnectedStatus.DISCONNECTED;
      } else {
        state.status = {
          name: "ERROR",
          message:
            "Reducer disconnect cannot be executed if status is not READY.",
          error: null,
        };
      }
    },
    putProperties: (state, action: PayloadAction<PropertiesAction>) => {
      if (state.status.name === "READY") {
        const { attrs } = action.payload;
        state.status.attrs = {
          ...state.status.attrs,
          ...attrs,
        };
      } else {
        state.status = {
          name: "ERROR",
          message:
            "Reducer putProperties cannot be executed if status is not READY.",
          error: null,
        };
      }
    },
    loadConnectionInfo: (
      state,
      action: PayloadAction<LoadConnectionInfoAction>
    ) => {
      if (state.status.name === "READY") {
        const { connectInfo } = action.payload;
        state.status.connectInfo = connectInfo;
      } else {
        state.status = {
          name: "ERROR",
          message:
            "Reducer loadConnectionInfo cannot be executed if status is not READY.",
          error: null,
        };
      }
    },
    loadConnectionCredentials: (
      state,
      action: PayloadAction<LoadConnectionCredentialsAction>
    ) => {
      if (state.status.name === "READY") {
        const { connectCredentials } = action.payload;
        state.status.connectCredentials = connectCredentials;
      } else {
        state.status = {
          name: "ERROR",
          message:
            "Reducer loadConnectionCredentials cannot be executed if status is not READY.",
          error: null,
        };
      }
    },
  },
});

export const {
  statusLoading,
  statusReady,
  statusError,
  connect,
  disconnect,
  putProperties,
  loadConnectionInfo,
  loadConnectionCredentials,
} = connectionSlice.actions;

export const selectStatus = (state: RootState) => state.connection.status;

export const selectProperty = (name: string) => (state: RootState) => {
  if (state.connection.status.name === "READY") {
    return state.connection.status.attrs[name];
  }
  return;
};

export default connectionSlice.reducer;
