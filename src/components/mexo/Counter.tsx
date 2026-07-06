"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Splits a string like "5,000+" into numeric + prefix/suffix for counting up. */
function parse(value: string) {
  const match = value.match(/[\d,.]+/);
  if (!match) return { num: null as number | null, prefix: "", suffix: value };
  const raw = match[0];
  const num = parseFloat(raw.replace(/,/g, ""));
  const start = match.index ?? 0;
  return {
    num,
    prefix: value.slice(0, start),
    suffix: value.slice(start + raw.length),
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
  };
}

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { num, prefix, suffix, decimals = 0 } = parse(value);
  const [display, setDisplay] = useState(num === null ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView || num === null) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = num * eased;
      const formatted = current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, num, prefix, suffix, decimals]);

  return <span ref={ref}>{display}</span>;
}
