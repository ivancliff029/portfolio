/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
    images: {
      domains: ['banner2.cleanpng.com', 'static.vecteezy.com', 'upload.wikimedia.org','tryhackme-badges.s3.amazonaws.com'],
    },
    async rewrites() {
      return [
        {
          source: '/blogs/:slug',
          destination: '/blogs/[slug]',
        },
      ];
    },
  }
  