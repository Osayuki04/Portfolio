# Deployment Guide

This repo has **two parts**:

1. **Next.js app** (the site) - a mostly-static Next.js 16 app. The public pages
   (`/`, `/content`, `/projects/*`, sitemap, OG images) are static/SSG, but the
   **admin** (`/admin/content` + `/api/admin/*`) is server-rendered and needs a
   **Node.js runtime** (`next start`).
2. **PHP + MySQL backend** (`backend/`) - the content API. This is what Hostinger
   shared hosting runs natively.

> Because the admin needs Node.js, you can't run the whole app on plain PHP
> shared hosting. Pick one of the hosting options below.

---

## 1. Push to GitHub

```bash
# create an EMPTY repo on github.com first (no README), then:
git remote add origin https://github.com/Osayuki04/<repo-name>.git
git branch -M main
git push -u origin main
```

Secrets are safe: `.env.local` / `.env.production` are gitignored - only the
`*.example` templates are committed.

---

## 2a. Hosting option A - Vercel (site) + Hostinger (PHP/MySQL)  ⭐ recommended

Best fit for Next.js: zero-config, global CDN, great Core Web Vitals.

**Next.js → Vercel**
1. Import the GitHub repo at vercel.com.
2. Add Environment Variables (from `.env.production.example`):
   `NEXT_PUBLIC_CONTENT_API_URL`, `CONTENT_API_URL`, `ADMIN_TOKEN`,
   `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`.
3. Add your domain `osayukiobazee.xyz` in Vercel → point DNS (Hostinger DNS)
   per Vercel's instructions.

**PHP API → Hostinger** (see step 3 below).

## 2b. Hosting option B - everything on Hostinger

Requires a plan with **Node.js support** (Business / Cloud / VPS).

1. hPanel → **Setup Node.js App** → Node 20+, app root = repo, start command
   `npm run start`, build command `npm run build`.
2. Add the same env vars as above in the Node.js app config.
3. Deploy via Git (hPanel Git) or upload; run the build; start the app.
4. Serve the PHP backend from the same account (step 3).

---

## 3. PHP + MySQL backend on Hostinger (both options need this)

1. **Database**: hPanel → MySQL Databases → create a DB + user. Import
   `backend/schema.sql` via phpMyAdmin (creates tables + seed content).
2. **Upload** the `backend/` folder into `public_html/backend` (or a subdomain
   like `api.osayukiobazee.xyz`).
3. **Config** - set these as env vars (hPanel → PHP env / or `SetEnv` in
   `backend/.htaccess`):
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`
   - `CORS_ORIGIN=https://osayukiobazee.xyz`
   - `ADMIN_TOKEN=` (the SAME value as the Next.js `ADMIN_TOKEN`)
4. Verify: `https://<your-api-host>/backend/index.php?path=/meta` returns JSON.

---

## 4. After deploy

- Point `NEXT_PUBLIC_CONTENT_API_URL` / `CONTENT_API_URL` at the real PHP host.
- Set a strong `ADMIN_PASSWORD` and a fresh `AUTH_SECRET` (`openssl rand -hex 32`).
- Google Search Console: add the property and submit
  `https://osayukiobazee.xyz/sitemap.xml`.
- Confirm HTTPS everywhere (no mixed content - the PHP API must be HTTPS).
