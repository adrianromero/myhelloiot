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

// @ts-nocheck

import React from "react";
import { Row, Col } from "antd";
import {
  AlertFilled,
  ApiFilled,
  AudioFilled,
  BankFilled,
  BellFilled,
  BookFilled,
  BugFilled,
  BuildFilled,
  BulbFilled,
  CameraFilled,
  CarFilled,
  DashboardFilled,
  PictureFilled,
} from "@ant-design/icons";
import { ReactComponent as Themes } from "./assets/svg/themes.svg";
import JsxParser from "react-jsx-parser";

import PanelGrid, { C, CCard } from "./dashboard/PanelGrid";
import Dashboard from "./dashboard/Dashboard";
import DashboardMenu from "./dashboard/DashboardMenu";
import InputUnit from "./units/InputUnit";
import ButtonUnit from "./units/ButtonUnit";
import SwitchUnit from "./units/SwitchUnit";
import ViewUnit from "./units/ViewUnit";
import SliderUnit from "./units/SliderUnit";

import {
  HEXValueFormat,
  Base64ValueFormat,
  SwitchValueFormat,
  NumberValueFormat,
} from "./format/ValueFormat";
import {
  TitleIconValueFormat,
  LiteralIconValueFormat,
  ImageIconValueFormat,
} from "./format/ButtonFormat";
import {
  BulbIconFormat,
  ThuderboltIconFormat,
  SwitchIconValueFormat,
  NumberIconFormat,
} from "./format/IconFormat";
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
import AppError from "./AppError";

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
      <JsxParser
        renderInWrapper={false}
        bindings={{
          Buffer,
          HEXValueFormat,
          Base64ValueFormat,
          SwitchValueFormat,
          NumberValueFormat,
          TitleIconValueFormat,
          LiteralIconValueFormat,
          ImageIconValueFormat,
          BulbIconFormat,
          ThuderboltIconFormat,
          SwitchIconValueFormat,
          NumberIconFormat,
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
          Themes,
        }}
        components={{
          AlertFilled,
          ApiFilled,
          AudioFilled,
          BankFilled,
          BellFilled,
          BookFilled,
          BugFilled,
          BuildFilled,
          BulbFilled,
          CameraFilled,
          CarFilled,
          DashboardFilled,
          PictureFilled,
          Row,
          Col,
          Dashboard,
          DashboardMenu,
          PanelGrid,
          C,
          CCard,
          InputUnit,
          ButtonUnit,
          SwitchUnit,
          ViewUnit,
          SliderUnit,
        }}
        jsx={jsx}
        renderError={({ error }) => (
          <AppError
            title="Failed to compile JSX code."
            error={error}
            jsx={jsx}
          />
        )}
        renderUnrecognized={(tagname) => (
          <AppError
            title="Failed to execute JSX code."
            error={`Unrecongnized tag: ${tagname}`}
          />
        )}
      />
    </>
  )
);

export default AppDashboard;
