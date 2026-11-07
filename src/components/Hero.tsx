"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { profile } from "@/lib/data";

/*
  The bust: a stepped mosaic on a 6 x 7 grid of square cells. The portrait is
  the head; the crown, shoulders and torso are screenshots of shipped work.
*/
const AREAS = [
  ". . a a b .",
  ". c p p p .",
  ". c p p p .",
  ". d p p p k",
  "e e f f g h",
  "e e f f g h",
  "i i i j j h",
]
  .map((row) => `"${row}"`)
  .join(" ");

type Tile = {
  area: string;
  src?: string;
  pos?: string;
  /** scroll drift, in px over the hero's height */
  drift: number;
  /** entrance order */
  order: number;
};

const TILES: Tile[] = [
  { area: "a", src: "/mexo1.jpeg", pos: "18% 30%", drift: -70, order: 3 },
  { area: "b", drift: -95, order: 4 },
  { area: "c", src: "/me.jpeg", pos: "62% 28%", drift: -40, order: 2 },
  { area: "d", src: "/image.jpeg", pos: "45% 55%", drift: -25, order: 2 },
  { area: "k", src: "/game1.jpeg", pos: "40% 50%", drift: 30, order: 3 },
  { area: "e", src: "/mexo2.jpeg", pos: "60% 40%", drift: 20, order: 4 },
  // me2 has a burned-in caption low in the frame; the square crop from the top hides it.
  { area: "f", src: "/me2.jpeg", pos: "50% 0%", drift: 35, order: 1 },
  { area: "g", src: "/yibera/mainyiberaimage.png", pos: "35% 30%", drift: 50, order: 3 },
  { area: "h", src: "/me4.jpeg", pos: "38% 50%", drift: 70, order: 5 },
  { area: "i", src: "/alphabuild1.jpeg", pos: "20% 30%", drift: 45, order: 5 },
  { area: "j", src: "/yibera/heroyibera2.png", pos: "50% 25%", drift: 60, order: 6 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <section
      ref={ref}
      id="hero"
      className="tone-ink relative flex min-h-dvh flex-col overflow-hidden pt-24 pb-20 lg:pb-24"
    >
      {/*
        Phones: quote, role + actions, then the bust last (all centred).
        lg: bust on the left; quote above name on the right.
        xl: quote | bust | name, after the reference.
      */}
      <div className="grid w-full flex-1 items-center gap-10 container-px lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-10 xl:grid-cols-[0.85fr_auto_1.15fr] xl:gap-10">
        {/* Name + action. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="order-2 -mt-6 text-center lg:mt-0 lg:order-none lg:col-start-2 lg:row-start-2 lg:self-start lg:text-left xl:col-start-3 xl:row-start-1 xl:self-center xl:pl-2"
        >
          {/* On phones the logo already shows the name, so the heading is for
              screen readers and search only; it appears from lg up. */}
          <h1 className="sr-only font-display text-[clamp(2.75rem,13vw,3.5rem)] lg:not-sr-only font-extrabold xl:text-[clamp(3rem,4.4vw,4.25rem)] leading-[0.92] tracking-[-0.03em]">
            <span className="block">Osayuki</span>
            <span className="block">Obazee</span>
          </h1>
          <span className="mt-5 hidden h-[5px] w-36 bg-accent lg:block" />

          <p className="lg:mt-9">
            <span className="inline-block whitespace-nowrap bg-accent px-2.5 pt-2 pb-1.5 font-display text-[clamp(1.5rem,8vw,2rem)] font-black xl:text-[clamp(1.75rem,2.25vw,2.75rem)] uppercase leading-none tracking-[-0.01em] text-on-accent font-condensed">
              Software Engineer
            </span>
          </p>

          {/* Desktop only: phones go straight from the role to the actions. */}
          <p className="mt-8 hidden max-w-xs text-base leading-relaxed text-muted lg:block">
            Full stack developer and founder of MEXO. I build whole products, front to back.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:mt-8 lg:justify-start">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong"
            >
              <ArrowDownToLine className="size-4" />
              Download resume
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-content"
            >
              See the work
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* The bust */}
        <div className="order-3 flex justify-center lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 xl:col-start-2 xl:row-span-1">
          <div
            className="grid w-[min(100%,40rem)] gap-1.5 sm:gap-2 lg:w-[min(44rem,calc((100dvh_-_8rem)*6/7),50vw)] xl:w-[min(44rem,calc((100dvh_-_8rem)*6/7),43vw)]"
            style={{
              gridTemplateAreas: AREAS,
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gridTemplateRows: "repeat(7, minmax(0, 1fr))",
              aspectRatio: "6 / 7",
            }}
          >
            {TILES.map((tile) => (
              <MosaicTile key={tile.area} tile={tile} progress={scrollYProgress} reduce={!!reduce} />
            ))}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative overflow-hidden bg-deep"
              style={{ gridArea: "p" }}
            >
              <Image
                src={profile.avatarUrl}
                alt="Portrait of Osayuki Obazee"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover object-[50%_35%]"
              />
            </motion.div>
          </div>
        </div>

        {/* The quote. First on phones; left column on desktop. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="order-1 pt-8 text-center lg:pt-0 lg:order-none lg:col-start-2 lg:row-start-1 lg:self-end lg:text-left xl:col-start-1 xl:row-start-1 xl:self-center xl:justify-self-end xl:text-right"
        >
          <p className="font-display leading-[0.95] tracking-[-0.02em]">
            <span className="block text-[clamp(1.6rem,2vw,1.75rem)] font-light font-wide">
              <span className="text-accent">&ldquo;</span> I turn
            </span>
            <span className="block text-[clamp(2rem,10vw,2.5rem)] font-medium xl:text-[clamp(2.4rem,3vw,2.75rem)]">
              ideas into
            </span>
            <span className="block text-[clamp(2.75rem,14vw,3.6rem)] font-black uppercase font-condensed xl:text-[clamp(3.4rem,4vw,4rem)]">
              products<span className="text-accent">.&rdquo;</span>
            </span>
          </p>
        </motion.div>
      </div>

      {/* Corner captions, after the reference's "FAUVISM REPORT". */}
      <div className="mt-10 hidden w-full items-end justify-between container-px lg:flex">
        <p className="font-display text-sm font-extrabold uppercase leading-[1.05] font-semiwide">
          Tech
          <br />
          creator
          <span className="mt-2 block h-[3px] w-7 bg-accent" />
        </p>
        <p className="text-right text-xs leading-relaxed text-muted">West Midlands, UK</p>
      </div>
    </section>
  );
}

function MosaicTile({
  tile,
  progress,
  reduce,
}: {
  tile: Tile;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : tile.drift]);

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, delay: 0.15 + tile.order * 0.08, ease: EASE }}
      style={{ gridArea: tile.area, y }}
      className={`relative overflow-hidden ${tile.src ? "bg-card" : "bg-accent"}`}
    >
      {tile.src && (
        <Image
          src={tile.src}
          alt=""
          fill
          sizes="(max-width: 1024px) 34vw, 200px"
          className="object-cover"
          style={{ objectPosition: tile.pos }}
        />
      )}
    </motion.div>
  );
}
