import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BigHeading } from "@/components/ui/BigHeading";
import { Reveal } from "@/components/motion/Reveal";
import { platformMeta } from "@/components/content/PlatformBadge";
import { fetchAllContent } from "@/lib/contentApi";
import { formatDate, getFeatured, sortByDate, type Content as ContentItem } from "@/lib/content";

/*
  Cover photos for posts that have no local thumbnail. Imported thumbnails are
  signed CDN URLs that expire, so each cover falls back to one of Yuki's own
  photos instead of a flat colour.
*/
// (me2 is left out: its burned-in subtitle clashes with the cover title.)
const FALLBACK_COVERS = [
  { src: "/me3.jpeg", pos: "62% 40%" },
  { src: "/desk.jpeg", pos: "50% 40%" },
  { src: "/me.jpeg", pos: "62% 25%" },
  { src: "/me4.jpeg", pos: "40% 30%" },
] as const;

export async function Content() {
  const all = await fetchAllContent();
  const featured = getFeatured(all);
  const rest = sortByDate(all).filter((c) => !featured.includes(c));
  const covers = [...featured, ...rest].slice(0, 4);

  return (
    <Section id="content" tone="deep" ariaLabelledby="content-title">
      <Reveal>
        <BigHeading id="content-title" text="Building in public" lines={["Building", "in public"]} />
      </Reveal>

      <div className="mt-14 flex flex-col gap-8 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <p className="max-w-4xl font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            Videos, threads and write-ups about the work behind every product,{" "}
            <span className="text-faint">out in the open.</span>
          </p>
        </Reveal>
        <Reveal delay={0.05} className="shrink-0">
          <Link
            href="/content"
            className="group inline-flex items-center gap-3 rounded-full bg-content px-6 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-background transition-colors duration-200 hover:bg-accent hover:text-on-accent"
          >
            All content
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {covers.length > 0 && (
        <ul className="no-scrollbar relative -mx-4 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0">
          {covers.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.06}
              className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto"
            >
              <Cover item={item} fallback={FALLBACK_COVERS[i % FALLBACK_COVERS.length]} />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Cover({
  item,
  fallback,
}: {
  item: ContentItem;
  fallback: (typeof FALLBACK_COVERS)[number];
}) {
  const href = item.sourceUrl || item.embedUrl || "/content";
  const external = href.startsWith("http");
  const meta = platformMeta[item.platform] ?? platformMeta.blog;
  const Icon = meta.Icon;
  const local = item.featuredImage?.startsWith("/") ? item.featuredImage : null;
  const isVideo = item.contentType === "video";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl bg-card p-5 text-white"
    >
      <Image
        src={local ?? fallback.src}
        alt=""
        fill
        sizes="(max-width: 1024px) 70vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={local ? undefined : { objectPosition: fallback.pos }}
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/45"
      />

      {/* Platform and date */}
      <span className="relative flex items-center justify-between text-xs font-semibold">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-sm">
          <Icon className="size-3.5" />
          {meta.label}
        </span>
        <span className="opacity-80">{formatDate(item.publishedDate)}</span>
      </span>

      {/* Play button on videos */}
      {isVideo && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3ccb7f] text-[#03140b] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110"
        >
          <Play className="size-6 translate-x-0.5 fill-current" />
        </span>
      )}

      <span className="relative">
        <span className="block font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.05] tracking-[-0.02em] transition-transform duration-300 group-hover:-translate-y-1">
          {item.title}
        </span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] opacity-85">
          {isVideo ? "Watch" : "Read"} on {meta.label}
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </a>
  );
}
