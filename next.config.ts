import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern, smaller image formats for better LCP / Core Web Vitals (SEO).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Allow the dev server's internal /_next assets (HMR, JS chunks) to load when
  // the site is reached from a tunnel/proxy origin rather than localhost.
  // Without this, Next 16 blocks those requests, the client never hydrates, and
  // content rendered at opacity:0 by framer-motion never reveals.
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
  ],
};

export default nextConfig;
