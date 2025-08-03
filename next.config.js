/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // � Abaikan lint error saat build
  },
  typescript: {
    ignoreBuildErrors: true, // � Abaikan type error saat build
  },
};

module.exports = nextConfig;
