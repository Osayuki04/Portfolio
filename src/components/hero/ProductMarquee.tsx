"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/projects/Lightbox";

const shots = [
  { src: "/mexo1.jpeg", label: "MEXO" },
  { src: "/yibera/heroyibera1.png", label: "Yibera" },
  { src: "/alphabuild1.jpeg", label: "AlphaBuild" },
  { src: "/yibera/mainyiberaimage.png", label: "Yibera" },
  { src: "/game1.jpeg", label: "EcoCycle" },
  { src: "/mexo2.jpeg", label: "MEXO" },
  { src: "/yibera/heroyibera2.png", label: "Yibera" },
  { src: "/alphabuild2.jpeg", label: "AlphaBuild" },
  { src: "/yibera/heroyibera3.png", label: "Yibera" },
  { src: "/game2.jpeg", label: "EcoCycle" },
];

export function ProductMarquee() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Duplicate the row so the loop is seamless (animation shifts by -50%).
  const row = [...shots, ...shots];

  return (
    <>
      <div className="marquee-mask relative w-full overflow-hidden py-2">
        <div className="flex w-max gap-5 animate-marquee pr-5">
          {row.map((shot, i) => {
            const realIndex = i % shots.length;
            return (
              <Frame
                key={i}
                src={shot.src}
                label={shot.label}
                priority={i < 2}
                onOpen={() => setOpenIndex(realIndex)}
              />
            );
          })}
        </div>
      </div>

      <Lightbox images={shots} index={openIndex} setIndex={setOpenIndex} />
    </>
  );
}

function Frame({
  src,
  label,
  priority,
  onOpen,
}: {
  src: string;
  label: string;
  priority: boolean;
  onOpen: () => void;
}) {
  return (
    <figure className="relative w-[340px] shrink-0 sm:w-[520px]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Maximize ${label} screenshot`}
        className="group block w-full rounded-2xl border border-border bg-card/60 p-2.5 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)] transition-colors hover:border-accent/40"
      >
        <Screws />
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={src}
            alt={`${label} screenshot`}
            fill
            sizes="(max-width: 640px) 340px, 520px"
            className="object-cover object-top"
            priority={priority}
          />
          {/* maximize hint */}
          <span className="absolute inset-0 flex items-center justify-center bg-background/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-content">
              <Maximize2 className="h-4 w-4" />
              {label}
            </span>
          </span>
        </div>
      </button>
    </figure>
  );
}

function Screws() {
  const dot = "absolute h-1.5 w-1.5 rounded-full border border-border bg-faint/30";
  return (
    <span aria-hidden>
      <span className={`${dot} left-1.5 top-1.5`} />
      <span className={`${dot} right-1.5 top-1.5`} />
      <span className={`${dot} bottom-1.5 left-1.5`} />
      <span className={`${dot} bottom-1.5 right-1.5`} />
    </span>
  );
}
