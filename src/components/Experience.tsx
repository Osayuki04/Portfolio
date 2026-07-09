import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { StatusPill } from "@/components/ui/Pill";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built & shipped"
        description="Founding my own products, building interfaces for clients, and teaching people to code."
      />

      <ol className="mt-12 space-y-4">
        {experience.map((item, i) => (
          <Reveal as="li" key={item.company} delay={i * 0.05}>
            <div className="group relative grid gap-5 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/30 sm:grid-cols-[210px_1fr] sm:gap-8 sm:p-7">
              {/* meta column: only the current role gets a badge */}
              <div className="flex flex-col gap-2 sm:border-r sm:border-border sm:pr-6">
                {item.current && <StatusPill label={item.period} />}
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-faint">
                  {item.company}
                </span>
              </div>

              {/* detail column (min-w-0 lets the skills strip scroll instead of widening the page) */}
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-content">
                  {item.role} <span className="text-muted">- {item.company}</span>
                </h3>
                <p className="mt-1.5 text-sm text-muted">{item.summary}</p>

                <p className="label-tech mt-5 text-faint">Highlights</p>
                <ul className="mt-3 space-y-2">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <p className="label-tech mt-5 text-faint">Skills</p>
                <MarqueeRow
                  items={item.skills}
                  className="mt-3"
                  pillClass="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-content"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
