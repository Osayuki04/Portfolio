// Content data access.
//   • Reads come from the PHP API (?path= form) with a graceful fallback to the
//     bundled sample dataset, so public pages always render.
//   • Writes & import go through same-origin /api/admin/* routes, which verify
//     the admin session cookie and inject the API token server-side. No secret
//     is ever shipped to the browser.

import { sampleContent, type Content } from "@/lib/content";

const READ_BASE = (process.env.NEXT_PUBLIC_CONTENT_API_URL ?? "").replace(/\/$/, "");

export function isApiConfigured(): boolean {
  return READ_BASE !== "";
}

function readUrl(path: string, query?: Record<string, string | number | undefined>): string {
  let url = `${READ_BASE}?path=${path}`;
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

/** Public read — live data when configured, otherwise the sample set. */
export async function fetchAllContent(opts?: { fresh?: boolean }): Promise<Content[]> {
  if (!READ_BASE) return sampleContent;
  try {
    const res = await fetch(
      readUrl("/content", { limit: 100 }),
      opts?.fresh ? { cache: "no-store" } : { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { data: Content[] };
    return Array.isArray(json.data) ? json.data : sampleContent;
  } catch {
    return sampleContent;
  }
}

export type ContentDraft = Partial<Content> & { title: string };

// --- admin (authenticated, same-origin proxy) ------------------------------

async function adminFetch<T>(path: string, init: { method: string; body?: unknown }): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    method: init.method,
    headers: init.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  if (res.status === 401) throw new Error("Your session expired — please log in again.");
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function importUrl(url: string): Promise<Partial<Content> & { metadataFound?: boolean }> {
  const json = await adminFetch<{ draft: Partial<Content> & { metadataFound?: boolean } }>("/import", {
    method: "POST",
    body: { url },
  });
  return json.draft ?? { title: "" };
}

export async function createContent(draft: ContentDraft): Promise<Content> {
  const json = await adminFetch<{ data: Content }>("/content", { method: "POST", body: draft });
  return json.data;
}

export async function updateContent(id: number, patch: Partial<Content>): Promise<Content> {
  const json = await adminFetch<{ data: Content }>(`/content/${id}`, { method: "PATCH", body: patch });
  return json.data;
}

export async function featureContent(id: number, featured: boolean): Promise<Content> {
  const json = await adminFetch<{ data: Content }>(`/content/${id}/feature`, {
    method: "POST",
    body: { featured },
  });
  return json.data;
}

export async function deleteContent(id: number): Promise<void> {
  await adminFetch<unknown>(`/content/${id}`, { method: "DELETE" });
}

export async function logout(): Promise<void> {
  await fetch("/api/admin/login", { method: "DELETE" });
}
