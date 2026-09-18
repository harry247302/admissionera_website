import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.collegevidya.com",
        pathname: "/home/**",
      },
      {
        protocol: "https",
        hostname: "backend.admissionera.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
