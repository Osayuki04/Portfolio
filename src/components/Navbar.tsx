"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // Lock page scroll behind the full-screen mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`border-b transition-colors duration-300 ${
          scrolled || open
            ? "border-border bg-background"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-[4.5rem] w-full items-center justify-between gap-6 container-px">
          {/* Wordmark: bar over a two-line stack, after the reference's "ART GALLERY". */}
          <Link href="#hero" className="group block" onClick={() => setOpen(false)}>
            <span className="block h-[3px] w-7 bg-accent transition-[width] duration-200 group-hover:w-10" />
            <span className="mt-1.5 block font-display text-[0.95rem] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] font-semiwide">
              Osayuki
              <br />
              Obazee
            </span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-2 text-sm transition-colors duration-200 ${
                      isActive ? "text-content" : "text-muted hover:text-content"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong sm:inline-flex"
            >
              <ArrowDownToLine className="size-4" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-medium text-content transition-colors hover:border-content lg:hidden"
            >
              <span className="relative block h-2.5 w-4" aria-hidden>
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                    open ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                    open ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-background lg:hidden"
          >
            <ul className="flex flex-col container-px pt-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-4xl font-extrabold uppercase tracking-[-0.02em] font-condensed"
                  >
                    {link.label}
                    <span className="font-mono text-xs font-normal text-faint tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 container-px py-8">
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-on-accent"
              >
                <ArrowDownToLine className="size-4" />
                Download resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-3.5 text-sm font-medium"
              >
                Email me
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
