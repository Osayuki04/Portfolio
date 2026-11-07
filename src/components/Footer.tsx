import { BigHeading } from "@/components/ui/BigHeading";
import { profile } from "@/lib/data";

// Scattered names above the headline, after the reference's footer.
const scattered = [
  { label: "GitHub", href: profile.socials.github.url, pos: "col-start-4 row-start-1" },
  { label: "LinkedIn", href: profile.socials.linkedin.url, pos: "col-start-7 row-start-1" },
  { label: "TikTok", href: profile.socials.tiktok.url, pos: "col-start-11 row-start-1 justify-self-end" },
  { label: "Instagram", href: profile.socials.instagram.url, pos: "col-start-1 row-start-2" },
  { label: "X / Twitter", href: profile.socials.x.url, pos: "col-start-6 row-start-2" },
  { label: "Resume", href: profile.resumeUrl, pos: "col-start-9 row-start-2" },
] as const;

const pills = [
  { label: "GitHub", href: profile.socials.github.url },
  { label: "LinkedIn", href: profile.socials.linkedin.url },
  { label: "X", href: profile.socials.x.url },
] as const;

export function Footer() {
  return (
    <footer className="tone-deep relative -mt-10 flex min-h-dvh flex-col rounded-t-[2rem] sm:-mt-12 sm:rounded-t-[3rem]">
      <div className="flex w-full flex-1 flex-col justify-between container-px pt-20 pb-8 sm:pt-28">
        {/* Scattered outline pills; each fills green on hover. */}
        <nav aria-label="Social" className="hidden grid-cols-12 items-center gap-y-6 sm:grid">
          {scattered.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.pos} col-span-2 w-max whitespace-nowrap rounded-full border border-border-strong px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-content transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-on-accent`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="my-16">
          <BigHeading as="p" text="Let's talk" fill />
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {pills.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-content px-5 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-background transition-colors duration-200 hover:bg-accent hover:text-on-accent"
              >
                {p.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-accent transition-colors duration-200 hover:bg-accent hover:text-on-accent"
            >
              Email me
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Osayuki Obazee</p>
          <p>Designed &amp; built by Osayuki</p>
        </div>
      </div>
    </footer>
  );
}
