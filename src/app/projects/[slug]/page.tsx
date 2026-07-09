import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Gamepad2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Database,
  Layers,
  Wrench,
  TrendingUp,
  Map,
  Newspaper,
} from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import { profile } from "@/lib/data";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ProjectImage } from "@/components/projects/ProjectImage";
import { MarqueeRow } from "@/components/ui/MarqueeRow";
import { Gallery } from "@/components/projects/Gallery";
import { ContentCard } from "@/components/content/ContentCard";
import { Footer } from "@/components/Footer";
import { fetchAllContent } from "@/lib/contentApi";
import { getBySlug, type Content } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case Study Not Found" };
  const title = `${project.name} - ${project.subtitle}`;
  const url = `/projects/${slug}`;
  const images = project.image ? [{ url: project.image, alt: `${project.name} screenshot` }] : undefined;
  return {
    title,
    description: project.summary,
    keywords: [project.name, project.subtitle, project.category, ...project.tech, "case study", "Osayuki Obazee"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: project.summary,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const cs = project.caseStudy;
  const isGame = project.liveLabel === "Play Game";

  // Optional, manually-curated related content (relationship is optional).
  let related: Content[] = [];
  if (project.relatedContent?.length) {
    const all = await fetchAllContent();
    related = project.relatedContent
      .map((s) => getBySlug(all, s))
      .filter((c): c is Content => Boolean(c));
  }

  return (
    <>
      <JsonLd data={[projectJsonLd(project), breadcrumbJsonLd(project)]} />
      {/* minimal header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between container-px">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-content"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
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
        {/* 1. Hero + 2. Overview */}
        <Reveal>
          <p className="label-tech text-accent">{project.subtitle}</p>
          <h1 className="heading-tech mt-3 text-3xl sm:text-5xl lg:text-6xl">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{cs.overview}</p>

          <MarqueeRow
            items={project.tech}
            className="mt-6"
            pillClass="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
          />

          <div className="mt-7 flex flex-wrap gap-3">
            {cs.ctas.map((cta, i) =>
              cta.href === "#" ? (
                <button
                  key={cta.label}
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Coming soon"
                  className={ctaDisabledClass}
                >
                  {i === 0 && isGame ? (
                    <Gamepad2 className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                  {cta.label}
                </button>
              ) : cta.external ? (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={ctaClass(i === 0 || cta.primary)}
                >
                  {i === 0 && isGame ? (
                    <Gamepad2 className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                  {cta.label}
                </a>
              ) : (
                <Link key={cta.label} href={cta.href} className={ctaClass(i === 0 || cta.primary)}>
                  {cta.label}
                </Link>
              )
            )}
          </div>
        </Reveal>

        {/* Hero image */}
        <Reveal delay={0.05}>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card">
            <ProjectImage src={project.image} name={project.name} label={project.subtitle} priority sizes="100vw" />
          </div>
        </Reveal>

        {/* 3 + 4. Problem / Solution */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          <Reveal className="bg-card/40 p-7">
            <SectionLabel icon={AlertTriangle} className="text-faint">
              Problem
            </SectionLabel>
            <p className="mt-4 text-sm leading-relaxed text-muted">{cs.problem}</p>
          </Reveal>
          <Reveal delay={0.05} className="bg-card/40 p-7">
            <SectionLabel icon={Lightbulb} className="text-mexo">
              Solution
            </SectionLabel>
            <p className="mt-4 text-sm leading-relaxed text-muted">{cs.solution}</p>
          </Reveal>
        </div>

        {/* 5. System Design */}
        <Reveal className="mt-6 rounded-lg border border-border bg-card/40 p-7">
          <SectionLabel icon={Layers} className="text-faint">
            System Design
          </SectionLabel>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cs.systemDesign.map((node) => (
              <div key={node.label} className="rounded-md border border-border bg-surface/50 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                  {node.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-content">{node.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 6. Features / Process + Database */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-lg border border-border bg-card/40 p-7">
            <SectionLabel icon={Workflow} className="text-faint">
              {cs.processTitle}
            </SectionLabel>
            <ol className="mt-6 space-y-px overflow-hidden rounded-md border border-border bg-border">
              {cs.process.map((stage) => (
                <li key={stage.step} className="flex items-start gap-4 bg-surface/40 p-4">
                  <span className="font-mono text-xs text-mexo">{stage.step}</span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.1em] text-content">
                      {stage.title}
                    </p>
                    {stage.detail && (
                      <p className="mt-1 text-xs leading-relaxed text-faint">{stage.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.05} className="rounded-lg border border-border bg-card/40 p-7">
            <SectionLabel icon={Database} className="text-faint">
              Database Structure
            </SectionLabel>
            <ul className="mt-6 space-y-2">
              {cs.database.map((entity) => (
                <li
                  key={entity}
                  className="flex items-center gap-3 rounded-md border border-border bg-surface/40 px-4 py-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  <span className="font-mono text-sm text-content">{entity}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* 7. Screenshot Gallery */}
        <Reveal className="mt-16">
          <SectionLabel icon={Layers} className="text-accent">
            Screenshot Gallery
          </SectionLabel>
          <p className="mt-2 text-sm text-faint">
            Tap any frame to open the lightbox - use arrow keys or swipe to navigate.
          </p>
          <div className="mt-6">
            <Gallery items={cs.gallery} name={project.name} />
          </div>
        </Reveal>

        {/* 8. Technical Challenges */}
        <Reveal className="mt-16">
          <SectionLabel icon={Wrench} className="text-accent">
            Technical Challenges
          </SectionLabel>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {cs.challenges.map((c) => (
              <div key={c.title} className="rounded-lg border border-border bg-card/40 p-6">
                <h3 className="text-sm font-semibold text-content">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 9. Impact */}
        <Reveal className="mt-16 rounded-2xl border border-border bg-card/40 p-7 sm:p-10">
          <SectionLabel icon={TrendingUp} className="text-mexo">
            Impact
          </SectionLabel>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-content">{cs.impact}</p>
          {cs.metrics && (
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
              {cs.metrics.map((m) => (
                <div key={m.label} className="bg-card/60 p-6">
                  <div className="font-display text-3xl font-bold text-content">{m.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {/* 10. Roadmap */}
        <Reveal className="mt-16">
          <SectionLabel icon={Map} className="text-accent">
            Roadmap
          </SectionLabel>
          <ol className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {cs.roadmap.map((item, i) => (
              <li key={item} className="rounded-lg border border-border bg-card/40 p-4">
                <span className="font-mono text-xs text-mexo">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm text-content">{item}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Related Content (optional, manually curated) */}
        {related.length > 0 && (
          <Reveal className="mt-16">
            <SectionLabel icon={Newspaper} className="text-accent">
              Related Content
            </SectionLabel>
            <p className="mt-2 text-sm text-faint">
              From the Building in Public series - related to this project.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </Reveal>
        )}

        {/* 11. CTA */}
        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/40 p-10 text-center corner-ticks">
          <h2 className="heading-tech text-2xl sm:text-3xl">Want to see more?</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {cs.ctas.map((cta, i) =>
              cta.href === "#" ? (
                <button
                  key={cta.label}
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Coming soon"
                  className={ctaDisabledClass}
                >
                  {cta.label}
                </button>
              ) : cta.external ? (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={ctaClass(i === 0 || cta.primary)}
                >
                  {cta.label}
                </a>
              ) : (
                <Link key={cta.label} href={cta.href} className={ctaClass(i === 0 || cta.primary)}>
                  {cta.label}
                </Link>
              )
            )}
            <Link href="/#projects" className={ctaClass(false)}>
              Back to Projects
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}

function ctaClass(primary?: boolean) {
  return primary
    ? "inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-content hover:border-content"
    : "inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-content transition-colors hover:border-accent/50 hover:bg-accent/5";
}

// Inactive state for CTAs without a real link (href === "#") - lighter green.
const ctaDisabledClass =
  "inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-mexo/30 bg-mexo/10 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-mexo/50";

function SectionLabel({
  icon: Icon,
  className = "",
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-2 label-tech ${className}`}>
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}
