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

import React from "react";
import {
  createStore,
  Store,
  Reducer,
  Action,
  AnyAction,
  Dispatch,
} from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ConnectInfo } from "./connection/ConnectionInfo";

const STORERUNTIME = "myhelloiot-runtime";

export type AppStoreValue = {
  connectInfo?: ConnectInfo;
  connected: string;
  properties: {
    [key: string]: string;
  };
};

const emptyAppStoreValue: AppStoreValue = {
  connected: "",
  properties: {},
};

export interface ActionDisconnect extends Action<"disconnect"> {}
export type DispatchDisconnect = Dispatch<ActionDisconnect>;

export interface ActionConnect extends Action<"connect"> {
  connectInfo: ConnectInfo;
}
export type DispatchConnect = Dispatch<ActionConnect>;

export interface ActionLoadConnectInfo extends Action<"loadconnectinfo"> {
  connectInfo: ConnectInfo;
}
export type DispatchLoadConnectInfo = Dispatch<ActionLoadConnectInfo>;

interface ActionProperties extends Action<"properties"> {
  properties: {
    [key: string]: string;
  };
}
type DispatchProperties = Dispatch<ActionProperties>;
export const useAppStoreProperty = (
  name: string
): [string | undefined, (value: string) => void] => {
  const property: string | undefined = useSelector<AppStoreValue, string>(
    (s) => s.properties[name]
  );
  const dispatch = useDispatch<DispatchProperties>();
  const setProperty = (value: string) =>
    dispatch({ type: "properties", properties: { [name]: value } });
  return [property, setProperty];
};

const loadRUNTIME = (): AppStoreValue => {
  try {
    const lsvalue = localStorage.getItem(STORERUNTIME);
    if (lsvalue) {
      const runtime = JSON.parse(lsvalue);
      return {
        ...emptyAppStoreValue,
        connected: runtime[0],
        properties: runtime[1],
      };
    }
    return emptyAppStoreValue;
  } catch (e) {
    return emptyAppStoreValue;
  }
};

const saveRUNTIME = (state: AppStoreValue) => {
  try {
    localStorage.setItem(
      STORERUNTIME,
      JSON.stringify([state.connected, state.properties])
    );
  } catch (e) {}
};

const reducer: Reducer<AppStoreValue, AnyAction> = (
  prevState: AppStoreValue | undefined,
  action: AnyAction
): AppStoreValue => {
  if (action.type === "properties") {
    const { properties } = action as ActionProperties;
    return {
      ...emptyAppStoreValue,
      ...prevState,
      properties: { ...prevState?.properties, ...properties },
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
    const { connectInfo } = action as ActionConnect;
    const prevHash = prevState?.connectInfo?.dashboard.hash;
    const newHash = connectInfo.dashboard.hash;
    const properties = newHash === prevHash ? prevState?.properties ?? {} : {};
    return {
      ...emptyAppStoreValue,
      ...prevState,
      connected: "connected",
      connectInfo,
      properties,
    };
  }

  if (action.type === "loadconnectinfo") {
    const { connectInfo } = action as ActionLoadConnectInfo;
    return {
      ...emptyAppStoreValue,
      ...prevState,
      connectInfo,
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
