# Building in Public — PHP API

PHP + MySQL REST API that powers the Building in Public content ecosystem.
No frameworks, no scraping — only official oEmbed endpoints are used for import.

## Setup

1. Create the database and table:
   ```bash
   mysql -u root -p < schema.sql
   ```
2. Configure environment (see `.env.example`). On Apache you can use `SetEnv`,
   or export the vars in your fpm pool / vhost.
3. Deploy the `backend/` folder behind a PHP-capable host. With the included
   `.htaccess`, requests route through `index.php`.

## Endpoints

Base URL = wherever you deploy this folder (e.g. `https://api.example.com`).

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/content` | List. Filters: `platform`, `category`, `content_type`, `featured`, `search`, `sort` (`recent`\|`popular`), `limit`, `offset` |
| POST | `/content` | Create |
| GET | `/content/{id}` | Single |
| PUT / PATCH | `/content/{id}` | Update (PATCH = partial) |
| DELETE | `/content/{id}` | Delete |
| POST | `/content/{id}/feature` | Set/toggle featured — body `{ "featured": true }` (omit to toggle) |
| POST | `/import` | Body `{ "url": "..." }` → draft metadata (detect platform + oEmbed) |
| GET | `/meta` | Allowed platforms / content types / categories |
| GET | `/projects/{slug}/content` | Related content for a project |

If `PATH_INFO` is unavailable on your host, every route also works via
`?path=`, e.g. `index.php?path=/content&platform=tiktok`.

## Frontend wiring

Point the Next.js app at this API with:

```
NEXT_PUBLIC_CONTENT_API_URL=https://api.example.com
```

When unset, the frontend falls back to the bundled sample dataset
(`src/lib/content.ts`) so the site always renders.

## Auth

Set `ADMIN_TOKEN` to require the `X-Admin-Token` header on all write
operations. The admin UI sends it from `NEXT_PUBLIC` config — for real
deployments, put the admin behind proper authentication.

## Import support

| Platform | Metadata | Notes |
| -------- | -------- | ----- |
| TikTok | ✅ oEmbed | title, thumbnail, author |
| X (Twitter) | ✅ oEmbed | may require valid public URL |
| YouTube | ✅ oEmbed | title, thumbnail |
| Instagram | ✋ manual | oEmbed needs an app token |
| LinkedIn | ✋ manual | no public oEmbed |

When metadata can't be retrieved, the import returns an editable draft for
manual completion.
