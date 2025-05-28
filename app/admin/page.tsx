"use client";

import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import ChartMoney from "./ChartMoney";

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Admin" }, { title: "Dash board" }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ChartMoney />
        </div>
      </Content>
    </>
  );
};

export default App;
