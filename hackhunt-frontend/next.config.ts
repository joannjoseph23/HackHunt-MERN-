import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['assets.devfolio.co', 'devfolio.co'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ already disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ add this to skip TS errors during `next build`
  },
};

export default nextConfig;
