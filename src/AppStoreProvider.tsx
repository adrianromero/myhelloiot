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
import { Provider } from "react-redux";
import { ConnectInfo, defaultConnectInfo } from "./connection/ConnectionInfo";

const STORENAME = "myhelloiot-store";

export type AppStoreValue = {
  connected: string;
  connectInfo: ConnectInfo;
};

export interface AppStoreAction extends Action<"set"> {
  newState: {
    connected?: string;
    connectInfo?: ConnectInfo;
  };
}
export type AppStoreDispatch = Dispatch<AppStoreAction>;

const emptyAppStoreValue: AppStoreValue = {
  connected: "",
  connectInfo: defaultConnectInfo,
};

const loadLS = (): AppStoreValue => {
  try {
    const lsvalue = localStorage.getItem(STORENAME);
    if (lsvalue) {
      return JSON.parse(lsvalue);
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
  return { ...emptyAppStoreValue, ...prevState, ...action.newState };
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
