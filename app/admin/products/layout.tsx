import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailor Nail | Admin | Products ",
  description: "Discover our range of nail products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
