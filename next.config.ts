import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  // Устанавливаем порт и хост для Render
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Убедимся, что приложение может работать за reverse proxy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
