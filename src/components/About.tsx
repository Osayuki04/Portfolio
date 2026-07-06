import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const polaroids = [
  { src: "/aboutpic1.jpeg", caption: "Osayuki04", rotate: "-rotate-6", position: "left-0 top-2 z-10" },
  { src: "/aboutpic2.jpeg", caption: "@yuki.dev", rotate: "rotate-6", position: "right-0 top-12 z-20" },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* Polaroids — first on mobile, right column on desktop */}
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <div className="relative mx-auto h-[340px] w-full max-w-sm sm:h-[380px]">
              {polaroids.map((p) => (
                <div
                  key={p.src}
                  className={`group absolute w-40 rounded-sm bg-white p-2.5 pb-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.04] sm:w-48 ${p.rotate} ${p.position}`}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={p.src}
                      alt={p.caption}
                      fill
                      sizes="(max-width: 640px) 160px, 192px"
                      className="object-cover"
                    />
                  </div>
                  <p className="py-2 text-center font-sans text-sm text-neutral-700">{p.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-accent/40" />
              <span className="label-tech text-accent">About</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="heading-tech mt-5 text-2xl sm:text-3xl">
              About <span className="text-highlight">Me</span>
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              <p>
                I&apos;m <Strong>Osayuki Obazee (Yuki)</Strong>, a software developer and founder passionate about
                building digital products that solve real-world problems. My focus is on creating
                scalable applications with intuitive user experiences, combining strong technical
                foundations with thoughtful product design. I enjoy turning ideas into products that
                people can actually use, whether that&apos;s in sports, healthcare, education, business,
                or gaming.
              </p>
              <p>
                Over the years, I&apos;ve worked across frontend development, backend systems, database
                architecture, automation, and product development. I&apos;ve built and contributed to
                projects ranging from <Strong>MEXO</Strong>, a football technology platform that
                aggregates and structures football content, to <Strong>Yibera</Strong>, a hospital
                management system, <Strong>AlphaBuild</Strong>, a construction business platform, and{" "}
                <Strong>EcoCycle</Strong>, an educational Unity game promoting environmental awareness.
                My approach goes beyond writing code—I&apos;m interested in understanding user problems,
                designing effective solutions, and building systems that can scale as products grow.
              </p>
              <p>
                As a self-driven developer, I&apos;ve continuously expanded my skills through building
                projects, experimenting with new technologies, and solving practical challenges. I enjoy
                working with modern web technologies such as React, Next.js, PHP, MySQL, and Tailwind
                CSS, while also exploring game development and automation systems. Whether I&apos;m
                designing databases, developing APIs, or crafting user interfaces, I aim to build
                products that are reliable, maintainable, and impactful.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="heading-tech text-2xl sm:text-3xl">
                Why I Create Content &amp; Build in <span className="text-highlight">Public</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                I create content because I believe learning becomes more valuable when it&apos;s shared.
                As I continue my journey as a developer and founder, I document what I&apos;m learning,
                the challenges I face, and the lessons I discover while building products. Through my
                content, I aim to help other aspiring developers navigate their own paths, avoid common
                mistakes, and stay motivated during the difficult stages of learning. Building a personal
                brand allows me to connect with like-minded people, share my experiences openly, and
                create opportunities that extend beyond code. It&apos;s not just about growing an
                audience—it&apos;s about building a community around continuous learning, creativity, and
                the process of turning ideas into reality.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-content">{children}</strong>;
}
