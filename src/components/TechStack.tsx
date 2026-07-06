import { Layers, Server, Database, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { techStack } from "@/lib/data";

const categoryIcon: Record<string, typeof Layers> = {
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
};

export function TechStack() {
  return (
    <Section id="tech">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools I build with"
        description="A pragmatic, full-stack toolkit chosen for shipping fast and scaling well."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.map((group, i) => {
          const Icon = categoryIcon[group.category] ?? Layers;
          return (
            <Reveal key={group.category} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/30">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-content">
                    {group.category}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-muted"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
