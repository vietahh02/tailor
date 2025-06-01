"use client";

import { useRouter } from "next/navigation";
import { Layout } from "antd";
import HeaderAdmin from "./HeaderAdmin";
import FooterAdmin from "./FooterAdmin";
import { useAuth } from "../context/auth.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { checkAdmin, loadingAuth } = useAuth();
  const router = useRouter();

  if (loadingAuth) {
    return <p>Đang kiểm tra xác thực...</p>;
  }

  if (!checkAdmin()) {
    router.push("/");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderAdmin />
      {children}
      <FooterAdmin />
    </Layout>
  );
}
