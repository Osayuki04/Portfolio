import Link from "next/link";
import { Coffee, FileText } from "lucide-react";
import { profile } from "@/lib/data";
import { socialIcon } from "@/components/ui/SocialIcons";

const footerLinks = [
  { key: "github", ...profile.socials.github },
  { key: "linkedin", ...profile.socials.linkedin },
  { key: "x", ...profile.socials.x },
  { key: "tiktok", ...profile.socials.tiktok },
  { key: "instagram", ...profile.socials.instagram },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer">
      <div className="mx-auto w-full max-w-6xl container-px py-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div>
            <Link href="#hero" className="flex items-center gap-2 font-display text-xl font-bold">
              Osayuki<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Full Stack Developer building MEXO. Shipping products and sharing the journey publicly.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {footerLinks.map((item) => {
                const Icon = socialIcon[item.key];
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content"
              >
                <socialIcon.email className="h-[18px] w-[18px]" />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content"
              >
                <FileText className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href="https://www.buymeacoffee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-content hover:border-content"
            >
              <Coffee className="h-4 w-4" />
              Buy Me A Coffee
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              Support My Journey
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>© 2026 Osayuki</p>
          <p className="font-mono text-xs">Designed & Built By Osayuki</p>
        </div>
      </div>
    </footer>
  );
}
