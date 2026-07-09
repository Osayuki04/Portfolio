import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ContentCarousel } from "@/components/content/ContentCarousel";
import { fetchAllContent } from "@/lib/contentApi";
import { getFeatured, getVideos, getArticles, getInsights, type Content as ContentItem } from "@/lib/content";

export async function Content() {
  const all = await fetchAllContent();
  const featured = getFeatured(all).slice(0, 8);
  const videos = getVideos(all).slice(0, 8);
  const articles = getArticles(all).slice(0, 8);
  const insights = getInsights(all).slice(0, 8);

  return (
    <Section id="content">
      <SectionHeading
        eyebrow="Building in Public"
        title="Beyond the code"
        description="Videos, threads, and write-ups about what I'm building and what I'm learning."
      />

      <ContentCarousel items={featured} label="Featured Content" icon="star" />
      <ContentCarousel items={videos} label="Latest Videos" icon="video" />
      <ContentCarousel items={articles} label="Latest Articles" icon="article" />
      <ContentCarousel items={insights} label="Recent Insights" icon="insight" />

      <Reveal className="mt-12 flex justify-center">
        <Link
          href="/content"
          className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-content hover:border-content"
        >
          View All Content
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}

export type { ContentItem };
