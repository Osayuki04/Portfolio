import { Coffee, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StatusPill } from "@/components/ui/Pill";
import { Counter } from "@/components/mexo/Counter";
import { mexo } from "@/lib/data";

const supportMetrics = [
  mexo.metrics.find((m) => m.label === "Teams Covered")!,
  mexo.metrics.find((m) => m.label === "Competitions Covered")!,
  mexo.metrics.find((m) => m.label === "Articles Processed")!,
];

export function Support() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl container-px">
        <div className="corner-ticks grid gap-8 rounded-lg border border-border bg-card/40 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:p-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-mexo/40 bg-mexo/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-mexo">
              <Zap className="h-3.5 w-3.5" />
              Building In Public
            </div>
            <h2 className="heading-tech mt-5 text-3xl sm:text-4xl">
              Support My <span className="text-highlight">Journey</span> <span className="align-middle">☕</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m building MEXO in public and sharing the journey. If you like what I do, consider supporting me to fuel my next idea.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://www.buymeacoffee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-content hover:border-content"
              >
                <Coffee className="h-4 w-4" />
                Buy Me A Coffee
              </a>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                Fuel my next Idea
              </span>
            </div>
          </Reveal>

          {/* Support card */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">Current Project</p>
                  <p className="mt-1 font-display text-xl font-bold text-content">MEXO</p>
                </div>
                <StatusPill label={mexo.status} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {supportMetrics.map((metric) => (
                  <div key={metric.label} className="min-w-0 bg-card/70 p-2.5 text-center sm:p-4">
                    <div className="font-display text-sm font-bold text-content sm:text-2xl">
                      <Counter value={metric.value} />
                    </div>
                    <div className="mt-1 text-[10px] leading-tight text-muted sm:text-[11px]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
