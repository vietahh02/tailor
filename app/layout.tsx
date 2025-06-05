import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "swiper/css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthWrapper } from "./context/auth.context";
import "./common/search.css";

export const metadata: Metadata = {
  title: "Tailor Nail",
  description: "",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vn">
      <body>
        <AuthWrapper>{children}</AuthWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
