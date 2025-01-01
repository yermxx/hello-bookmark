/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
      },
      {
        protocol: 'https',
        hostname: 't1.daumcdn.net',
      },
    ],
  },
};

export default nextConfig;
