import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  // Solid cream control - the single key action
  primary:
    "border border-accent bg-accent text-background hover:bg-content hover:border-content font-semibold",
  // Outlined technical control
  secondary:
    "border border-border bg-transparent text-content hover:border-accent/50 hover:bg-accent/5",
  ghost: "border border-transparent text-muted hover:text-content",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      download={download}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
