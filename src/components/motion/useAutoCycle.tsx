"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Auto-advances through `count` items, one every `duration` ms.
 *
 * It only runs while the bound element is on screen and nobody is pointing at
 * it or using it with the keyboard, and never for reduced-motion users.
 * `progress` (0–1) drives a pagination bar; `select` jumps to an item and
 * restarts its timer. Spread `bind` onto the element that should pause it.
 */
export function useAutoCycle(count: number, duration = 6000) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });

  const playing = count > 1 && inView && !hovered && !focused && !reduce;

  const select = useCallback(
    (i: number) => {
      progressRef.current = 0;
      setProgress(0);
      setActive(((i % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      progressRef.current += (now - last) / duration;
      last = now;
      if (progressRef.current >= 1) {
        progressRef.current = 0;
        setActive((a) => (a + 1) % count);
      }
      setProgress(progressRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, duration, count]);

  const bind = {
    ref,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
  };

  // Keep the index valid if the item count shrinks (e.g. a filter).
  const current = active < count ? active : 0;

  return { active: current, select, progress: reduce ? 1 : progress, bind, reduce };
}

/** One segment per item; finished ones are full, the active one fills over time. */
export function ProgressSegments({
  count,
  active,
  progress,
  className = "",
}: {
  count: number;
  active: number;
  progress: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={`flex flex-1 gap-1.5 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-current/20">
          <span
            className="block h-full rounded-full bg-current"
            style={{ width: i < active ? "100%" : i === active ? `${progress * 100}%` : "0%" }}
          />
        </span>
      ))}
    </div>
  );
}
