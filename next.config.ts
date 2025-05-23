import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'fwqp5qkk5cd3bhjq.public.blob.vercel-storage.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      // Add other domains if needed
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb', // Match your Zod schema's 4MB limit
    },
  },
};

export default nextConfig;
