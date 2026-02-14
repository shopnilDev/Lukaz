/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["admin.lukazshop.com"],
  },

  async rewrites() {
    const backendUrl = process.env.BASE_URL || "https://admin.lukazshop.com"; 

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
