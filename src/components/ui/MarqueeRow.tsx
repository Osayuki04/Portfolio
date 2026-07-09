/**
 * A pill strip that auto-scrolls continuously, like the hero tech strip.
 *
 * The items are repeated twice to guarantee the strip is wider than its card
 * (short lists would otherwise leave a visible gap mid-loop), then that whole
 * set is duplicated so `translateX(-50%)` loops seamlessly.
 *
 * `min-w-0 max-w-full` + `overflow-hidden` keep it from widening its ancestors.
 */
export function MarqueeRow({
  items,
  className = "",
  pillClass = "",
}: {
  items: readonly string[];
  className?: string;
  pillClass?: string;
}) {
  if (items.length === 0) return null;

  const widened = [...items, ...items];
  const row = [...widened, ...widened];

  return (
    <div className={`marquee-mask relative w-full min-w-0 max-w-full overflow-hidden py-1 ${className}`}>
      {/* Visible, animated strip. Duplicated content, so hide it from AT. */}
      <ul
        aria-hidden="true"
        className="flex w-max items-center gap-2 animate-marquee-pills hover:[animation-play-state:paused]"
      >
        {row.map((item, i) => (
          <li key={`${item}-${i}`} className={`shrink-0 whitespace-nowrap ${pillClass}`}>
            {item}
          </li>
        ))}
      </ul>

      {/* Real list for screen readers. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
