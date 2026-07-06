import type { ReactNode } from "react";

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-mexo/40 bg-mexo/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mexo">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mexo opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mexo" />
      </span>
      {label}
    </span>
  );
}
