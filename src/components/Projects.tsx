"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/projects";
import { ProjectImage } from "@/components/projects/ProjectImage";
import { ProgressSegments, useAutoCycle } from "@/components/motion/useAutoCycle";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "web", label: "Web platforms" },
  { id: "game", label: "Game" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const isGame = (p: (typeof projects)[number]) => p.liveLabel === "Play Game";

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const trackRef = useRef<HTMLDivElement>(null);

  const shown = projects.filter((p) =>
    filter === "all" ? true : filter === "game" ? isGame(p) : !isGame(p)
  );

  // Auto-scroll: move to the next card every 4.5s; pauses on hover / focus /
  // off screen, and never runs for reduced-motion users.
  const { active, select, progress, bind } = useAutoCycle(shown.length, 4500);
  const activeRef = useRef(active);
  // While we scroll the track ourselves, ignore its scroll events.
  const programmatic = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Bring the active card to the start of the track.
  useEffect(() => {
    activeRef.current = active;
    const el = trackRef.current;
    const card = el?.children[active] as HTMLElement | undefined;
    if (!el || !card) return;
    programmatic.current = true;
    clearTimeout(settleTimer.current);
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: card.offsetLeft - pad, behavior: "smooth" });
    settleTimer.current = setTimeout(() => {
      programmatic.current = false;
    }, 700);
  }, [active]);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  // When the visitor swipes, follow them: the nearest card becomes active.
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || programmatic.current) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    let nearest = 0;
    let best = Infinity;
    [...el.children].forEach((child, i) => {
      const d = Math.abs((child as HTMLElement).offsetLeft - pad - el.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    if (nearest !== activeRef.current) select(nearest);
  }, [select]);

  return (
    <Section id="projects" tone="deep" ariaLabelledby="projects-title">
      <Reveal>
        <BigHeading id="projects-title" text="Products I shipped" lines={["Products", "I shipped"]} />
      </Reveal>

      <div {...bind}>
      <Reveal
        delay={0.05}
        className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border-strong pt-6 sm:mt-20"
      >
        <div
          role="group"
          aria-label="Filter projects"
          className="flex rounded-full border border-border-strong p-1"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => {
                // A new filter starts again from the first card.
                setFilter(f.id);
                select(0);
              }}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.04em] transition-colors duration-200 sm:px-5 ${
                filter === f.id ? "bg-content text-background" : "text-muted hover:text-content"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="hidden gap-2 sm:flex">
          <RoundButton label="Previous project" onClick={() => select(active - 1)}>
            <ArrowLeft className="size-4" />
          </RoundButton>
          <RoundButton label="Next project" onClick={() => select(active + 1)}>
            <ArrowRight className="size-4" />
          </RoundButton>
        </div>
      </Reveal>

      {/* `relative` keeps every card's positioned children inside this scroller,
          so nothing escapes to widen the page. */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar relative -mx-4 mt-10 flex snap-x snap-mandatory scroll-pl-4 items-stretch gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-pl-6 sm:gap-6 sm:px-6 lg:-mx-10 lg:scroll-pl-10 lg:px-10"
      >
        {/* Every card shares one width, so images and cards are all the same height. */}
        {shown.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-[85%] shrink-0 snap-start flex-col sm:w-[58%] lg:w-[44%]"
          >
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-card shadow-[0_24px_48px_-28px_rgba(10,13,11,0.45)]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 1024px) 85vw, 44vw"
                    className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  // No screenshot yet (Jerkspots): a placeholder until `image` is set.
                  <ProjectImage name={project.name} label="Screenshots coming soon" />
                )}
                {/* Dark overlay to calm the bright screenshots; eases off on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/20"
                />
                {project.status && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#3ccb7f] px-3 py-1.5 text-xs font-semibold text-[#03140b]">
                    {project.status}
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-faint tabular">
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-black uppercase leading-none tracking-[-0.02em] font-condensed sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.06em] text-muted">
                    {project.category}
                  </p>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong transition-colors duration-200 group-hover:border-content group-hover:bg-content group-hover:text-background">
                  <ArrowUpRight className="size-4" />
                  <span className="sr-only">Read the {project.name} case study</span>
                </span>
              </div>
            </Link>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted line-clamp-2">
              {project.summary}
            </p>
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent link-underline"
              >
                Visit live site
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </motion.article>
        ))}
      </div>

      {/* Pagination: one segment per project (the active one fills while it
          plays) and a counter. */}
      <div className="mt-8 flex items-center gap-4 text-accent">
        <ProgressSegments count={shown.length} active={active} progress={progress} />
        <span className="font-mono text-xs text-content tabular" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
        </span>
      </div>
      </div>
    </Section>
  );
}

function RoundButton({
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
      className="flex size-11 items-center justify-center rounded-full border border-border-strong text-content transition-colors duration-200 hover:border-content hover:bg-content hover:text-background"
    >
      {children}
    </button>
  );
}
