/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [{
      source: "/api/:path*",
      destination: "http://localhost:8080/api/:path*",
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