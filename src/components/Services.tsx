"use client";

import { useId } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProgressSegments, useAutoCycle } from "@/components/motion/useAutoCycle";
import { capabilities } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

// One photo per service, cycled. (me2 is left out: its burned-in subtitle
// would show in this tall frame.)
const PHOTOS = [
  { src: "/desk.jpeg", pos: "50% 40%" },
  { src: "/me3.jpeg", pos: "62% 38%" },
  { src: "/me.jpeg", pos: "62% 22%" },
  { src: "/me4.jpeg", pos: "40% 30%" },
  { src: "/image.jpeg", pos: "45% 55%" },
  { src: "/yukipic.jpeg", pos: "50% 30%" },
] as const;

/*
  "How I can help you": the left half is a photo with the active service
  written over it; the right half lists every service. It moves on by itself
  every 6 seconds, with pagination to show it's a set of tabs.
*/
export function Services() {
  const COUNT = capabilities.length;
  const { active, select, progress, bind } = useAutoCycle(COUNT, 6000);
  const baseId = useId();
  const cap = capabilities[active];
  const photo = PHOTOS[active % PHOTOS.length];

  return (
    <Section id="services" tone="ink" ariaLabelledby="services-title">
      <Reveal>
        <BigHeading id="services-title" text="How I can help you" lines={["How I can", "help you"]} />
      </Reveal>

      <div {...bind} className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-10">
        {/* Left half: photo background with the active service over it. */}
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-card p-6 text-white sm:min-h-[36rem] sm:p-10 lg:min-h-0"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: photo.pos }}
              />
            </motion.div>
          </AnimatePresence>
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"
          />

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="font-mono text-sm text-[#3ccb7f] tabular">
                  {pad(active + 1)} / {pad(COUNT)}
                </p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                  {cap.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                  {cap.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="mt-8 flex items-center gap-4 text-[#3ccb7f]">
              <ProgressSegments count={COUNT} active={active} progress={progress} />
              <div className="flex gap-1.5">
                <PageButton label="Previous service" onClick={() => select(active - 1)}>
                  <ChevronLeft className="size-4" />
                </PageButton>
                <PageButton label="Next service" onClick={() => select(active + 1)}>
                  <ChevronRight className="size-4" />
                </PageButton>
              </div>
            </div>
          </div>
        </div>

        {/* Right half: every service; the active one is filled green. */}
        <div role="tablist" aria-label="Services" aria-orientation="vertical" className="space-y-2">
          {capabilities.map((c, i) => {
            const selected = i === active;
            const fill = selected
              ? "border-accent bg-accent text-on-accent"
              : "border-border-strong text-content group-hover:border-content";
            return (
              <button
                key={c.title}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                onClick={() => select(i)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-1.5 text-left sm:gap-2"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-full border font-mono text-sm tabular transition-colors duration-200 sm:size-14 ${fill}`}
                >
                  {i + 1}
                </span>
                <span
                  className={`flex h-12 items-center rounded-full border px-5 text-sm font-bold uppercase tracking-[0.02em] transition-colors duration-200 font-semiwide sm:h-14 sm:px-7 ${fill}`}
                >
                  {c.title}
                </span>
                <span
                  className={`flex size-12 items-center justify-center rounded-full border transition-colors duration-200 sm:size-14 ${fill}`}
                >
                  <ArrowRight
                    className={`size-4 transition-transform duration-200 ${selected ? "" : "-rotate-45"}`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function PageButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-200 hover:border-[#3ccb7f] hover:bg-[#3ccb7f] hover:text-[#03140b]"
    >
      {children}
    </button>
  );
}
