/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // íº€ Abaikan lint error saat build
  },
  typescript: {
    ignoreBuildErrors: true, // íº€ Abaikan type error saat build
  },
};

module.exports = nextConfig;
