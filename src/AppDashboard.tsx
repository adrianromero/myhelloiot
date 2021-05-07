import React from "react";
import JsxParser from "react-jsx-parser";
import DemoDashboard from "./dashboard/DemoDashboard";

const AppDashboard: React.FC<{ jsx: string }> = ({ jsx }) => (
  <JsxParser
    renderInWrapper={false}
    bindings={{}}
    components={{ DemoDashboard }}
    jsx={jsx}
  />
);

export default AppDashboard;
