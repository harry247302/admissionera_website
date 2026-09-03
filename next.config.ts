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
    ],
  },
};

export default nextConfig;
