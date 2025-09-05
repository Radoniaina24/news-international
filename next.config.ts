import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "images.pexels.com",
      "res.cloudinary.com",
      "via.placeholder.com",
      "source.unsplash.com",
      "flagcdn.com",
      "gateofafrica.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
