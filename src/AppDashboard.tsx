import React from "react";
import JsxParser from "react-jsx-parser";
import ContentDashboard from "./dashboard/ContentDashboard";

const AppDashboard: React.FC<{ jsx: string }> = ({ jsx }) => (
  <JsxParser
    renderInWrapper={false}
    bindings={{}}
    components={{ ContentDashboard }}
    jsx={jsx}
  />
);

export default AppDashboard;
