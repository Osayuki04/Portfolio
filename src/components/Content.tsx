import Link from "next/link";
import { ArrowRight, Video, FileText, Sparkles, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ContentCard } from "@/components/content/ContentCard";
import { fetchAllContent } from "@/lib/contentApi";
import { getFeatured, getVideos, getArticles, getInsights, type Content as ContentItem } from "@/lib/content";

export async function Content() {
  const all = await fetchAllContent();
  const featured = getFeatured(all).slice(0, 3);
  const videos = getVideos(all).slice(0, 3);
  const articles = getArticles(all).slice(0, 3);
  const insights = getInsights(all).slice(0, 3);

  return (
    <Section id="content">
      <SectionHeading
        eyebrow="Building in Public"
        title="Beyond the code"
        description="Content from across platforms — development, building products, the founder journey, and lessons learned in the open."
      />

      {featured.length > 0 && (
        <Group icon={Star} label="Featured Content" delay={0.05}>
          {featured.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </Group>
      )}

      {videos.length > 0 && (
        <Group icon={Video} label="Latest Videos" delay={0.05}>
          {videos.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </Group>
      )}

      {articles.length > 0 && (
        <Group icon={FileText} label="Latest Articles" delay={0.05}>
          {articles.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </Group>
      )}

      {insights.length > 0 && (
        <Group icon={Sparkles} label="Recent Insights" delay={0.05}>
          {insights.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </Group>
      )}

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

function Group({
  icon: Icon,
  label,
  delay,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className="mt-12">
      <div className="flex items-center gap-2 label-tech text-faint">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </Reveal>
  );
}

export type { ContentItem };
