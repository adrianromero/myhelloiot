/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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

import * as Babel from '@babel/standalone';
import { Buffer } from "buffer";
import DashboardPage from "./dashboard/DashboardPage";
import Dashboard from "./dashboard/Dashboard";
import DashboardContent from "./dashboard/DashboardContent";
import InputUnit from "./units/InputUnit";
import { createComponentCard } from "./units/ComponentCard";
import LogUnit from "./units/LogUnit";
import LogTool from "./units/LogTool";
import Publisher from "./units/Publisher";
import ButtonUnit from "./units/ButtonUnit";
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
} from "./format/FormatTypes";
import { ONOFFNumber, ONOFFStr } from "./format/FormatConstants";
import {
  MessageValueFormat,
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
  Numeric,
  Celsius,
  Fahrenheit,
  KilometerPerHour,
  Percent
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
import { JSONConvert, Shelly2Convert } from "./format/ConvertTypes";
import AppError from "./AppError";
import { createComponentLabeled } from "./units/ComponentLabeled";

const JSXCONTEXT = {
  //React JSX
  createElement,
  Fragment,

  //NodeObject
  Buffer,

  // Antd Components
  Card,

  // HelloIOT Components
  Dashboard,
  DashboardContent,
  DashboardPage,
  InputUnit,
  InputCard: createComponentCard(InputUnit),
  InputLabel: createComponentLabeled(InputUnit, "baselined"),
  Publisher,
  ButtonUnit,
  ButtonCard: createComponentCard(ButtonUnit),
  ButtonLabel: createComponentLabeled(ButtonUnit, "baselined"),
  SwitchUnit,
  SwitchCard: createComponentCard(SwitchUnit),
  SwitchLabel: createComponentLabeled(SwitchUnit, "centeredunit"),
  ViewUnit,
  ViewCard: createComponentCard(ViewUnit),
  ViewLabel: createComponentLabeled(ViewUnit, "baselined"),
  SliderUnit,
  SliderCard: createComponentCard(SliderUnit),
  SliderLabel: createComponentLabeled(SliderUnit),
  SoundUnit,
  LogUnit,
  LogTool,
  NotifyUnit,
  KeypadUnit,
  DisconnectUnit,
  SoundAlarmUnit,
  ModalUnit,

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

  // Format types
  ToIconFormat,
  ToIconValueFormat,
  ONOFFNumber,
  ONOFFStr,

  // ValueFormats
  MessageValueFormat,
  StringValueFormat,
  JSONValueFormat,
  HEXValueFormat,
  Base64ValueFormat,
  SwitchValueFormat,
  NumberValueFormat,

  // Units
  Numeric,
  Celsius,
  Fahrenheit,
  KilometerPerHour,
  Percent,

  // IconFormats
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

  // IconFormats Gauges
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

  // IconFormats Chart
  ChartIconFormat,

  // IconFormats Image
  ImageIconFormat,

  // IconValueFormats
  SwitchIconValueFormat,
  BulbIconValueFormat,
  ThuderboltIconValueFormat,
  StarIconValueFormat,
  StringIconValueFormat,
  NumberIconValueFormat,

  // Converters
  JSONConvert,
  Shelly2Convert
};

const JSXCONTEXTKEYS: string[] = [];
const JSXCONTEXTVALUES: object[] = [];
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

  if (!jsx || !jsx.trim()) {
    return <AppError title="Failed to compile JSX code" errorMessage="JSX code is empty." />;
  }

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
      errorMessage={getErrorMessage(error, "Unknown compilation error")}
      jsx={jsx}
    />;
  }

  if (!output) {
    return <AppError
      title="Failed to execute JSX code"
      errorMessage="JSX compiled code is empty"
      jsx={jsx}
    />;
  }

  let fn;
  try {
    fn = new Function(...JSXCONTEXTKEYS, "output", "return eval(output);");
  } catch (error) {
    return <AppError
      title="Failed to execute JSX code"
      errorMessage={getErrorMessage(error, "Unknown JSX evaluation error")}
      jsx={jsx}
    />;
  }

  try {
    return fn(...JSXCONTEXTVALUES, output);
  } catch (error) {
    return <AppError
      title="Failed to execute JSX code"
      errorMessage={getErrorMessage(error, "Unknown JSX execution error")}
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
          href={`data:text/css;base64,${btoa(css)}`} //Buffer.from(data).toString('base64');
        ></link>
      )}
      <JSXRender jsx={jsx} />
    </>
  )
);
export default AppDashboard;

