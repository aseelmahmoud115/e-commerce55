import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
      // only used when testing against a local copy of the API
      { protocol: "http", hostname: "localhost", pathname: "/**" },
    ],
    dangerouslyAllowLocalIP: process.env.ALLOW_LOCAL_IMAGES === "true",
  },
};

export default nextConfig;
