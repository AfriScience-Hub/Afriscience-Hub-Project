import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy the API through this origin so the HttpOnly refresh cookie is
  // first-party. Cross-site API calls are treated as third-party cookies by
  // modern browsers and can be dropped, which made every token refresh fail
  // and forced users to sign in again. Set NEXT_PUBLIC_API_URL=/api/proxy.
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://ash-be-1.onrender.com/api/v1/:path*',
      },
    ];
  },
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
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'afriscience-buckset.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
