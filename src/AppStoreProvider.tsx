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
import { createStore, Store, Reducer, Action, Dispatch } from "redux";
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

export interface AppStoreAction extends Action<"set"> {
  newState: {
    connected?: string;
    connectInfo?: ConnectInfo;
    properties?: {
      [key: string]: string;
    };
  };
}
export type AppStoreDispatch = Dispatch<AppStoreAction>;

const emptyAppStoreValue: AppStoreValue = {
  connected: "",
  connectInfo: defaultConnectInfo,
  properties: {},
};

export const useDispatchDisconnect = () => {
  const dispatch = useDispatch<AppStoreDispatch>();
  return () => {
    dispatch({ type: "set", newState: { connected: "" } });
  };
};

export const useDispatchConnect = () => {
  const dispatch = useDispatch<AppStoreDispatch>();
  return (connectInfo: ConnectInfo) => {
    dispatch({
      type: "set",
      newState: { connected: "connected", connectInfo },
    });
  };
};

export const useDispatchProperties = () => {
  const dispatch = useDispatch<AppStoreDispatch>();
  return (properties: { [key: string]: string }) => {
    dispatch({
      type: "set",
      newState: { properties },
    });
  };
};

export const useAppStoreProperty = (
  name: string
): [string, (value: string) => void] => {
  const property: string = useSelector<AppStoreValue, string>(
    (s) => s.properties[name]
  );
  const dispatchProperties = useDispatchProperties();
  const setProperty = (value: string) => dispatchProperties({ [name]: value });

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
const reducer: Reducer<AppStoreValue, AppStoreAction> = (
  prevState: AppStoreValue | undefined,
  action: AppStoreAction
): AppStoreValue => {
  const properties = {
    ...prevState?.properties,
    ...action.newState?.properties,
  };
  return {
    ...emptyAppStoreValue,
    ...prevState,
    ...action.newState,
    properties,
  };
};

const store: Store<AppStoreValue, AppStoreAction> = createStore(
  reducer,
  loadLS()
);
store.subscribe(() => saveLS(store.getState()));

const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;
export default AppStoreProvider;
