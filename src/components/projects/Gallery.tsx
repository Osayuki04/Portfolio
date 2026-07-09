"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ProjectImage } from "@/components/projects/ProjectImage";
import type { GalleryItem } from "@/lib/projects";

export function Gallery({ items, name }: { items: GalleryItem[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  // Keyboard navigation + scroll lock while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View ${item.label}`}
            className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent/40"
          >
            <ProjectImage
              src={item.src}
              name={name}
              label={item.label}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
              <Maximize2 className="h-5 w-5 text-content" />
            </span>
            <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 border-t border-border bg-background/70 px-3 py-1.5 backdrop-blur-sm">
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                {item.label}
              </span>
              <span className="font-mono text-[10px] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-background/90 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} screenshot gallery`}
          >
            {/* top bar */}
            <div className="flex w-full max-w-4xl items-center justify-between pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {name} · {items[open].label}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-faint">
                  {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close gallery"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* stage */}
            <div
              className="relative flex w-full max-w-4xl items-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute -left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-muted transition-colors hover:border-accent/40 hover:text-content sm:-left-14"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={open}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="relative max-h-[78vh] w-full overflow-y-auto overscroll-contain rounded-xl border border-border bg-card shadow-2xl"
                >
                  {items[open].src ? (
                    // Full-page screenshots: show the whole image at full width and
                    // let the user scroll it inside the popup (no cropping).
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={items[open].src}
                      alt={`${name} - ${items[open].label}`}
                      className="block h-auto w-full"
                    />
                  ) : (
                    <div className="relative aspect-[16/10] w-full">
                      <ProjectImage name={name} label={items[open].label} sizes="(max-width: 896px) 100vw, 896px" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-muted transition-colors hover:border-accent/40 hover:text-content sm:-right-14"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* thumbnail strip */}
            <div className="mt-4 flex w-full max-w-4xl gap-2 overflow-x-auto pb-1">
              {items.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(i);
                  }}
                  aria-label={`Go to ${item.label}`}
                  className={`relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-md border transition-colors ${
                    i === open ? "border-accent" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <ProjectImage src={item.src} name={name} label={item.label} sizes="80px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
