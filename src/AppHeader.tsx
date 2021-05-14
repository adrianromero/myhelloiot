import React from "react";
import { Layout } from "antd";

const AppHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout.Header className="myhAppHeader">
      <div className="myhAppHeader-container">
        <span className="myhAppHeader-title">MYHELLOIOT</span>
        {children}
      </div>
    </Layout.Header>
  );
};
export default AppHeader;
