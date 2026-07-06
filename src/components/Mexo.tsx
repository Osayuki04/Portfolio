import {
  ArrowUpRight,
  BookOpen,
  Rss,
  AlertTriangle,
  Lightbulb,
  Database,
  Workflow,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StatusPill } from "@/components/ui/Pill";
import { Counter } from "@/components/mexo/Counter";
import { mexo } from "@/lib/data";

export function Mexo() {
  return (
    <section
      id="mexo"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/30 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl container-px">
        {/* Header — case study cover */}
        <Reveal className="flex flex-col items-start gap-5">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <span className="label-tech text-faint">{"// 03 · case study"}</span>
            <StatusPill label={mexo.status} />
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-md border border-mexo/40 bg-mexo/10 font-display text-2xl font-bold text-mexo">
              M
            </span>
            <div>
              <h2 className="heading-tech text-3xl sm:text-4xl lg:text-5xl">MEXO</h2>
              <p className="label-tech mt-1 text-mexo">Football Platform</p>
            </div>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{mexo.overview}</p>
        </Reveal>

        {/* Problem / Solution */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          <Reveal className="bg-card/40 p-7">
            <div className="flex items-center gap-2 label-tech text-faint">
              <AlertTriangle className="h-4 w-4" />
              Problem
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{mexo.problem}</p>
          </Reveal>
          <Reveal delay={0.05} className="bg-card/40 p-7">
            <div className="flex items-center gap-2 label-tech text-mexo">
              <Lightbulb className="h-4 w-4" />
              Solution
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{mexo.solution}</p>
          </Reveal>
        </div>

        {/* System Design */}
        <Reveal className="mt-6 rounded-lg border border-border bg-card/40 p-7">
          <div className="flex items-center gap-2 label-tech text-faint">
            <Workflow className="h-4 w-4" />
            System Design
          </div>
          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {mexo.systemDesign.map((node, i) => (
              <div key={node.layer} className="flex flex-1 items-center gap-3 lg:flex-col lg:gap-4">
                <div className="w-full rounded-md border border-border bg-surface/50 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-content">
                    {node.layer}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-faint">{node.detail}</p>
                </div>
                {i < mexo.systemDesign.length - 1 && (
                  <ChevronRight className="h-4 w-4 shrink-0 rotate-90 text-mexo lg:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Content Pipeline + Database */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-lg border border-border bg-card/40 p-7">
            <div className="flex items-center gap-2 label-tech text-faint">
              <Workflow className="h-4 w-4" />
              Content Pipeline
            </div>
            <ol className="mt-6 space-y-px overflow-hidden rounded-md border border-border bg-border">
              {mexo.pipeline.map((stage, i) => (
                <li key={stage.step} className="flex items-start gap-4 bg-surface/40 p-4">
                  <span className="font-mono text-xs text-mexo">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.1em] text-content">
                      {stage.step}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-faint">{stage.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.05} className="rounded-lg border border-border bg-card/40 p-7">
            <div className="flex items-center gap-2 label-tech text-faint">
              <Database className="h-4 w-4" />
              Database Structure
            </div>
            <ul className="mt-6 space-y-2">
              {mexo.database.map((table) => (
                <li
                  key={table.name}
                  className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface/40 px-4 py-3"
                >
                  <span className="font-mono text-sm text-content">{table.name}</span>
                  <span className="font-mono text-[11px] text-faint">{table.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Growth Metrics */}
        <Reveal className="mt-6">
          <p className="label-tech mb-3 text-faint">Growth Metrics</p>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
            {mexo.metrics.map((metric) => (
              <div key={metric.label} className="bg-card/40 p-6">
                <div className="font-display text-3xl font-bold text-content sm:text-4xl">
                  <Counter value={metric.value} />
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Roadmap */}
        <Reveal className="mt-6 rounded-lg border border-border bg-card/40 p-7">
          <p className="label-tech text-faint">Roadmap</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {mexo.roadmap.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
              >
                <span className="h-1 w-1 rounded-full border border-faint" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* CTAs */}
        <Reveal className="mt-8 flex flex-wrap gap-3">
          <a
            href={mexo.ctas[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-content hover:border-content"
          >
            View Platform
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={mexo.ctas[1].href}
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-content transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <BookOpen className="h-4 w-4" />
            Read Case Study
          </a>
          <a
            href={mexo.ctas[2].href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-content transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <Rss className="h-4 w-4" />
            Follow Development
          </a>
        </Reveal>
      </div>
    </section>
  );
}
