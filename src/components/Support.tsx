import { Coffee } from "lucide-react";
import { PhotoSwiper } from "@/components/ui/PhotoSwiper";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { mexo } from "@/lib/data";

const PHOTOS = [
  { src: "/me3.jpeg", alt: "Osayuki talking through a build with his laptop", pos: "62% 38%" },
  { src: "/desk.jpeg", alt: "Two laptops showing a system design diagram", pos: "50% 40%" },
  { src: "/yukipic.jpeg", alt: "Portrait of Osayuki Obazee", pos: "50% 30%" },
] as const;

const supportMetrics = mexo.metrics.filter((m) =>
  ["Players", "Teams Covered", "Leagues Covered"].includes(m.label)
);

export function Support() {
  return (
    <Section id="support" tone="ink" ariaLabelledby="support-title">
      <Reveal>
        <BigHeading id="support-title" text="Support My Journey" lines={["Support", "my journey"]} />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-center gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-16">
        {/* Photo swiper, same as About: three on ultra-wide screens, two on
            PCs and tablets, one on phones. (me2 is left out: its burned-in
            subtitle would show in these tall frames.) */}
        <PhotoSwiper photos={PHOTOS} label="Building in public" className="min-w-0" />

        <Reveal delay={0.06}>
          <p className="font-display text-[clamp(1.75rem,2.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            I build in public and share what I learn along the way.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            If any of it has been useful, a coffee helps fuel the next video, the next write-up and
            the next feature for MEXO.
          </p>
          <a
            href="https://www.buymeacoffee.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong"
          >
            <Coffee className="size-4" />
            Buy me a coffee
          </a>

          <p className="mt-12 text-xs font-bold uppercase tracking-[0.08em] text-muted">
            Currently building MEXO
          </p>
          <dl className="mt-4 grid grid-cols-3 border-t border-border-strong">
            {supportMetrics.map((m) => (
              <div
                key={m.label}
                className="border-r border-border-strong pt-4 pr-3 pl-3 first:pl-0 last:border-r-0"
              >
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-[clamp(1.6rem,3.4vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] tabular">
                  {m.value}
                </dd>
                <dd className="mt-2 text-xs leading-tight text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
