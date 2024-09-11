/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Explicitly set the pages directory to null
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = nextConfig