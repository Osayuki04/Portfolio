import type { ReactNode } from "react";

/**
 * A row of pills/tags that never wraps. It scrolls sideways instead, like the
 * hero tech strip.
 *
 * `min-w-0 max-w-full` is load-bearing: without it, a flex/grid ancestor keeps
 * its `min-width: auto` and refuses to shrink below this row's full width,
 * which pushes the whole page wide and creates a horizontal scrollbar.
 *
 * Children must not shrink, so give each one `scrollItem`.
 */
export function ScrollRow({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  return (
    <Tag
      className={`no-scrollbar flex w-full min-w-0 max-w-full snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto pb-1 ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Utility classes every ScrollRow child needs so it never squashes. */
export const scrollItem = "shrink-0 snap-start whitespace-nowrap";
