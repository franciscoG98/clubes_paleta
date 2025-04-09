import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_URI: process.env.BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'https',
        hostname: 'clubes-paleta-back.onrender.com',
      },
    ],
  },
};

export default nextConfig;
