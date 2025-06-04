import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailor Nail | Login",
  description: "Discover our range of nail products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
