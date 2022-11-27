/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  /** basePath: "/test",*/
  assetPrefix: "/my-unsplash/",
  images: {
    domains: ['127.0.0.1'],
  },

}

module.exports = nextConfig

