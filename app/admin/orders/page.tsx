"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import OrderTable from "./OrderTable";
import { getAllOrderForAdmin } from "@/app/util/apiAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ExportOrdersWithFilter from "./OrderExportWithFilter";

const { Content } = Layout;

const App: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getAllOrderForAdmin()) as any;
      console.log(res);
      if (!res.detail) {
        setOrders(res);
      } else {
        toast.info("Hãy đăng nhập để xem danh sách đơn hàng");
        router.push("/login");
      }
    };
    fetchData();
  }, []);

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
            <div>
              <h1>Danh sách đơn hàng</h1>
              <ExportOrdersWithFilter orders={orders.reverse()} />
            </div>
            <OrderTable orders={orders} setOrders={setOrders} />
          </main>
        </div>
      </Content>
    </>
  );
};

export default App;
