"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { socialIcon } from "@/components/ui/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const headerSocials = ["github", "linkedin", "x", "tiktok"] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`relative mx-auto flex max-w-full items-center justify-between bg-background/60 backdrop-blur-xl transition-all duration-500 ease-out ${
          scrolled
            ? "mt-3 h-14 w-[min(100%-1.5rem,62rem)] max-w-7xl rounded-full border border-border px-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)]"
            : "h-16 w-full rounded-none border-b border-border container-px"
        }`}
      >
        {/* prism-glass sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-accent/10 via-transparent to-mexo/10"
        />
        <div className="relative z-10 flex w-full items-center justify-between gap-4">
        <Link
          href="#hero"
          className="group flex items-center gap-2 font-display text-lg font-bold"
        >

          <span>
            Osayuki<span className="text-accent">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                    isActive ? "text-content" : "text-muted hover:text-content"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 lg:flex">
          <div className="flex items-center gap-0.5 pr-2">
            {headerSocials.map((key) => {
              const Icon = socialIcon[key];
              const social = profile.socials[key];
              return (
                <a
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-card hover:text-content"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
                  <ThemeToggle className="mr-1" />
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors hover:bg-content hover:border-content"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-content"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-muted hover:bg-card hover:text-content"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-3 px-3">
                {headerSocials.map((key) => {
                  const Icon = socialIcon[key];
                  const social = profile.socials[key];
                  return (
                    <a
                      key={key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-muted hover:text-content"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </li>
              <li className="mt-2">
                <a
                  href={profile.resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-accent bg-accent px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
