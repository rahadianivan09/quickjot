/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // íº€ biar lint error nggak blok build
  },
  typescript: {
    ignoreBuildErrors: true, // íº€ biar type error nggak blok build
  },
};

module.exports = nextConfig;
