"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { ArchitectureDiagram } from "@/components/hero/ArchitectureDiagram";
import { ProductMarquee } from "@/components/hero/ProductMarquee";
import { heroTechPills, profile } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Parallax the decorative layers as the hero scrolls out of view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const diagramY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-10"
    >
      <div className="absolute inset-0 -z-10 grid-bg radial-fade opacity-70" />
      <motion.div style={{ y: glowY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </motion.div>

      {/* Architecture diagram - faint background decoration beside the text */}
      <motion.div
        aria-hidden
        style={{ y: diagramY }}
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      >
        <div
          className="absolute right-[-3%] top-1/2 w-[44%] max-w-2xl -translate-y-1/2"
          style={{ opacity: 0.07 }}
        >
          <ArchitectureDiagram />
        </div>
      </motion.div>

      <div className="mx-auto w-full max-w-6xl items-center container-px">
        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative aspect-square w-full max-w-[140px] overflow-hidden rounded-full border border-border/50 bg-card/50">
            <Image
              fill
              src={profile.avatarUrl}
              priority
              alt="Osayuki Obazee - Full Stack Developer & Founder of MEXO"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Messaging */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities &amp; collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-xl font-bold leading-[1.1] sm:text-3xl lg:text-4xl"
          >
            <span className="text-gradient">Hey, I&apos;m Osayuki Obazee </span>
            <br />
            <span className="text-highlight">Software Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-lg text-lg leading-snug text-muted"
          >
            I turn ideas into working products, then I share exactly how I built them.
          </motion.p>

          {/* Tech stack - single-line continuous auto-scroll (no wrap on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="marquee-mask relative mt-7 w-full overflow-hidden py-1"
          >
            <ul className="flex w-max items-center gap-2 animate-marquee-pills">
              {[...heroTechPills, ...heroTechPills].map((pill, i) => (
                <li
                  key={`${pill}-${i}`}
                  className="shrink-0 whitespace-nowrap rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted"
                >
                  {pill}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-content"
            >
              Contact Me
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-content transition-colors hover:border-accent/40 hover:bg-card"
            >
              <FolderGit2 className="h-4 w-4" />
              View Projects
            </a>
          </motion.div>
        </div>
      </div>

      {/* Full-width product showcase marquee */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="mt-4 w-full sm:mt-8"
      >
        <ProductMarquee />
      </motion.div>
    </section>
  );
}
