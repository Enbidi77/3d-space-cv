import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@space/portfolio-content',
    '@space/state',
    '@space/ui',
    '@space/galaxy-engine',
  ],
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

