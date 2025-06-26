"use client";

// app/orders/page.tsx hoặc src/app/orders/page.tsx (Next.js App Router)
import { useEffect, useState } from "react";
import ExportOrdersWithFilter from "./OrderExportWithFilter";
import { getAllOrderForAdmin } from "../util/apiAdmin";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  id: number;
  customer_name: string;
  shipping_address: string;
  created_at: string;
  status: string;
  items: OrderItem[];
  note?: string;
  total_amount: number;
};

// const orders1 = [
//   {
//     id: 1,
//     customer: "Nguyễn Văn A",
//     date: "2024-06-01",
//     total: 100000,
//     status: "Đã thanh toán",
//   },
//   {
//     id: 2,
//     customer: "Lê Thị B",
//     date: "2024-06-15",
//     total: 200000,
//     status: "Chờ xử lý",
//   },
//   {
//     id: 3,
//     customer: "Phạm Văn C",
//     date: "2024-07-01",
//     total: 180000,
//     status: "Hoàn thành",
//   },
// ];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getAllOrderForAdmin()) as any;
      setOrders(res.reverse());
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Export đơn hàng theo khoảng ngày</h2>
      <ExportOrdersWithFilter orders={orders} />
    </div>
  );
}
