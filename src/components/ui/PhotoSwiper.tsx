"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export type SwiperPhoto = { src: string; alt: string; pos?: string };

/**
 * A row of tall photos that shows as many as fit and swipes the rest:
 *   phones        one at a time (the next one peeks in)
 *   sm – 2xl      two at a time
 *   2xl and up    all three side by side, no swiping
 * Swipe or drag on touch, or use the arrows. The arrows and dots hide once
 * every photo is visible.
 */
export function PhotoSwiper({
  photos,
  label,
  className = "",
}: {
  photos: readonly SwiperPhoto[];
  label: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setScrollable(el.scrollWidth > el.clientWidth + 2);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    const first = el.children[0] as HTMLElement | undefined;
    if (first) {
      const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setActive(Math.min(photos.length - 1, Math.round(el.scrollLeft / step)));
    }
  }, [photos.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        onScroll={sync}
        aria-label={label}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto 2xl:grid 2xl:grid-cols-3 2xl:overflow-visible"
      >
        {photos.map((photo, i) => (
          <Reveal
            as="li"
            key={photo.src}
            delay={0.06 + i * 0.05}
            className="relative aspect-[3/4] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-card sm:w-[calc((100%-0.75rem)/2)] sm:rounded-3xl 2xl:w-auto"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1536px) 50vw, 33vw"
              className="object-cover"
              style={{ objectPosition: photo.pos }}
            />
          </Reveal>
        ))}
      </ul>

      {/* Controls: only while some photos are out of view. */}
      {scrollable && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div aria-hidden className="flex gap-1.5">
            {photos.map((photo, i) => (
              <span
                key={photo.src}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-accent" : "w-1.5 bg-border-strong"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <RoundButton label="Previous photo" disabled={atStart} onClick={() => step(-1)}>
              <ChevronLeft className="size-4" />
            </RoundButton>
            <RoundButton label="Next photo" disabled={atEnd} onClick={() => step(1)}>
              <ChevronRight className="size-4" />
            </RoundButton>
          </div>
        </div>
      )}
    </div>
  );
}

function RoundButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full border border-border-strong text-content transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-content"
    >
      {children}
    </button>
  );
}
