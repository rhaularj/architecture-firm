/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.usercontent.google.com" },
      { protocol: "https", hostname: "drive.google.com" },
    ],
  },
};

module.exports = nextConfig;
