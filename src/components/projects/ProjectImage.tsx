import Image from "next/image";

/**
 * Renders a real screenshot when `src` is provided, otherwise a theme-aware
 * blueprint "mockup" placeholder. Swap in real screenshots by setting `src`
 * on the project / gallery data - no component changes needed.
 */
export function ProjectImage({
  src,
  name,
  label,
  priority,
  sizes,
  className = "",
}: {
  src?: string;
  name: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={label ? `${name} - ${label}` : name}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={`object-cover ${className}`}
      />
    );
  }
  return <Mockup name={name} label={label} />;
}

function Mockup({ name, label }: { name: string; label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-surface to-card">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-faint/50" />
        <span className="h-2 w-2 rounded-full bg-faint/50" />
        <span className="h-2 w-2 rounded-full bg-faint/50" />
        <span className="ml-2 h-2 w-20 rounded-full bg-border" />
      </div>

      {/* skeleton body */}
      <div className="flex flex-1 gap-3 p-4">
        <div className="hidden w-1/4 flex-col gap-2 sm:flex">
          <span className="h-2 w-full rounded bg-border" />
          <span className="h-2 w-4/5 rounded bg-border" />
          <span className="h-2 w-full rounded bg-border" />
          <span className="h-2 w-3/5 rounded bg-border" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <span className="h-3 w-1/2 rounded bg-border" />
          <div className="grid flex-1 grid-cols-2 gap-3">
            <span className="rounded-md border border-border bg-surface/60" />
            <span className="rounded-md border border-border bg-surface/60" />
            <span className="rounded-md border border-border bg-surface/60" />
            <span className="rounded-md border border-border bg-surface/60" />
          </div>
        </div>
      </div>

      {/* centered label */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
        <span className="font-display text-base font-bold tracking-[0.04em] text-content/90">
          {name}
        </span>
        {label && <span className="label-tech text-faint">{label}</span>}
      </div>

      {/* blueprint grid wash */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
    </div>
  );
}
