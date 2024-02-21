/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "dailycoffeenews.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
    ],
  },
  experimental: {
    serverActions: true,
    serverMinification: false,
  },
};

export default nextConfig;
