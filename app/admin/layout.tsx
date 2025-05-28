import { Layout } from "antd";
import type { Metadata } from "next";
import HeaderAdmin from "./HeaderAdmin";
import FooterAdmin from "./FooterAdmin";

export const metadata: Metadata = {
  title: "Tailor Nail | Admin",
  description: "Discover our range of nail products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <HeaderAdmin />
        {children}
        <FooterAdmin />
      </Layout>
    </>
  );
}
