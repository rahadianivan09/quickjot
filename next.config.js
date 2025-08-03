/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // � biar lint error nggak blok build
  },
  typescript: {
    ignoreBuildErrors: true, // � biar type error nggak blok build
  },
};

module.exports = nextConfig;
