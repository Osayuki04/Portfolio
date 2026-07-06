// Resolve a content item to an official embed iframe URL + sizing.
// Only official embed endpoints are used (no scraping):
//   TikTok   → https://www.tiktok.com/embed/v2/{videoId}
//   LinkedIn → https://www.linkedin.com/embed/feed/update/urn:li:{kind}:{id}
//   YouTube  → https://www.youtube.com/embed/{videoId}
// Returns null when the platform has no embed or the id can't be resolved,
// in which case the card falls back to the generated placeholder.

import type { Content } from "./content";

export type EmbedInfo = {
  src: string;
  /** Fixed media height in px, or "video" for a 16:9 responsive box. */
  height: number | "video";
};

export function getEmbed(item: Content): EmbedInfo | null {
  const url = item.sourceUrl || item.embedUrl || "";
  if (!url) return null;

  switch (item.platform) {
    case "tiktok": {
      const id = url.match(/\/video\/(\d+)/)?.[1];
      const src = id
        ? `https://www.tiktok.com/embed/v2/${id}`
        : `https://www.tiktok.com/embed/?type=video&queryURL=${encodeURIComponent(url)}`;
      return { src, height: 600 };
    }
    case "linkedin": {
      const m = url.match(/(ugcPost|activity|share)-(\d+)/);
      if (!m) return null;
      return {
        src: `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}`,
        height: 520,
      };
    }
    case "youtube": {
      const id = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];
      if (!id) return null;
      return { src: `https://www.youtube.com/embed/${id}`, height: "video" };
    }
    default:
      return null;
  }
}
