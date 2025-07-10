/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "http://192.168.34.228:3000", // ← Allow access from this IP
    "http://localhost:3000", // ← Optional, still allow localhost too
  ],
};

export default nextConfig;
