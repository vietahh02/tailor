import type { Metadata } from "next";
import Header from "../common/header";
import Footer from "../common/footer";

export const metadata: Metadata = {
  title: "Tailor Nail | My Account",
  description: "Get in touch with us for any inquiries or support.",
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
