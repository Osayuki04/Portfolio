// Centralized SEO config + structured-data (JSON-LD) builders.
// Single source of truth for the production domain - used by metadata,
// robots, sitemap, manifest, and JSON-LD so they can never drift apart.

import { profile } from "@/lib/data";

export const siteUrl = "https://osayukiobazee.com";
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

/** Stable node id so every schema below points at ONE person, not copies of one. */
export const PERSON_ID = `${siteUrl}/#person`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: personName,
    alternateName: "Yuki",
    url: siteUrl,
    image: abs(profile.avatarUrl),
    jobTitle,
    description:
      "Osayuki Obazee (Yuki) is a full stack developer and founder of MEXO, from Edo State, Nigeria, studying Computer Science at the University of Wolverhampton.",
    email: `mailto:${profile.email}`,
    sameAs: socialUrls,
    nationality: { "@type": "Country", name: "Nigeria" },
    birthPlace: { "@type": "Place", name: "Edo State, Nigeria" },
    homeLocation: { "@type": "Place", name: "Wolverhampton, England, United Kingdom" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Wolverhampton",
      sameAs: "https://www.wlv.ac.uk/",
    },
    hasOccupation: { "@type": "Occupation", name: jobTitle },
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
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** Homepage only: tells Google this page IS the profile of that person. */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${personName}, ${tagline}`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": PERSON_ID },
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
