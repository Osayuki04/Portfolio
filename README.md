# Dave (Yuki) — Portfolio

Premium portfolio for **Dave (Yuki)**, Full Stack Developer & Founder of **MEXO**. Built to feel like a founder's product landing page, not a resume.

## Stack

- **Next.js 16** (App Router) · **TypeScript**
- **Tailwind CSS v4** (CSS-first theming in `globals.css`)
- **Framer Motion** for scroll reveals, the interactive hero diagram, and metric counters
- **Lucide React** icons
- Fonts: **Space Grotesk** (display) + **Inter** (body) via `next/font`

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Structure

```
src/
  app/            layout (SEO metadata + fonts), page, sitemap, robots, globals.css
  lib/data.ts     single source of truth for ALL site content
  components/     one file per section + ui/ primitives + motion/ helpers
public/resume.pdf placeholder resume (replace with the real one)
```

## Editing content

Almost everything (copy, projects, experience, metrics, social links) lives in
[`src/lib/data.ts`](src/lib/data.ts). Update there — components read from it.

## Before going live

- Replace `public/resume.pdf` with the real resume.
- Fill in real URLs/handles in `profile.socials` and the Buy Me a Coffee links.
- Set the real domain in `layout.tsx` (`siteUrl`), `sitemap.ts`, and `robots.ts`.
- Update MEXO metrics in `data.ts` with live numbers and the real platform URL.
- Add an Open Graph image (`/opengraph-image`) for richer link previews.
