// @ts-nocheck
import React from "react";
import JsxParser from "react-jsx-parser";

import Dashboard from "./dashboard/Dashboard";
import DashboardMenu from "./dashboard/DashboardMenu";
import PanelTests from "./dashboard/PanelTests";
import PanelTestNumbers from "./dashboard/PanelTestNumbers";

const AppDashboard: React.FC<{ jsx: string }> = React.memo(({ jsx }) => (
  <JsxParser
    renderInWrapper={false}
    bindings={{}}
    components={{ Dashboard, DashboardMenu, PanelTests, PanelTestNumbers }}
    jsx={jsx}
  />
));

export default AppDashboard;
