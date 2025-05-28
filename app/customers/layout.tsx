import type { Metadata } from "next";
import Header from "../common/header";
import Footer from "../common/footer";

export const metadata: Metadata = {
  title: "Tailor Nail | Clients",
  description: "Discover our range of nail products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
