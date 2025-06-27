import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-922e9f2c314d45d3a144da28bf276e62.r2.dev/**",
      }],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.CLOUD_RUN_API_URL}/api/:path*`,
      }
    ]
  }
};

export default nextConfig;
