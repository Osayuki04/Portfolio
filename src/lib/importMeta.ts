// Server-side metadata import: paste a link, get an auto-filled draft.
// Uses only official oEmbed endpoints (no scraping). Publish dates are derived
// from the post IDs (TikTok / X / LinkedIn encode a timestamp). View counts are
// NOT available from any public embed/oEmbed, so they default to 0.

import type { Content } from "@/lib/content";

export type ImportDraft = Partial<Content> & { title: string; metadataFound?: boolean };

type Platform = Content["platform"];

export function detectPlatform(url: string): Platform {
  const u = url.toLowerCase();
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("linkedin.com")) return "linkedin";
  if (u.includes("x.com") || u.includes("twitter.com")) return "x";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  return "blog";
}

function defaultType(p: Platform): Content["contentType"] {
  if (p === "tiktok" || p === "youtube") return "video";
  if (p === "x") return "thread";
  if (p === "instagram" || p === "linkedin") return "post";
  return "article";
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const CATEGORY_RULES: [RegExp, Content["category"]][] = [
  [/unity|gamedev|\bgame(s|play)?\b/i, "Content Creation"],
  [/founder|startup|launch(ed|ing)?|shipping|in public|retrospective/i, "Founder Journey"],
  [/freelanc|client work|pricing|invoice/i, "Freelancing"],
  [/career|hiring|job|interview|portfolio/i, "Career"],
  [/tutorial|how to|guide|tips|beginner|learn/i, "Tutorials"],
  [/\bux\b|\bui\b|design|product|feature|booking|healthcare/i, "Building Products"],
  [/react|php|javascript|typescript|css|tailwind|code|coding|developer|software|engineering|\bai\b|web\s?dev|database|api|stack\s?overflow/i, "Development"],
];

function guessCategory(text: string): Content["category"] {
  for (const [re, cat] of CATEGORY_RULES) if (re.test(text)) return cat;
  return "Development";
}

/** Strip hashtags / collapse whitespace. */
function cleanCaption(raw: string): string {
  return raw
    .replace(/#[\p{L}\p{N}_]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function deriveTitle(caption: string, platform: Platform): string {
  const c = cleanCaption(caption);
  if (!c) return `${cap(platform)} post`;
  const m = c.match(/^(.{8,90}?)([.!?]|$)/u);
  let t = (m ? m[1] : c).trim();
  if (t.length > 90) t = `${t.slice(0, 87).trimEnd()}…`;
  return t;
}

function isoDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Resolve short links (e.g. vm.tiktok.com) to their canonical URL. */
async function resolveUrl(url: string): Promise<string> {
  for (const method of ["HEAD", "GET"] as const) {
    try {
      const res = await fetch(url, { method, redirect: "follow" });
      if (res.url) return res.url;
    } catch {
      /* try next */
    }
  }
  return url;
}

function tiktokDate(canonical: string): string | undefined {
  const id = canonical.match(/\/video\/(\d+)/)?.[1];
  if (!id) return undefined;
  return isoDate(Number(BigInt(id) >> BigInt(32)) * 1000);
}

function linkedinDate(url: string): string | undefined {
  const id = url.match(/(?:ugcPost|activity|share)-(\d+)/)?.[1];
  if (!id) return undefined;
  return isoDate(Number(BigInt(id) >> BigInt(22)));
}

function xDate(url: string): string | undefined {
  const id = url.match(/status\/(\d+)/)?.[1];
  if (!id) return undefined;
  return isoDate(Number(BigInt(id) >> BigInt(22)) + 1288834974657);
}

/** Title/category fallback for LinkedIn (no public oEmbed) from the URL slug. */
function linkedinFromSlug(url: string): { title: string; category: Content["category"] } {
  const raw = url.match(/\/posts\/[^_]*_(.+?)-(?:ugcPost|activity|share)-/)?.[1] ?? "";
  let words = "";
  try {
    words = decodeURIComponent(raw).normalize("NFKC");
  } catch {
    words = raw;
  }
  words = words.replace(/-/g, " ").replace(/\s+/g, " ").trim();
  const title = words ? cap(words) : "LinkedIn post";
  return { title, category: guessCategory(words) };
}

async function oembed(endpoint: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function importMetadata(inputUrl: string): Promise<ImportDraft> {
  const url = await resolveUrl(inputUrl);
  const platform = detectPlatform(url);
  const contentType = defaultType(platform);

  const draft: ImportDraft = {
    title: "",
    excerpt: "",
    description: "",
    featuredImage: "",
    platform,
    contentType,
    category: "Development",
    sourceUrl: url,
    embedUrl: "",
    publishedDate: "",
    views: 0,
    featured: false,
    metadataFound: false,
  };

  let oe: Record<string, unknown> | null = null;
  if (platform === "tiktok") {
    oe = await oembed(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    draft.publishedDate = tiktokDate(url) ?? "";
  } else if (platform === "x") {
    oe = await oembed(`https://publish.twitter.com/oembed?omit_script=1&url=${encodeURIComponent(url)}`);
    draft.publishedDate = xDate(url) ?? "";
  } else if (platform === "youtube") {
    oe = await oembed(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`);
  }

  if (oe) {
    draft.metadataFound = true;
    const caption = typeof oe.title === "string" ? oe.title : "";
    if (caption) {
      draft.title = deriveTitle(caption, platform);
      draft.description = cleanCaption(caption);
      draft.excerpt = draft.description!.slice(0, 180);
      draft.category = guessCategory(`${caption} ${url}`);
    }
    if (typeof oe.thumbnail_url === "string") draft.featuredImage = oe.thumbnail_url;
  }

  if (platform === "linkedin") {
    const { title, category } = linkedinFromSlug(url);
    draft.title = title;
    draft.category = category;
    draft.publishedDate = linkedinDate(url) ?? "";
    draft.metadataFound = Boolean(draft.publishedDate);
  }

  if (!draft.title) draft.title = `${cap(platform)} post`;
  return draft;
}
