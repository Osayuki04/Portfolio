import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { techStack } from "@/lib/data";

export function TechStack() {
  return (
    <Section id="tech" tone="ink" ariaLabelledby="tech-title">
      <Reveal>
        <BigHeading id="tech-title" text="Tools I build with" lines={["Tools I", "build with"]} />
      </Reveal>

      <Reveal delay={0.04}>
        <p className="mt-14 max-w-2xl text-lg font-medium leading-snug sm:mt-20 sm:text-xl">
          The tools I actually reach for when I need to ship something, from the first commit to
          the deploy.
        </p>
      </Reveal>

      {/* One tall card per category, so the section is filled edge to edge. */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {techStack.map((group, i) => (
          <Reveal
            key={group.category}
            delay={0.06 + i * 0.05}
            className={`flex flex-col rounded-3xl p-5 sm:min-h-[15rem] sm:p-7 lg:min-h-[17rem] ${
              i === 0 ? "bg-accent text-on-accent" : "bg-card"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold uppercase tracking-[0.08em] font-semiwide">
                {group.category}
              </h3>
              <span className="font-mono text-xs opacity-60 tabular">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="mt-auto space-y-0.5 pt-6 sm:pt-8">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-display text-[clamp(1.05rem,1.9vw,1.75rem)] font-bold leading-[1.08] tracking-[-0.025em]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
