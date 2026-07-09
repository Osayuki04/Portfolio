import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const photos = [
  { src: "/aboutpic1.jpeg", caption: "Osayuki04" },
  { src: "/aboutpic2.jpeg", caption: "@yuki.dev" },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* Text first in the DOM, so it reads before the photos on mobile. */}
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-accent/40" />
              <span className="label-tech text-accent">About</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="heading-tech mt-5 text-xl sm:text-3xl">
              About <span className="text-highlight">Me</span>
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              <p>
                I&apos;m <Strong>Osayuki Obazee</Strong>. Most people call me Yuki. I&apos;m a
                developer and founder, and I ship products end to end: frontend, backend, database,
                deploy.
              </p>
              <p>
                So far that&apos;s <Strong>MEXO</Strong>, a football platform,{" "}
                <Strong>Yibera</Strong>, a hospital management system, <Strong>AlphaBuild</Strong> for
                a construction business, and <Strong>EcoCycle</Strong>, a Unity game about recycling.
                I care less about clever code and more about whether the thing works, and keeps
                working.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="heading-tech text-xl sm:text-3xl">
                Why I Build in <span className="text-highlight">Public</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                I share what I&apos;m building while I&apos;m building it. The wins, the bugs, the
                calls I&apos;d make differently. It keeps me honest, and it saves the next person from
                the mistakes I already made.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Photos: after the text on mobile, right column on desktop. */}
        <Reveal delay={0.15} className="lg:col-start-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {photos.map((photo) => (
                <figure
                  key={photo.src}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={photo.src}
                      alt={`Osayuki Obazee, ${photo.caption}`}
                      fill
                      sizes="(max-width: 1024px) 45vw, 220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 border-t border-border bg-background/70 px-3 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-muted backdrop-blur-sm">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-content">{children}</strong>;
}
