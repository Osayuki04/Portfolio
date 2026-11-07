"use client";

import { useLayoutEffect, useRef } from "react";

// Archivo Black at 72% width: roughly half an em per uppercase glyph. Only used
// for the server-rendered first paint; the effect below measures and corrects.
const GLYPH_RATIO = 0.52;

// `mx-auto` centres each line in its section.
const LINE_CLASS =
  "mx-auto block w-max max-w-none whitespace-nowrap font-display font-black uppercase leading-[0.8] tracking-[-0.015em] font-condensed";

/**
 * Section heading: condensed black capitals.
 *
 * From sm up, every section heading on the page is set at ONE shared size:
 * the largest size at which the widest heading still fits its section. With
 * all titles 16–18 characters long they each run nearly edge to edge.
 * On phones each line fills the width on its own (`lines` breaks long titles).
 * `fill` opts out of the shared size and stretches to the full width (the
 * footer's LET'S TALK).
 */
export function BigHeading({
  text,
  lines,
  fill = false,
  as: Tag = "h2",
  id,
  className = "",
}: {
  text: string;
  lines?: string[];
  fill?: boolean;
  as?: "h1" | "h2" | "p";
  id?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const fitToWidth = (line: HTMLElement, width: number) => {
      line.style.fontSize = "100px";
      const w = line.scrollWidth;
      return w > 0 ? (100 * width) / w : 0;
    };

    const fit = () => {
      const phone = !window.matchMedia("(min-width: 640px)").matches;

      // Phone lines and the full-width variant: each line fills its own box.
      el.querySelectorAll<HTMLElement>("[data-fit]").forEach((line) => {
        if (line.offsetParent === null) return;
        if (fill || phone) {
          const size = fitToWidth(line, el.clientWidth);
          if (size) line.style.fontSize = `${Math.floor(size) - 0.5}px`;
        }
      });
      if (fill || phone) return;

      // Shared size: measure every uniform heading on the page, take the
      // smallest fit, and apply it to all of them.
      const all = [...document.querySelectorAll<HTMLElement>("[data-uniform]")].filter(
        (l) => l.offsetParent !== null
      );
      let shared = Infinity;
      for (const line of all) {
        const box = line.closest<HTMLElement>("[data-heading-box]");
        if (!box) continue;
        const size = fitToWidth(line, box.clientWidth);
        if (size) shared = Math.min(shared, size);
      }
      if (shared === Infinity) return;
      for (const line of all) line.style.fontSize = `${Math.floor(shared) - 0.5}px`;
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, lines, fill]);

  const estimate = (s: string) => ({
    fontSize: `calc(100cqw / ${(s.length * GLYPH_RATIO).toFixed(2)})`,
  });

  return (
    <div
      ref={wrap}
      data-heading-box
      className={`w-full text-center [container-type:inline-size] ${className}`}
    >
      <Tag id={id} aria-label={text}>
        <span aria-hidden className={lines ? "hidden sm:block" : "block"}>
          <span
            data-fit
            data-uniform={fill ? undefined : ""}
            className={LINE_CLASS}
            style={estimate(text)}
          >
            {text}
          </span>
        </span>
        {lines && (
          <span aria-hidden className="block space-y-[0.06em] sm:hidden">
            {lines.map((line) => (
              <span key={line} data-fit className={LINE_CLASS} style={estimate(line)}>
                {line}
              </span>
            ))}
          </span>
        )}
      </Tag>
    </div>
  );
}
