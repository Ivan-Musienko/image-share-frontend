/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [{
      source: "/api/:path*",
      destination: "https://image-share-backend.onrender.com/api/:path*",
    }, ];
  },
  images: {
    remotePatterns: [{
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: false,
};