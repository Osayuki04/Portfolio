// Building in Public - content model + bundled fallback dataset.
// The frontend renders this dataset when NEXT_PUBLIC_CONTENT_API_URL is unset,
// so the site always works. When the PHP API is configured, live data from the
// MySQL `content` table replaces it (see contentApi.ts).

export type Platform = "x" | "tiktok" | "instagram" | "linkedin" | "youtube" | "blog";

export type ContentType = "video" | "article" | "thread" | "post" | "insight";

export type Category =
  | "Development"
  | "Building Products"
  | "Founder Journey"
  | "Tutorials"
  | "Career"
  | "Freelancing"
  | "Content Creation";

export type Content = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  featuredImage?: string | null;
  platform: Platform;
  contentType: ContentType;
  category: Category | string;
  sourceUrl?: string | null;
  embedUrl?: string | null;
  publishedDate: string;
  views: number;
  featured: boolean;
};

export const PLATFORMS: Platform[] = ["x", "tiktok", "instagram", "linkedin", "youtube", "blog"];

export const CONTENT_TYPES: ContentType[] = ["video", "article", "thread", "post", "insight"];

export const CATEGORIES: Category[] = [
  "Development",
  "Building Products",
  "Founder Journey",
  "Tutorials",
  "Career",
  "Freelancing",
  "Content Creation",
];

export const SOCIALS = {
  x: "https://x.com/Yuki_dev04",
  tiktok: "https://www.tiktok.com/@yuki_dev04",
  instagram: "https://www.instagram.com/yuki_dev04",
  linkedin: "https://www.linkedin.com/in/osayuki-obazee-677765331",
} as const;

// "Insights" groups short-form written content.
const INSIGHT_TYPES: ContentType[] = ["thread", "post", "insight"];

export const sampleContent: Content[] = [
  { id: 1, title: "LinkedIn Launches a Dedicated Video Feed", slug: "linkedin-launches-video-feed", excerpt: "LinkedIn just launched a dedicated video feed - here's why it signals where social media is heading, and the opportunity it opens for developers and founders.", description: "LinkedIn just launched a dedicated video feed, and it says a lot about where social media is heading. People don't just want to read long posts anymore - they want quick, valuable content they can consume in seconds. For developers, founders, and creators, this is a chance to build an audience on a platform traditionally dominated by text.", platform: "tiktok", contentType: "video", category: "Content Creation", sourceUrl: "https://www.tiktok.com/@yuki_dev04/video/7653418372796812566", publishedDate: "2026-06-20", views: 0, featured: true },
  { id: 2, title: "What I Love Most About Tech", slug: "what-i-love-most-about-tech", excerpt: "Nothing in tech is ever truly finished. The next big feature might start with a simple question: \"What if we did it this way instead?\"", description: "The thing I love most about tech is that nothing is ever truly finished. The next big feature might not come from a research lab or an AI model - it might come from someone asking a simple question: \"What if we did it this way instead?\" That's how products evolve.", platform: "tiktok", contentType: "video", category: "Development", sourceUrl: "https://www.tiktok.com/@yuki_dev04/video/7652330434168098070", publishedDate: "2026-06-17", views: 0, featured: false },
  { id: 3, title: "Building Search Autocomplete", slug: "building-search-autocomplete", excerpt: "Autocomplete seems simple until you see what's behind it - debouncing, caching popular searches, and learning from user behavior.", description: "Autocomplete seems simple until you realize how much is happening behind the scenes. From debouncing requests to caching popular searches and learning from user behavior, these are the techniques that make search feel instant. Small details like this separate basic apps from great ones.", platform: "tiktok", contentType: "video", category: "Tutorials", sourceUrl: "https://www.tiktok.com/@yuki_dev04/video/7652093930527411478", publishedDate: "2026-06-16", views: 0, featured: false },
  { id: 4, title: "AI Is Killing Stack Overflow & Tailwind", slug: "ai-killing-stackoverflow-tailwind", excerpt: "How AI is undercutting the business models of Stack Overflow and Tailwind.", description: "AI is killing the business models of Stack Overflow and Tailwind.", platform: "tiktok", contentType: "video", category: "Development", sourceUrl: "https://www.tiktok.com/@yuki_dev04/video/7603859450054724886", publishedDate: "2026-02-06", views: 0, featured: false },
  { id: 5, title: "I Recently Built and Launched", slug: "recently-built-and-launched", excerpt: "A recent build-and-launch milestone, shared on LinkedIn.", platform: "linkedin", contentType: "post", category: "Founder Journey", sourceUrl: "https://www.linkedin.com/posts/osayuki-obazee-677765331_activity-ugcPost-7431731955479695360-M7nK", publishedDate: "2026-02-23", views: 0, featured: true },
  { id: 6, title: "Frontend Development Meets Unity Game Dev", slug: "frontend-development-unity-gamedev", excerpt: "On frontend development and building a game with Unity.", platform: "linkedin", contentType: "post", category: "Content Creation", sourceUrl: "https://www.linkedin.com/posts/osayuki-obazee-677765331_frontenddevelopment-unity-gamedev-ugcPost-7443266455003000832-taYw", publishedDate: "2026-03-27", views: 0, featured: false },
];

// ---- selectors (work on any Content[] - sample or live) -------------------

const byDate = (a: Content, b: Content) =>
  new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();

export const getFeatured = (list: Content[]) => list.filter((c) => c.featured).sort(byDate);
export const getVideos = (list: Content[]) => list.filter((c) => c.contentType === "video").sort(byDate);
export const getArticles = (list: Content[]) => list.filter((c) => c.contentType === "article").sort(byDate);
export const getInsights = (list: Content[]) =>
  list.filter((c) => INSIGHT_TYPES.includes(c.contentType)).sort(byDate);
export const getByCategory = (list: Content[], category: string) =>
  list.filter((c) => c.category === category).sort(byDate);
export const getBySlug = (list: Content[], slug: string) => list.find((c) => c.slug === slug);
export const sortByDate = (list: Content[]) => [...list].sort(byDate);

export function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(views >= 10000 ? 0 : 1)}K`;
  return String(views);
}
