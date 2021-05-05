import React from "react";
import JsxParser from "react-jsx-parser";
import ContentDashboard from "./dashboard/ContentDashboard";

const AppDashboard: React.FC<{}> = () => (
  <JsxParser
    renderInWrapper={false}
    bindings={{}}
    components={{ ContentDashboard }}
    jsx="<ContentDashboard />"
  />
);

export default AppDashboard;
