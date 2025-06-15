import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true, // ❗ Bỏ qua lỗi TypeScript khi build
  // },
  reactStrictMode: false,
};
// module.exports = {
//   output: "export", // 👈 yêu cầu bắt buộc để export static
// };

export default nextConfig;
