import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.admissionera.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
