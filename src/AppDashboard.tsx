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
} from "./format/GaugeFormat";

const AppDashboard: React.FC<{ jsx: string }> = React.memo(({ jsx }) => (
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
    renderError={() => <div className="myhJSXError">Render Error</div>}
    renderUnrecognized={(tagname) => (
      <div className="myhJSXUnreconized">Unrecognized tag {tagname}</div>
    )}
  />
));

export default AppDashboard;
