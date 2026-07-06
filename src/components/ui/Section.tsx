import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 sm:py-28 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl container-px">{children}</div>
    </section>
  );
}

// Emphasize the last word of a heading with the highlight color.
function highlightLastWord(title: string): ReactNode {
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? title;
  const lead = words.join(" ");
  return (
    <>
      {lead && `${lead} `}
      <span className="text-highlight">{last}</span>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && (
          <span className="font-mono text-[11px] tracking-[0.12em] text-faint">
            {index}
          </span>
        )}
        <span className="h-px w-6 bg-accent/40" />
        <span className="label-tech text-accent">{eyebrow}</span>
      </div>
      <h2 className="heading-tech mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.6rem]">
        {highlightLastWord(title)}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
