/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bilitiko-backend.vercel.app',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/my-tickets', destination: '/profile?tab=tickets', permanent: true },
      { source: '/my-trips', destination: '/profile?tab=trips', permanent: true },
    ];
  },
}

module.exports = nextConfig

