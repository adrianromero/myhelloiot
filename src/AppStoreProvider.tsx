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

import React from "react";
import {
  createStore,
  Store,
  Reducer,
  Action,
  AnyAction,
  Dispatch,
} from "redux";
import { Provider } from "react-redux";
import { notification } from "antd";
import { ConnectInfo } from "./connection/ConnectionInfo";
import { cyrb53str } from "./CryptFunctions";

const STORERUNTIME = "myh-rt-" + cyrb53str(window.location.href);

export type AppStoreValue = {
  connectInfo?: ConnectInfo;
  connectInfoType?: "STORED" | "REMOTE";
  connected: string;
  username: string;
  password: string;
  clientId: string;
  properties: {
    hash: string | undefined;
    attrs: { [key: string]: string };
  };
};

const emptyAppStoreValue: AppStoreValue = {
  connected: "",
  username: "Anonymous",
  password: "",
  clientId: "myh_" + Math.random().toString(16).substring(2).padEnd(13, "0"),
  properties: { hash: "", attrs: {} },
};

export interface ActionDisconnect extends Action<"disconnect"> { }
export type DispatchDisconnect = Dispatch<ActionDisconnect>;

export interface ActionConnect extends Action<"connect"> {
  username: string;
  password: string;
  clientId: string;
}
export type DispatchConnect = Dispatch<ActionConnect>;

export interface ActionLoadConnectInfo extends Action<"loadconnectinfo"> {
  connectInfo: ConnectInfo;
  connectInfoType: "STORED" | "REMOTE";
}
export type DispatchLoadConnectInfo = Dispatch<ActionLoadConnectInfo>;

export interface ActionProperties extends Action<"properties"> {
  attrs: {
    [key: string]: string;
  };
}

const loadRUNTIME = (): AppStoreValue => {
  try {
    const lsvalue = localStorage.getItem(STORERUNTIME);
    if (lsvalue) {
      const runtime = JSON.parse(lsvalue);
      return {
        ...emptyAppStoreValue,
        connected: runtime[0],
        properties: runtime[1],
        username: runtime[2],
        password: runtime[3],
        clientId: runtime[4],
      };
    }
    return emptyAppStoreValue;
  } catch (error) {
    return emptyAppStoreValue;
  }
};

const saveRUNTIME = (state: AppStoreValue) => {
  try {
    localStorage.setItem(
      STORERUNTIME,
      JSON.stringify([
        state.connected,
        state.properties,
        state.username,
        state.password,
        state.clientId,
      ])
    );
  } catch (error) {
    notification.warning({
      message: "Store state",
      description: "Application state cannot stored locally. Please review the application permissions."
    });
  }
};

const reducer: Reducer<AppStoreValue, AnyAction> = (
  prevState: AppStoreValue | undefined,
  action: AnyAction
): AppStoreValue => {
  if (action.type === "properties") {
    const { attrs } = action as ActionProperties;
    return {
      ...emptyAppStoreValue,
      ...prevState,
      properties: {
        hash: prevState?.properties.hash,
        attrs: { ...prevState?.properties.attrs, ...attrs },
      },
    };
  }

  if (action.type === "disconnect") {
    return {
      ...emptyAppStoreValue,
      ...prevState,
      connected: "",
    };
  }

  if (action.type === "connect") {
    const { username, password, clientId } = action as ActionConnect;
    const prevHash = prevState?.properties.hash;
    const hash = cyrb53str(prevState?.connectInfo?.dashboard.data ?? "");
    const properties = {
      hash,
      attrs: hash === prevHash ? prevState?.properties.attrs ?? {} : {},
    };
    return {
      ...emptyAppStoreValue,
      ...prevState,
      connected: "connected",
      username,
      password,
      clientId,
      properties,
    };
  }

  if (action.type === "loadconnectinfo") {
    const { connectInfo, connectInfoType } = action as ActionLoadConnectInfo;
    return {
      ...emptyAppStoreValue,
      ...prevState,
      connectInfo,
      connectInfoType,
    };
  }

  return {
    ...emptyAppStoreValue,
    ...prevState,
  };
};

const store: Store<AppStoreValue, AnyAction> = createStore(
  reducer,
  loadRUNTIME()
);
store.subscribe(() => saveRUNTIME(store.getState()));

const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;
export default AppStoreProvider;
