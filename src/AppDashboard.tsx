/*
MYHELLOIOT
Copyright (C) 2021-2022 Adrián Romero
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

import React, { ComponentType, ExoticComponent } from "react";
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

import { ErrorBoundary } from "react-error-boundary";
import { ReactComponent as Themes } from "./assets/svg/themes.svg";
import JsxParser from "react-jsx-parser";

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

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <AppError title="Failed to execute JSX code" error={error.message} />
);

const bindings = {
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
  Buffer,

  ToIconFormat,
  ToIconValueFormat,
  onoffnum,
  onoffst,

  StringValueFormat,
  JSONValueFormat,
  HEXValueFormat,
  Base64ValueFormat,
  SwitchValueFormat,
  NumberValueFormat,

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

  SwitchIconValueFormat,
  BulbIconValueFormat,
  ThuderboltIconValueFormat,
  StarIconValueFormat,
  StringIconValueFormat,
  NumberIconValueFormat,

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
  ChartIconFormat,
  ImageIconFormat,
};

const components: Record<string, ComponentType<{}> | ExoticComponent<{}>> = {
  Card,
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
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <JsxParser
          renderInWrapper={false}
          bindings={bindings}
          components={components}
          jsx={jsx}
          renderError={({ error }) => (
            <AppError
              title="Failed to compile JSX code"
              error={error}
              jsx={jsx}
            />
          )}
          renderUnrecognized={(tagname) => (
            <AppError
              title="Failed to execute JSX code"
              error={`Unrecognized tag: ${tagname}`}
            />
          )}
        />
      </ErrorBoundary>
    </>
  )
);

export default AppDashboard;
