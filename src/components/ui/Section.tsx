import type { ReactNode } from "react";

/** Three colours only: black and two greens. */
export type Tone = "ink" | "deep" | "green";

/**
 * A full-width panel. Every panel after the hero rides up over the one before
 * it with rounded top corners, so the colour changes read as layers. All
 * panels share one minimum height (the height of the Projects section) so the
 * page keeps an even rhythm.
 */
export function Section({
  id,
  tone,
  children,
  className = "",
  innerClassName = "",
  ariaLabelledby,
}: {
  id: string;
  tone: Tone;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`tone-${tone} relative -mt-10 flex min-h-dvh scroll-mt-16 flex-col rounded-t-[2rem] pt-24 pb-34 sm:-mt-12 sm:rounded-t-[3rem] sm:pt-28 sm:pb-40 lg:min-h-[max(100dvh,72rem)] ${className}`}
    >
      {/* Heading and content stay together as one block, centred in the
          panel. The extra bottom padding covers the next panel's overlap. */}
      <div
        className={`relative flex w-full flex-1 flex-col justify-center container-px ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
