"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { platformMeta } from "@/components/content/PlatformBadge";
import type { Content } from "@/lib/content";

/**
 * Click-to-load embed (the "facade" pattern).
 *
 * A TikTok/LinkedIn iframe pulls in hundreds of KB of third-party JS each. With
 * a dozen cards on a page that is the single biggest thing slowing it down, so
 * we render a cheap poster first and only mount the real iframe once the user
 * asks for it. Nothing loads, and nothing can autoplay, until then.
 */
export function EmbedFrame({
  item,
  src,
  height,
}: {
  item: Content;
  src: string;
  height: number | "video";
}) {
  const [active, setActive] = useState(false);

  const isVideoRatio = height === "video";
  const sizeClass = isVideoRatio ? "aspect-video w-full" : "block w-full";
  const sizeStyle = isVideoRatio ? undefined : { height };
  const { Icon } = platformMeta[item.platform] ?? platformMeta.blog;

  // Only trust locally-hosted posters. Imported thumbnails are signed CDN URLs
  // (TikTok et al) that are not allowlisted for next/image and expire anyway.
  const poster = item.featuredImage?.startsWith("/") ? item.featuredImage : null;

  if (active) {
    return (
      <iframe
        src={src}
        title={item.title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className={sizeClass}
        style={sizeStyle}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Load ${item.platform} post: ${item.title}`}
      className={`group/embed relative ${sizeClass} overflow-hidden`}
      style={sizeStyle}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-card">
          <span className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <Icon className="h-12 w-12 text-faint/40" />
        </span>
      )}

      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/40 transition-colors group-hover/embed:bg-background/25">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/80 text-content backdrop-blur-sm transition-transform duration-300 group-hover/embed:scale-110">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </span>
        <span className="rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted backdrop-blur-sm">
          Tap to load
        </span>
      </span>
    </button>
  );
}
