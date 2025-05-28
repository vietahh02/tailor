import type { Metadata } from "next";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/bootstrap.min.css";

import "./assets/css/responsive.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "./assets/css/style.css";

// import "./css/jquery.mCustomScrollbar.min.css";

export const metadata: Metadata = {
  title: "Tailor Nail",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vn">
      <body>{children}</body>
    </html>
  );
}
