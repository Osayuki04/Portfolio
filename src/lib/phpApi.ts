// Server-only client for the PHP backend. Builds ?path= URLs (no mod_rewrite
// dependency) and injects the admin token so it never reaches the browser.

function base(): string {
  return (process.env.CONTENT_API_URL ?? process.env.NEXT_PUBLIC_CONTENT_API_URL ?? "").replace(/\/$/, "");
}

export function phpUrl(path: string, query?: Record<string, string | number | undefined>): string {
  let url = `${base()}?path=${path}`;
  if (query) {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") p.set(k, String(v));
    }
    const qs = p.toString();
    if (qs) url += `&${qs}`;
  }
  return url;
}

/** Forward a write to the PHP API with the admin token attached. */
export async function phpFetch(
  path: string,
  init: { method: string; body?: unknown } = { method: "GET" }
): Promise<Response> {
  const headers: Record<string, string> = {};
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  const token = process.env.ADMIN_TOKEN ?? "";
  if (token) headers["X-Admin-Token"] = token;

  return fetch(phpUrl(path), {
    method: init.method,
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
}
