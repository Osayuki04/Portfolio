import Image from "next/image";
import { ArrowUpRight, Eye, Play } from "lucide-react";
import { PlatformBadge, platformMeta } from "@/components/content/PlatformBadge";
import { EmbedFrame } from "@/components/content/EmbedFrame";
import { formatDate, formatViews, type Content } from "@/lib/content";
import { getEmbed } from "@/lib/embeds";

export function ContentCard({ item, featured = false }: { item: Content; featured?: boolean }) {
  const embed = getEmbed(item);
  // Embeddable posts render a live iframe, so the whole card can't be an <a>
  // (the iframe is interactive). Non-embeddable items keep the click-through card.
  if (embed) return <EmbedCard item={item} embed={embed} />;

  const href = item.sourceUrl || item.embedUrl || undefined;
  const isVideo = item.contentType === "video";
  const Wrapper = (href ? "a" : "div") as React.ElementType;
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...linkProps}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-colors duration-300 hover:border-accent/40 ${
        href ? "cursor-pointer" : ""
      }`}
    >
      {/* thumbnail */}
      <div
        className={`relative w-full overflow-hidden border-b border-border ${
          featured ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <Thumb item={item} />
        <span className="absolute left-3 top-3 z-10">
          <PlatformBadge platform={item.platform} />
        </span>
        {isVideo && (
          <span className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/70 text-content backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-0.5 fill-current" />
            </span>
          </span>
        )}
      </div>

      <CardBody item={item} />
    </Wrapper>
  );
}

function EmbedCard({ item, embed }: { item: Content; embed: NonNullable<ReturnType<typeof getEmbed>> }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-colors duration-300 hover:border-accent/40">
      {/* embed: only loads once the user taps it (see EmbedFrame) */}
      <div className="relative w-full overflow-hidden border-b border-border bg-background">
        <span className="pointer-events-none absolute left-3 top-3 z-10">
          <PlatformBadge platform={item.platform} />
        </span>
        <EmbedFrame item={item} src={embed.src} height={embed.height} />
      </div>

      <CardBody item={item} />
    </div>
  );
}

function CardBody({ item }: { item: Content }) {
  const href = item.sourceUrl || item.embedUrl || undefined;
  return (
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
        <span>{item.category}</span>
        <span className="text-faint">·</span>
        <span className="text-faint">{formatDate(item.publishedDate)}</span>
      </div>
      <h3 className="mt-2 font-display text-base font-bold text-content">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {item.title}
          </a>
        ) : (
          item.title
        )}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{item.excerpt}</p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
          >
            Open Post
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span />
        )}
        {item.views > 0 && (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-faint">
            <Eye className="h-3.5 w-3.5" />
            {formatViews(item.views)}
          </span>
        )}
      </div>
    </div>
  );
}

function Thumb({ item }: { item: Content }) {
  // Only locally-hosted posters: imported CDN thumbnails are not allowlisted for
  // next/image (and are signed URLs that expire), so they'd crash the render.
  const poster = item.featuredImage?.startsWith("/") ? item.featuredImage : null;
  if (poster) {
    return (
      <Image
        src={poster}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }
  // Generated placeholder when no thumbnail is available.
  const { Icon } = platformMeta[item.platform] ?? platformMeta.blog;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-card">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <Icon className="h-12 w-12 text-faint/50" />
    </div>
  );
}
