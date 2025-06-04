import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['assets.devfolio.co', 'devfolio.co'], // 👈 add your image domains here
  },
  eslint: {
    ignoreDuringBuilds: true,},
};

export default nextConfig;
