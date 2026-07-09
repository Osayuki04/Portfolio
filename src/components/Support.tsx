import { Coffee } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
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
            <h2 className="heading-tech text-2xl sm:text-4xl">
              Support My <span className="text-highlight">Journey</span> <span className="align-middle">☕</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              I build in public and share what I learn along the way. If any of it has been useful, a coffee helps fuel the next one.
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
              {/* Stack on phones so "Current Project" never squeezes against the pill. */}
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-xs uppercase tracking-[0.12em] text-muted sm:tracking-[0.16em]">
                    Current Project
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-content">MEXO</p>
                </div>
              </div>
              {/* Stacked rows on phones (3 columns squeezes these numbers), 3 up from sm. */}
              <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                {supportMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex min-w-0 items-baseline justify-between gap-3 bg-card/70 px-4 py-3 sm:block sm:p-4 sm:text-center"
                  >
                    <div className="shrink-0 font-display text-base font-bold text-content sm:text-xl">
                      <Counter value={metric.value} />
                    </div>
                    <div className="min-w-0 text-right text-xs leading-tight text-muted sm:mt-1 sm:text-center sm:text-[11px]">
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
