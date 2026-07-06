"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type State = { mounted: boolean; light: boolean };

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Starts as dark/unmounted so server and first client render match; the
  // pre-paint script in <head> has already applied the real theme class.
  const [{ mounted, light }, setState] = useState<State>({
    mounted: false,
    light: false,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync UI to the theme set before paint
    setState({
      mounted: true,
      light: document.documentElement.classList.contains("light"),
    });
  }, []);

  const toggle = () => {
    const next = !light;
    setState({ mounted: true, light: next });
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content ${className}`}
    >
      {mounted && light ? (
        <Moon className="h-[18px] w-[18px]" />
      ) : (
        <Sun className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
