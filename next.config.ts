import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OPTIONAL PROXY FIX for CORS: uncomment if backend needs cookies (credentials: 'include').
  // Then set NEXT_PUBLIC_API_URL=/api/proxy and requests become same-origin.
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/proxy/:path*',
  //       destination: 'https://ash-be-1.onrender.com/api/v1/:path*',
  //     },
  //   ];
  // },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
