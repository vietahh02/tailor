"use client";

import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import ListProduct from "./ListProduct";

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
          items={[{ title: "Home" }, { title: "Products" }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ListProduct />
        </div>
      </Content>
    </>
  );
};

export default App;
