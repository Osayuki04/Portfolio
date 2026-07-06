"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Gamepad2, Maximize2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StatusPill } from "@/components/ui/Pill";
import { ProjectImage } from "@/components/projects/ProjectImage";
import { Lightbox } from "@/components/projects/Lightbox";
import { projects } from "@/lib/projects";

const lightboxImages = projects
  .filter((p) => p.image)
  .map((p) => ({ src: p.image as string, label: `${p.name} — ${p.subtitle}` }));

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Products I've built"
        description="A mix of platforms, tools, and games — each shipped end to end. Open a case study to see how it was built, or maximize a screenshot to take a closer look."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => {
          const isGame = project.liveLabel === "Play Game";
          const imgIndex = lightboxImages.findIndex((im) => im.src === project.image);
          return (
            <Reveal key={project.slug} delay={i * 0.06}>
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  project.flagship
                    ? "border-mexo/30 bg-card/50 sm:col-span-2"
                    : "border-border bg-card/40 hover:border-accent/40"
                }`}
              >
                {/* preview image — click to maximize */}
                <button
                  type="button"
                  onClick={() => imgIndex >= 0 && setOpenIndex(imgIndex)}
                  aria-label={`Maximize ${project.name} screenshot`}
                  className={`relative block w-full overflow-hidden border-b border-border ${
                    project.flagship ? "aspect-[16/9]" : "aspect-[16/10]"
                  }`}
                >
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                    <ProjectImage
                      src={project.image}
                      name={project.name}
                      label={project.subtitle}
                      sizes={project.flagship ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    />
                  </div>
                  {project.status && (
                    <span className="absolute left-3 top-3 z-10">
                      <StatusPill label={project.status} />
                    </span>
                  )}
                  {/* maximize hint */}
                  <span className="absolute inset-0 z-10 flex items-center justify-center bg-background/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-content">
                      <Maximize2 className="h-4 w-4" />
                      Maximize
                    </span>
                  </span>
                </button>

                {/* info */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-content sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                    {project.liveUrl === "#" ? (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        title="Coming soon"
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-mexo/30 bg-mexo/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-mexo/50"
                      >
                        {isGame ? <Gamepad2 className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        {project.liveLabel}
                      </button>
                    ) : (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors hover:bg-content hover:border-content"
                      >
                        {isGame ? <Gamepad2 className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        {project.liveLabel}
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-content transition-colors hover:border-accent/50 hover:bg-accent/5"
                    >
                      <BookOpen className="h-4 w-4" />
                      Read Case Study
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Lightbox images={lightboxImages} index={openIndex} setIndex={setOpenIndex} />
    </Section>
  );
}
