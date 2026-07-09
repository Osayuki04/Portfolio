"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Video, FileText, Sparkles } from "lucide-react";
import { ContentCard } from "@/components/content/ContentCard";
import type { Content } from "@/lib/content";

/** Icons are keyed by name: a server component cannot pass a function across the boundary. */
const ICONS = {
  star: Star,
  video: Video,
  article: FileText,
  insight: Sparkles,
} as const;

export type CarouselIcon = keyof typeof ICONS;

export function ContentCarousel({
  items,
  label,
  icon,
}: {
  items: Content[];
  label: string;
  icon: CarouselIcon;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const Icon = ICONS[icon];

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 2px slack: sub-pixel scroll widths never land exactly on the end.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync, items.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 label-tech text-faint">
          <Icon className="h-4 w-4" />
          {label}
        </div>

        <div className="flex items-center gap-2">
          <Arrow direction="left" disabled={atStart} onClick={() => scrollByPage(-1)} />
          <Arrow direction="right" disabled={atEnd} onClick={() => scrollByPage(1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={sync}
        className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
          >
            <ContentCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Arrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Chevron = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/40 text-muted transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-content disabled:cursor-not-allowed disabled:border-border/50 disabled:text-faint/40 disabled:hover:bg-card/40"
    >
      <Chevron className="h-4 w-4" />
    </button>
  );
}
