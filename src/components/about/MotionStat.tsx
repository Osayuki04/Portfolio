"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export function MotionStat({
  children,
  variants,
}: {
  children: ReactNode;
  variants: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className="rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-accent/30 hover:bg-card"
    >
      {children}
    </motion.div>
  );
}
