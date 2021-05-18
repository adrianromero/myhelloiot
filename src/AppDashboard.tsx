// @ts-nocheck
import React from "react";
import JsxParser from "react-jsx-parser";

import PanelGrid, { C, CCard } from "./dashboard/PanelGrid";
import Dashboard from "./dashboard/Dashboard";
import DashboardMenu from "./dashboard/DashboardMenu";
import InputUnit from "./units/InputUnit";
import ButtonUnit from "./units/ButtonUnit";

import {
  HEXValueEdit,
  Base64ValueEdit,
  SwitchValueEdit,
} from "./format/ValueFormat";
import {
  TitleIconEdit,
  LiteralIconEdit,
  ImageIconEdit,
} from "./format/ButtonFormat";

import PanelTests from "./dashboard/PanelTests";
import PanelTestNumbers from "./dashboard/PanelTestNumbers";

const AppDashboard: React.FC<{ jsx: string }> = React.memo(({ jsx }) => (
  <JsxParser
    renderInWrapper={false}
    bindings={{
      Buffer,
      HEXValueEdit,
      Base64ValueEdit,
      SwitchValueEdit,
      TitleIconEdit,
      LiteralIconEdit,
      ImageIconEdit,
    }}
    components={{
      Dashboard,
      DashboardMenu,
      PanelGrid,
      C,
      CCard,
      InputUnit,
      ButtonUnit,
      PanelTests,
      PanelTestNumbers,
    }}
    jsx={jsx}
  />
));

export default AppDashboard;
