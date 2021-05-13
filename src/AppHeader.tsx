import React from "react";
import { Layout } from "antd";

const AppHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="myhAppHeader-title" style={{ flexGrow: 1 }}>
          MYHELLOIOT
        </span>
        {children}
      </div>
    </Layout.Header>
  );
};
export default AppHeader;
