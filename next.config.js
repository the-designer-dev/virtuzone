/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://www.cdn.jsdelivr.net']
  },

  reactStrictMode: true,
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
