"use client";

import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import OrderTable from "./OrderTable";

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
          items={[{ title: "Home" }, { title: "Orders" }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <main style={{ padding: 24 }}>
            <h1>Danh sách đơn hàng</h1>
            <OrderTable />
          </main>
        </div>
      </Content>
    </>
  );
};

export default App;
