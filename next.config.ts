import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    serverURI: process.env.BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
    ],
  },
};

export default nextConfig;
