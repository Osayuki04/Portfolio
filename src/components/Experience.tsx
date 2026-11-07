"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/lib/data";
import { MarqueeRow } from "@/components/ui/MarqueeRow";

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.16, 1, 0.3, 1] as const;
/** How long each role stays up before the panel moves on by itself. */
const DURATION = 6000;
const COUNT = experience.length;

export function Experience() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const baseId = useId();
  const reduce = useReducedMotion();
  const inView = useInView(panelRef, { amount: 0.3 });
  const item = experience[active];

  // Auto-advance runs only while the panel is on screen and nobody is using it.
  const playing = inView && !hovered && !focused && !reduce;

  const select = useCallback((i: number) => {
    progressRef.current = 0;
    setProgress(0);
    setActive(((i % COUNT) + COUNT) % COUNT);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      progressRef.current += (now - last) / DURATION;
      last = now;
      if (progressRef.current >= 1) {
        progressRef.current = 0;
        setActive((a) => (a + 1) % COUNT);
      }
      setProgress(progressRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = COUNT - 1;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <Section id="experience" tone="deep" ariaLabelledby="experience-title">
      <Reveal>
        <BigHeading
          id="experience-title"
          text="Where I've worked"
          lines={["Where", "I've worked"]}
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 sm:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-20">
        {/* Left: one rounded black panel holding the outline index, the role
            tabs and the pagination. `tone-ink` re-points the tokens, so
            inside it the selected row is green with dark text, the rest a
            faint green tint, and the outline stroke is light. */}
        <div
          ref={panelRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
          className="tone-ink self-start rounded-3xl p-5 sm:p-8"
        >
          <div aria-hidden className="relative h-[clamp(7rem,15vw,12rem)] overflow-hidden pl-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={reduce ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-y-0 left-1 right-0 block font-mono text-[clamp(7rem,15vw,12rem)] font-light leading-none tracking-[-0.06em] text-outline tabular"
                style={{ fontFeatureSettings: '"zero" 1' }}
              >
                {pad(active + 1)}
              </motion.span>
            </AnimatePresence>
          </div>

          <div role="tablist" aria-label="Roles" aria-orientation="vertical" className="mt-8 space-y-2">
            {/* Rounded rows: the selected role is solid, the rest a soft tint. */}
            {experience.map((role, i) => {
              const selected = i === active;
              return (
                <button
                  key={role.company}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-200 ${
                    selected ? "bg-accent text-on-accent" : "bg-accent/10 text-content hover:bg-accent/20"
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular ${selected ? "text-on-accent/70" : "text-faint"}`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="flex-1 text-base font-semibold">{role.company}</span>
                  <span
                    className={`hidden text-xs sm:inline ${selected ? "text-on-accent/75" : "text-muted"}`}
                  >
                    {role.period}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pagination: one segment per role (the active one fills while it
              plays), a counter, and previous / next. */}
          <div className="mt-6 flex items-center gap-4">
            <div aria-hidden className="flex flex-1 gap-1.5">
              {experience.map((role, i) => (
                <span key={role.company} className="h-1 flex-1 overflow-hidden rounded-full bg-accent/15">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{
                      width: i < active ? "100%" : i === active ? `${(reduce ? 1 : progress) * 100}%` : "0%",
                    }}
                  />
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-content tabular" aria-live="polite">
              {pad(active + 1)} / {pad(COUNT)}
            </span>
            <div className="flex gap-1.5">
              <PageButton label="Previous role" onClick={() => select(active - 1)}>
                <ChevronLeft className="size-4" />
              </PageButton>
              <PageButton label="Next role" onClick={() => select(active + 1)}>
                <ChevronRight className="size-4" />
              </PageButton>
            </div>
          </div>
        </div>

        {/* Right: the selected role, rows like the reference's service list. */}
        <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${active}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                  {item.role}
                </h3>
                {item.current && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-3 text-base text-content">
                {item.company}
                <span className="text-faint"> / {item.period}</span>
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{item.summary}</p>

              <ol className="mt-10 border-t border-border">
                {item.achievements.map((a, i) => (
                  <li
                    key={a}
                    className="flex items-start justify-between gap-6 border-b border-border py-3.5 text-sm leading-relaxed text-content"
                  >
                    <span className="max-w-[60ch]">{a}</span>
                    <span className="pt-0.5 font-mono text-xs text-faint tabular">{pad(i + 1)}</span>
                  </li>
                ))}
              </ol>

              <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.08em] text-content font-semiwide">
                Skills
              </h4>
              {/* Auto-scrolling pill strip running out to the right edge of the screen, blurred and faded
                  at both ends. Hovering pauses it. */}
              <MarqueeRow
                items={item.skills}
                edgeBlur
                className="mt-4 -mr-4 w-[calc(100%+1rem)] max-w-none sm:-mr-6 sm:w-[calc(100%+1.5rem)] lg:-mr-10 lg:w-[calc(100%+2.5rem)]"
                pillClass="rounded-full border border-border-strong px-4 py-2 text-xs font-semibold uppercase tracking-[0.04em] text-content"
              />
            </motion.div>
          </AnimatePresence>
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
      className="flex size-9 items-center justify-center rounded-full border border-border-strong text-content transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent"
    >
      {children}
    </button>
  );
}
