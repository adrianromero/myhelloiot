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
import { ConnectInfo, defaultConnectInfo } from "./connection/ConnectionInfo";

const STORENAME = "myhelloiot-store";

export type AppStoreValue = {
  connected: string;
  connectInfo: ConnectInfo;
  properties: {
    [key: string]: string;
  };
};

const emptyAppStoreValue: AppStoreValue = {
  connected: "",
  connectInfo: defaultConnectInfo,
  properties: {},
};

export interface ActionDisconnect extends Action<"disconnect"> {}
export type DispatchDisconnect = Dispatch<ActionDisconnect>;

export interface ActionConnect extends Action<"connect"> {
  connectInfo: ConnectInfo;
}
export type DispatchConnect = Dispatch<ActionConnect>;

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

const loadLS = (): AppStoreValue => {
  try {
    const lsvalue = localStorage.getItem(STORENAME);
    if (lsvalue) {
      return { ...emptyAppStoreValue, ...JSON.parse(lsvalue) };
    }
    return emptyAppStoreValue;
  } catch (e) {
    return emptyAppStoreValue;
  }
};
const saveLS = (state: AppStoreValue) => {
  try {
    localStorage.setItem(STORENAME, JSON.stringify(state));
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
    const prevHash = prevState?.connectInfo.dashboard.hash;
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

  return {
    ...emptyAppStoreValue,
    ...prevState,
  };
};

const store: Store<AppStoreValue, AnyAction> = createStore(reducer, loadLS());
store.subscribe(() => saveLS(store.getState()));

const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;
export default AppStoreProvider;
