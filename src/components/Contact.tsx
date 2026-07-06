import { Download, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/lib/data";
import { socialIcon } from "@/components/ui/SocialIcons";

const channels = [
  { key: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { key: "github", label: "GitHub", value: profile.socials.github.handle, href: profile.socials.github.url },
  { key: "linkedin", label: "LinkedIn", value: profile.socials.linkedin.handle, href: profile.socials.linkedin.url },
  { key: "x", label: "Twitter / X", value: profile.socials.x.handle, href: profile.socials.x.url },
  { key: "tiktok", label: "TikTok", value: profile.socials.tiktok.handle, href: profile.socials.tiktok.url },
  { key: "instagram", label: "Instagram", value: profile.socials.instagram.handle, href: profile.socials.instagram.url },
] as const;

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-accent/60" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Contact
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Let&apos;s build something <span className="text-highlight">together</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Open to opportunities, collaborations, and conversations about products, football, and
            building in public.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-content hover:border-content"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-content transition-colors hover:border-accent/50 hover:bg-accent/5"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </Reveal>

        {/* Terminal */}
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-lg border border-border bg-footer">
            <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-2 font-mono text-xs text-muted">osayuki@portfolio: ~/contact</span>
            </div>
            <div className="space-y-1 p-5 font-mono text-sm sm:p-6">
              <p className="text-muted">
                <span className="text-accent">$</span> connect --with osayuki
              </p>
              <p className="pb-2 text-muted/70">
                # resolving channels<span className="ml-1 animate-pulse text-accent">▋</span>
              </p>
              <ul className="divide-y divide-border">
                {channels.map((c) => {
                  const Icon = socialIcon[c.key as keyof typeof socialIcon];
                  return (
                    <li key={c.key}>
                      <a
                        href={c.href}
                        target={c.key === "email" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 py-2.5 transition-colors"
                      >
                        <span className="flex items-center gap-3 text-muted">
                          <Icon className="h-4 w-4 text-accent" />
                          {c.label}
                        </span>
                        <span className="truncate text-content transition-colors group-hover:text-accent">
                          {c.value}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
