import Image from "next/image";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/lib/data";
import { socialIcon } from "@/components/ui/SocialIcons";

const channels = [
  { key: "github", label: "GitHub", value: profile.socials.github.handle, href: profile.socials.github.url },
  { key: "linkedin", label: "LinkedIn", value: profile.socials.linkedin.handle, href: profile.socials.linkedin.url },
  { key: "x", label: "X", value: profile.socials.x.handle, href: profile.socials.x.url },
  { key: "tiktok", label: "TikTok", value: profile.socials.tiktok.handle, href: profile.socials.tiktok.url },
  { key: "instagram", label: "Instagram", value: profile.socials.instagram.handle, href: profile.socials.instagram.url },
] as const;

export function Contact() {
  return (
    <Section id="contact" tone="deep" ariaLabelledby="contact-title">
      <Reveal>
        <BigHeading id="contact-title" text="Get in touch today" lines={["Get in touch", "today"]} />
      </Reveal>

      {/* Three equal columns, all the same height: photo, black text card,
          channel list. */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 lg:grid-cols-3 lg:gap-5">
        {/* Photo card. */}
        <Reveal className="relative min-h-[24rem] overflow-hidden rounded-3xl bg-card">
          <Image
            src="/me.jpeg"
            alt="Osayuki at Birmingham Tech Week"
            fill
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="object-cover object-[62%_22%]"
          />
        </Reveal>

        {/* Text card on black. */}
        <Reveal
          delay={0.04}
          className="tone-ink flex min-w-0 flex-col justify-center rounded-3xl p-7 sm:p-10"
        >
          <p className="font-display text-[clamp(2rem,3vw,3rem)] font-bold leading-[1] tracking-[-0.04em]">
            Have a role in mind?
            <br />
            <span className="text-accent">Let&apos;s build it.</span>
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Open to full-time roles, collaborations, and good conversations about products or
            football.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex max-w-full items-center gap-3 break-all font-display text-[clamp(1.25rem,1.8vw,1.85rem)] font-medium tracking-[-0.02em] link-underline"
          >
            {profile.email}
            <ArrowUpRight className="size-6 shrink-0 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="mt-10">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-3.5 text-sm font-semibold text-background transition-colors duration-200 hover:bg-accent hover:text-on-accent"
            >
              <ArrowDownToLine className="size-4" />
              Download resume
            </a>
          </div>
        </Reveal>

        {/* Channel list: a black box in a green frame. `tone-ink` keeps
            the text light on black whatever the section's colour is. */}
        <Reveal delay={0.08} className="flex min-w-0 rounded-3xl bg-accent p-3 sm:p-4">
          <ul className="tone-ink flex w-full flex-col justify-center rounded-2xl px-5 sm:px-6">
            {channels.map((c) => {
              const Icon = socialIcon[c.key];
              return (
                <li key={c.key}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border-b border-border py-5 transition-colors duration-200 last:border-b-0 hover:text-accent"
                  >
                    <Icon className="size-5 shrink-0" />
                    <span className="flex-1 text-base font-semibold">{c.label}</span>
                    <span className="truncate text-sm text-muted transition-colors group-hover:text-accent">
                      {c.value}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
