import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StatusPill } from "@/components/ui/Pill";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built & shipped"
        description="From founding MEXO to building interfaces and mentoring the next wave of developers."
      />

      <ol className="mt-12 space-y-4">
        {experience.map((item, i) => (
          <Reveal as="li" key={item.company} delay={i * 0.05}>
            <div className="group relative grid gap-5 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/30 sm:grid-cols-[210px_1fr] sm:gap-8 sm:p-7">
              {/* meta column */}
              <div className="flex flex-col gap-2 sm:border-r sm:border-border sm:pr-6">
                {item.current ? (
                  <StatusPill label={item.period} />
                ) : (
                  <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {item.period}
                  </span>
                )}
                <span className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-faint">
                  {item.company}
                </span>
              </div>

              {/* detail column */}
              <div>
                <h3 className="text-lg font-semibold text-content">
                  {item.role} <span className="text-muted">— {item.company}</span>
                </h3>
                <p className="mt-1.5 text-sm text-muted">{item.summary}</p>

                <p className="label-tech mt-5 text-faint">Responsibilities &amp; Achievements</p>
                <ul className="mt-3 space-y-2">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <p className="label-tech mt-5 text-faint">Skills</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-content"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
