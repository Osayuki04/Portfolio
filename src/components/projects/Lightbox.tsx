"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = { src: string; label: string };

export function Lightbox({
  images,
  index,
  setIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex(index === null ? null : (index + dir + images.length) % images.length),
    [index, images.length, setIndex]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, go]);

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
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background/92 p-4 backdrop-blur-md sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
        >
          {/* top bar */}
          <div className="flex w-full max-w-5xl items-center justify-between pb-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {images[index].label}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-faint">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* stage */}
          <div
            className="relative flex w-full max-w-5xl items-center justify-center"
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
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="relative max-h-[78vh] w-full overflow-y-auto overscroll-contain rounded-xl border border-border bg-card shadow-2xl"
              >
                {/* Show the full image at full width; scroll within the popup if tall. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[index].src}
                  alt={images[index].label}
                  className="block h-auto w-full"
                />
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
          <div className="mt-4 flex w-full max-w-5xl gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`View ${img.label}`}
                className={`relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-md border transition-colors ${
                  i === index ? "border-accent" : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt={img.label} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
