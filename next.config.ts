import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer는 서버 번들에서 제외
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
