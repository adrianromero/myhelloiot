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

import React, { createElement, Fragment } from "react";
import { Card } from "antd";
import {
  faUpload,
  faDownload,
  faCodeBranch,
  faBars,
  faImage,
  faBolt,
  faLightbulb,
  faStar,
  faPaperPlane,
  faTurnDown,
  faCircleXmark,
  faPlay,
  faPause,
  faBan,
  faPencil,
  faCircleExclamation,
  faPowerOff,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { ReactComponent as Themes } from "./assets/svg/themes.svg";
import * as Babel from '@babel/standalone';
import { Buffer } from "buffer";
import { PanelFlex } from "./dashboard/PanelFlex";
import Dashboard from "./dashboard/Dashboard";
import DashboardContent from "./dashboard/DashboardContent";
import InputUnit from "./units/InputUnit";
import LogUnit from "./units/LogUnit";
import LogTool from "./units/LogTool";
import Publisher from "./units/Publisher";
import ButtonMessage from "./units/ButtonMessage";
import ButtonUnit from "./units/ButtonUnit";
import ButtonTopic from "./units/ButtonTopic";
import SwitchUnit from "./units/SwitchUnit";
import ViewUnit from "./units/ViewUnit";
import SliderUnit from "./units/SliderUnit";
import SoundUnit from "./units/SoundUnit";
import NotifyUnit from "./units/NotifyUnit";
import KeypadUnit from "./units/KeypadUnit";
import DisconnectUnit from "./units/DisconnectUnit";
import SoundAlarmUnit from "./units/SoundAlarmUnit";
import ModalUnit from "./units/ModalUnit";
import {
  ToIconFormat,
  ToIconValueFormat,
  onoffnum,
  onoffst,
} from "./format/FormatTypes";
import {
  StringValueFormat,
  JSONValueFormat,
  HEXValueFormat,
  Base64ValueFormat,
  SwitchValueFormat,
  NumberValueFormat,
} from "./format/ValueFormat";
import {
  DimIconFormat,
  SwitchIconFormat,
  BulbIconFormat,
  ThuderboltIconFormat,
  StarIconFormat,
  StringIconFormat,
  NumberIconFormat,
  MapIconFormat,
  MapJSONBuffer,
  MapJSONIconFormat,
} from "./format/IconFormat";
import {
  SwitchIconValueFormat,
  BulbIconValueFormat,
  ThuderboltIconValueFormat,
  StarIconValueFormat,
  StringIconValueFormat,
  NumberIconValueFormat,
} from "./format/IconValueFormat";
import {
  DashboardIconFormat,
  LinearIconFormat,
  SimpleIconFormat,
  CircularIconFormat,
  MetroIconFormat,
  ProgressIconFormat,
  SpaceIconFormat,
  LiquidIconFormat,
  DialIconFormat,
  FuelIconFormat,
  ControlIconFormat,
} from "./format/GaugeFormat";
import { ChartIconFormat } from "./format/ChartFormat";
import { ImageIconFormat } from "./format/ImageFormat";
import AppError from "./AppError";

const JSXCONTEXT = {
  //React JSX
  createElement,
  Fragment,

  //NodeObject
  Buffer,

  // HelloIOT Components
  Dashboard,
  DashboardContent,
  PanelFlex,
  InputUnit,
  Publisher,
  ButtonMessage,
  ButtonUnit,
  ButtonTopic,
  SwitchUnit,
  ViewUnit,
  SliderUnit,
  SoundUnit,
  LogUnit,
  LogTool,
  NotifyUnit,
  KeypadUnit,
  DisconnectUnit,
  SoundAlarmUnit,
  ModalUnit,

  // Antd Components
  Card,

  // Icons
  faUpload,
  faDownload,
  faCodeBranch,
  faBars,
  faImage,
  faBolt,
  faLightbulb,
  faStar,
  faPaperPlane,
  faTurnDown,
  faCircleXmark,
  faPlay,
  faPause,
  faBan,
  faPencil,
  faCircleExclamation,
  faPowerOff,
  faSpinner,
  Themes,

  // Format types
  ToIconFormat,
  ToIconValueFormat,
  onoffnum,
  onoffst,

  // String Formats
  StringValueFormat,
  JSONValueFormat,
  HEXValueFormat,
  Base64ValueFormat,
  SwitchValueFormat,
  NumberValueFormat,

  // Icon formats
  DimIconFormat,
  SwitchIconFormat,
  BulbIconFormat,
  ThuderboltIconFormat,
  StarIconFormat,
  StringIconFormat,
  NumberIconFormat,
  MapIconFormat,
  MapJSONBuffer,
  MapJSONIconFormat,

  // Icon value formats
  SwitchIconValueFormat,
  BulbIconValueFormat,
  ThuderboltIconValueFormat,
  StarIconValueFormat,
  StringIconValueFormat,
  NumberIconValueFormat,

  // Gauge Formats
  DashboardIconFormat,
  LinearIconFormat,
  SimpleIconFormat,
  CircularIconFormat,
  MetroIconFormat,
  ProgressIconFormat,
  SpaceIconFormat,
  LiquidIconFormat,
  DialIconFormat,
  FuelIconFormat,
  ControlIconFormat,

  // Chart Format
  ChartIconFormat,

  // Image Format
  ImageIconFormat,
};

const JSXCONTEXTKEYS: string[] = [];
const JSXCONTEXTVALUES: any[] = [];
for (const [key, value] of Object.entries(JSXCONTEXT)) {
  JSXCONTEXTKEYS.push(key);
  JSXCONTEXTVALUES.push(value);
}

const getErrorMessage = (error: unknown, msg: string = "Unknown error") => {
  if (error instanceof Error) {
    return error.message;
  }
  return msg;
}

const JSXRender: React.FC<{ jsx: string }> = ({ jsx }) => {

  let output;
  try {
    output = Babel.transform(jsx, {
      presets: [[
        "react",
        {
          pragma: "createElement",
          pragmaFrag: "Fragment"
        },
      ]]
    }).code;
  } catch (error) {
    return <AppError
      title="Failed to compile JSX code"
      error={getErrorMessage(error, "Unknown compilation error")}
      jsx={jsx}
    />;
  }

  if (!output) {
    return <AppError
      title="Failed to execute JSX code"
      error="JSX compiled code is empty"
      jsx={jsx}
    />;
  }

  let fn;
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(...JSXCONTEXTKEYS, "output", "return eval(output);");
  } catch (error) {
    return <AppError
      title="Failed to execute JSX code"
      error={getErrorMessage(error, "Unknown JSX evaluation error")}
      jsx={jsx}
    />;
  }

  try {
    return fn(...JSXCONTEXTVALUES, output);
  } catch (error) {
    return <AppError
      title="Failed to execute JSX code"
      error={getErrorMessage(error, "Unknown JSX execution error")}
      jsx={jsx}
    />;
  }
};

const AppDashboard: React.FC<{ jsx: string; css?: string }> = React.memo(
  ({ jsx, css }) => (
    <>
      {css && (
        <link
          rel="stylesheet"
          type="text/css"
          href={`data:text/css;base64,${btoa(css)}`}
        ></link>
      )}
      <JSXRender jsx={jsx} />
    </>
  )
);
export default AppDashboard;

