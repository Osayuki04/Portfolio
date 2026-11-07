import { PhotoSwiper } from "@/components/ui/PhotoSwiper";
import { ArrowDownToLine } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/lib/data";

/*
  About: a photo swiper on the left; every line of text sits on the
  right, ending in a single resume link.
*/
export function About() {
  return (
    <Section id="about" tone="ink" ariaLabelledby="about-title">
      <Reveal>
        <BigHeading id="about-title" text="A bit about myself" lines={["A bit about", "myself"]} />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-center gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-16">
        {/* Left: photo swiper. Three side by side on ultra-wide screens, two
            on PCs and tablets, one on phones; swipe or use the arrows. */}
        <PhotoSwiper photos={STRIP} label="Photos of Osayuki" className="min-w-0" />

        <Reveal delay={0.08} className="flex flex-col justify-center">
          <p className="font-display text-[clamp(1.75rem,2.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            <span className="text-accent">
              I&apos;m a software engineer who builds complete products,
            </span>{" "}
            from frontend and backend to databases and deployment. I turn ideas into reliable software that solves real-world problems.

          </p>
          <p className="font-display text-[clamp(1.75rem,2.6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] mt-4" >

          I&apos;ve shipped products across football, healthcare, construction and automation. Currently studying Computer Science at the University of Wolverhampton, I share my builds, challenges and lessons publicly.
          </p>

         

          <div className="mt-10">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong"
            >
              <ArrowDownToLine className="size-4" />
              Download resume
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const STRIP = [
  { src: "/image.jpeg", alt: "Osayuki's Connect X Ignite attendee badge", pos: "45% 55%" },
  { src: "/me4.jpeg", alt: "Osayuki speaking on stage at Connect X Ignite", pos: "40% 30%" },
  { src: "/me.jpeg", alt: "Osayuki at Birmingham Tech Week", pos: "62% 22%" },
] as const;
