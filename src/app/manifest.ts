import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Full Stack Developer`,
    short_name: siteName,
    description:
      "Full Stack Developer and Founder of MEXO. Building products end to end and sharing the journey publicly.",
    start_url: "/",
    display: "standalone",
    background_color: "#041b18",
    theme_color: "#041b18",
    icons: [
      { src: "/icon.jpeg", sizes: "any", type: "image/jpeg" },
      { src: "/apple-icon.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
  };
}
