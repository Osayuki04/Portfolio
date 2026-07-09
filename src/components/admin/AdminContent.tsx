"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Star,
  Pencil,
  Trash2,
  Search,
  DownloadCloud,
  X,
  Loader2,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import {
  fetchAllContent,
  isApiConfigured,
  createContent,
  updateContent,
  deleteContent,
  featureContent,
  importUrl,
  logout,
} from "@/lib/contentApi";
import {
  CATEGORIES,
  PLATFORMS,
  CONTENT_TYPES,
  formatDate,
  type Content,
} from "@/lib/content";
import { platformMeta } from "@/components/content/PlatformBadge";

type Draft = Partial<Content> & { title: string };

const emptyDraft: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  description: "",
  featuredImage: "",
  platform: "blog",
  contentType: "article",
  category: "Development",
  sourceUrl: "",
  embedUrl: "",
  publishedDate: "",
  views: 0,
  featured: false,
};

export function AdminContent({ username }: { username: string }) {
  const router = useRouter();
  const live = isApiConfigured();
  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [importing, setImporting] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // filters
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    (async () => {
      setItems(await fetchAllContent({ fresh: true }));
      setLoading(false);
    })();
  }, []);

  async function handleLogout() {
    await logout();
    router.refresh();
  }

  const filtered = useMemo(() => {
    let list = items;
    if (platform !== "all") list = list.filter((c) => c.platform === platform);
    if (category !== "all") list = list.filter((c) => c.category === category);
    if (type !== "all") list = list.filter((c) => c.contentType === type);
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((c) => c.title.toLowerCase().includes(q) || c.excerpt.toLowerCase().includes(q));
    return list;
  }, [items, platform, category, type, search]);

  const flash = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3500);
  };

  async function refresh() {
    setItems(await fetchAllContent({ fresh: true }));
  }

  async function handleSave(draft: Draft) {
    setBusy(true);
    try {
      if (live) {
        if (draft.id) await updateContent(draft.id, draft);
        else await createContent(draft);
        await refresh();
      } else {
        // local-only preview (no backend configured)
        setItems((prev) => {
          if (draft.id) return prev.map((c) => (c.id === draft.id ? ({ ...c, ...draft } as Content) : c));
          const id = Math.max(0, ...prev.map((c) => c.id)) + 1;
          return [{ ...emptyDraft, ...draft, id } as Content, ...prev];
        });
      }
      setEditing(null);
      flash(draft.id ? "Content updated" : "Content created");
    } catch (e) {
      flash(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: Content) {
    if (!confirm(`Delete “${item.title}”?`)) return;
    setBusy(true);
    try {
      if (live) {
        await deleteContent(item.id);
        await refresh();
      } else {
        setItems((prev) => prev.filter((c) => c.id !== item.id));
      }
      flash("Content deleted");
    } catch (e) {
      flash(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleFeature(item: Content) {
    try {
      if (live) {
        await featureContent(item.id, !item.featured);
        await refresh();
      } else {
        setItems((prev) => prev.map((c) => (c.id === item.id ? { ...c, featured: !c.featured } : c)));
      }
    } catch (e) {
      flash(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function handleImport() {
    const url = importValue.trim();
    if (!url) return;
    setImporting(true);
    try {
      const draft = await importUrl(url);
      setEditing({ ...emptyDraft, ...draft, title: draft.title ?? "" });
      flash(
        draft.metadataFound
          ? "Metadata retrieved - review & save"
          : "Limited metadata for this platform - review & complete"
      );
      setImportValue("");
    } catch (e) {
      flash(e instanceof Error ? e.message : "Import failed");
    } finally {
      setImporting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl container-px py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/content"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-content"
          >
            <ArrowLeft className="h-4 w-4" />
            Building in Public
          </Link>
          <h1 className="heading-tech mt-3 text-2xl sm:text-3xl">Content Management</h1>
        </div>
        <div className="flex items-center gap-2">
          {username && (
            <span className="hidden font-mono text-xs text-faint sm:inline">
              Signed in as <span className="text-content">{username}</span>
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent/40 hover:text-content"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
          <button
            type="button"
            onClick={() => setEditing({ ...emptyDraft })}
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors hover:bg-content hover:border-content"
          >
            <Plus className="h-4 w-4" />
            New Content
          </button>
        </div>
      </div>

      {!live && (
        <p className="mt-5 rounded-md border border-border bg-surface/50 p-3 font-mono text-xs text-muted">
          Preview mode - set <span className="text-accent">NEXT_PUBLIC_CONTENT_API_URL</span> to connect the PHP API.
          Changes here are local only and won&apos;t persist.
        </p>
      )}
      {message && (
        <p className="mt-5 rounded-md border border-mexo/40 bg-mexo/10 p-3 font-mono text-xs text-mexo">{message}</p>
      )}

      {/* Import */}
      <div className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <div className="flex items-center gap-2 label-tech text-faint">
          <DownloadCloud className="h-4 w-4" />
          Import from URL
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={importValue}
            onChange={(e) => setImportValue(e.target.value)}
            placeholder="Paste a TikTok, X, Instagram, LinkedIn or YouTube URL…"
            className="flex-1 rounded-md border border-border bg-surface/50 px-3 py-2.5 text-sm text-content outline-none placeholder:text-faint focus:border-accent/50"
          />
          <button
            type="button"
            onClick={handleImport}
            disabled={importing || !importValue.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-content transition-colors hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50"
          >
            {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <DownloadCloud className="h-4 w-4" />}
            Import
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-md border border-border bg-surface/50 py-2.5 pl-9 pr-3 text-sm text-content outline-none placeholder:text-faint focus:border-accent/50"
          />
        </div>
        <FilterSelect value={platform} onChange={setPlatform} all="All platforms" options={PLATFORMS.map((p) => [p, platformMeta[p].label])} />
        <FilterSelect value={category} onChange={setCategory} all="All categories" options={CATEGORIES.map((c) => [c, c])} />
        <FilterSelect value={type} onChange={setType} all="All types" options={CONTENT_TYPES.map((t) => [t, cap(t)])} />
      </div>

      {/* List */}
      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        <div className="hidden grid-cols-[1fr_120px_140px_110px_120px] gap-3 border-b border-border bg-surface/50 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-faint lg:grid">
          <span>Title</span>
          <span>Platform</span>
          <span>Category</span>
          <span>Date</span>
          <span className="text-right">Actions</span>
        </div>
        {loading ? (
          <p className="p-6 text-center text-sm text-muted">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted">No content found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-2 border-b border-border px-4 py-3 last:border-0 lg:grid-cols-[1fr_120px_140px_110px_120px] lg:items-center lg:gap-3"
            >
              <div className="flex items-center gap-2">
                {item.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" />}
                <span className="truncate text-sm text-content">{item.title}</span>
              </div>
              <span className="font-mono text-xs text-muted">{platformMeta[item.platform]?.label}</span>
              <span className="font-mono text-xs text-muted">{item.category}</span>
              <span className="font-mono text-xs text-faint">{formatDate(item.publishedDate)}</span>
              <div className="flex items-center gap-1 lg:justify-end">
                <IconBtn label="Feature" onClick={() => handleFeature(item)} active={item.featured}>
                  <Star className={`h-4 w-4 ${item.featured ? "fill-accent text-accent" : ""}`} />
                </IconBtn>
                <IconBtn label="Edit" onClick={() => setEditing({ ...item })}>
                  <Pencil className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Delete" onClick={() => handleDelete(item)}>
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <Editor
          draft={editing}
          busy={busy}
          onClose={() => setEditing(null)}
          onChange={setEditing}
          onSave={handleSave}
        />
      )}
    </main>
  );
}

function Editor({
  draft,
  busy,
  onClose,
  onChange,
  onSave,
}: {
  draft: Draft;
  busy: boolean;
  onClose: () => void;
  onChange: (d: Draft) => void;
  onSave: (d: Draft) => void;
}) {
  const set = (k: keyof Draft, v: unknown) => onChange({ ...draft, [k]: v } as Draft);
  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-md sm:p-8" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="heading-tech text-xl">{draft.id ? "Edit Content" : "New Content"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-muted hover:text-content">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Title" className="sm:col-span-2">
            <input className={inputCls} value={draft.title ?? ""} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Excerpt" className="sm:col-span-2">
            <input className={inputCls} value={draft.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <textarea rows={3} className={inputCls} value={draft.description ?? ""} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <Field label="Platform">
            <select className={inputCls} value={draft.platform} onChange={(e) => set("platform", e.target.value)}>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{platformMeta[p].label}</option>
              ))}
            </select>
          </Field>
          <Field label="Content Type">
            <select className={inputCls} value={draft.contentType} onChange={(e) => set("contentType", e.target.value)}>
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>{cap(t)}</option>
              ))}
            </select>
          </Field>
          <Field label="Category">
            <select className={inputCls} value={draft.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Published Date">
            <input type="date" className={inputCls} value={draft.publishedDate ?? ""} onChange={(e) => set("publishedDate", e.target.value)} />
          </Field>
          <Field label="Source URL" className="sm:col-span-2">
            <input className={inputCls} value={draft.sourceUrl ?? ""} onChange={(e) => set("sourceUrl", e.target.value)} />
          </Field>
          <Field label="Featured Image URL" className="sm:col-span-2">
            <input className={inputCls} value={draft.featuredImage ?? ""} onChange={(e) => set("featuredImage", e.target.value)} />
          </Field>
          <Field label="Views">
            <input type="number" className={inputCls} value={draft.views ?? 0} onChange={(e) => set("views", Number(e.target.value))} />
          </Field>
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-content">
            <input type="checkbox" checked={!!draft.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-[var(--color-accent)]" />
            Featured
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-md border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-muted hover:text-content">
            Cancel
          </button>
          <button
            type="button"
            disabled={busy || !draft.title?.trim()}
            onClick={() => onSave(draft)}
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors hover:bg-content hover:border-content disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-surface/50 px-3 py-2.5 text-sm text-content outline-none placeholder:text-faint focus:border-accent/50";

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{label}</span>
      {children}
    </label>
  );
}

function FilterSelect({
  value,
  onChange,
  all,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  all: string;
  options: [string, string][];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-border bg-surface/50 px-3 py-2.5 text-sm text-content outline-none focus:border-accent/50"
    >
      <option value="all">{all}</option>
      {options.map(([v, label]) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/40 hover:text-content ${
        active ? "text-accent" : ""
      }`}
    >
      {children}
    </button>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
