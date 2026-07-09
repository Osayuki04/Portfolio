// Centralized SEO config + structured-data (JSON-LD) builders.
// Single source of truth for the production domain - used by metadata,
// robots, sitemap, manifest, and JSON-LD so they can never drift apart.

import { profile } from "@/lib/data";

export const siteUrl = "https://osayukiobazee.xyz";
export const siteName = "Osayuki Obazee";
export const personName = "Osayuki Obazee";
export const jobTitle = "Full Stack Developer";
export const tagline = "Full Stack Developer & Founder of MEXO";

export const socialUrls = [
  profile.socials.github.url,
  profile.socials.linkedin.url,
  profile.socials.x.url,
  profile.socials.tiktok.url,
  profile.socials.instagram.url,
];

const abs = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path}`);

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    alternateName: "Yuki",
    url: siteUrl,
    image: abs(profile.avatarUrl),
    jobTitle,
    email: `mailto:${profile.email}`,
    sameAs: socialUrls,
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "React",
      "PHP",
      "MySQL",
      "TypeScript",
      "Product Engineering",
      "System Design",
    ],
    worksFor: { "@type": "Organization", name: "MEXO" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "en",
    author: { "@type": "Person", name: personName, url: siteUrl },
  };
}

export function projectJsonLd(project: {
  name: string;
  summary: string;
  category: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    genre: project.category,
    ...(project.image ? { image: abs(project.image) } : {}),
    author: { "@type": "Person", name: personName, url: siteUrl },
    creator: { "@type": "Person", name: personName, url: siteUrl },
  };
}

export function breadcrumbJsonLd(project: { name: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/#projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteUrl}/projects/${project.slug}` },
    ],
  };
}
