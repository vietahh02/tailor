import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailor Nail | Design",
  description: "Get in touch with us for any inquiries or support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
