"use client";

import React from "react";
import { Layout, Menu } from "antd";
import Image from "next/image";
import logo from "../assets/images/logonew.png";
import { useRouter } from "next/navigation"; // <-- sử dụng useRouter

const { Header } = Layout;

// Map các key với đường dẫn tương ứng
const routeMap: Record<string, string> = {
  "1": "/admin",
  "2": "/admin/users",
  "3": "/admin/products",
  "4": "/admin/orders",
};

const items = [
  { key: "1", label: "Dash board" },
  { key: "2", label: "Users" },
  { key: "3", label: "Products" },
  { key: "4", label: "Orders" },
];

const HeaderAdmin = () => {
  const router = useRouter();

  const handleMenuClick = (e: { key: string }) => {
    const path = routeMap[e.key];
    if (path) {
      router.push(path);
    }
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "white",
      }}
    >
      <Image
        src={logo}
        alt="logo"
        style={{ width: 60, marginRight: 30, cursor: "pointer" }}
        onClick={() => router.push("/admin")}
      />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        onClick={handleMenuClick}
      />
    </Header>
  );
};

export default HeaderAdmin;
