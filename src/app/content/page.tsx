import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Video, FileText, Sparkles } from "lucide-react";
import { fetchAllContent } from "@/lib/contentApi";
import { getFeatured, getVideos, getArticles, getInsights, type Content } from "@/lib/content";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentExplorer } from "@/components/content/ContentExplorer";
import { Footer } from "@/components/Footer";

const contentDescription =
  "Building in Public — Osayuki Obazee's videos, articles, and threads on software development, product building, content creation, and entrepreneurship.";

export const metadata: Metadata = {
  title: "Building in Public",
  description: contentDescription,
  keywords: [
    "Osayuki Obazee",
    "Building in Public",
    "developer content",
    "software development",
    "product building",
    "Next.js",
    "PHP",
    "tutorials",
  ],
  alternates: { canonical: "/content" },
  openGraph: {
    type: "website",
    url: "/content",
    title: "Building in Public — Osayuki Obazee",
    description: contentDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Building in Public — Osayuki Obazee",
    description: contentDescription,
  },
};

export default async function ContentPage() {
  const all = await fetchAllContent();
  const featured = getFeatured(all).slice(0, 3);
  const videos = getVideos(all).slice(0, 6);
  const articles = getArticles(all).slice(0, 6);
  const insights = getInsights(all).slice(0, 6);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between container-px">
          <Link
            href="/#content"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-content"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors hover:bg-content hover:border-content"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl container-px pt-28 pb-24">
        {/* Hero */}
        <Reveal>
          <p className="label-tech text-accent">Building in Public</p>
          <h1 className="heading-tech mt-3 text-4xl sm:text-5xl lg:text-6xl">Building in Public</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Documenting my journey through software development, product building, content creation,
            and entrepreneurship.
          </p>
        </Reveal>

        {featured.length > 0 && (
          <Row icon={Star} label="Featured Content" items={featured} />
        )}
        {videos.length > 0 && <Row icon={Video} label="Latest Videos" items={videos} />}
        {articles.length > 0 && <Row icon={FileText} label="Latest Articles" items={articles} />}
        {insights.length > 0 && <Row icon={Sparkles} label="Latest Insights" items={insights} />}

        {/* All content + categories */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="heading-tech mb-8 text-2xl sm:text-3xl">All Content</h2>
          <ContentExplorer all={all} />
        </div>
      </main>

      <Footer />
    </>
  );
}

function Row({
  icon: Icon,
  label,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: Content[];
}) {
  return (
    <Reveal className="mt-16">
      <div className="flex items-center gap-2 label-tech text-faint">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </Reveal>
  );
}
