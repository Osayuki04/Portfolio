"use client";

import { useMemo, useState } from "react";
import { Search, LayoutGrid } from "lucide-react";
import { ContentCard } from "@/components/content/ContentCard";
import { platformMeta } from "@/components/content/PlatformBadge";
import {
  CATEGORIES,
  PLATFORMS,
  CONTENT_TYPES,
  sortByDate,
  type Content,
} from "@/lib/content";

export function ContentExplorer({ all }: { all: Content[] }) {
  const [category, setCategory] = useState<string>("All");
  const [platform, setPlatform] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = all;
    if (category !== "All") list = list.filter((c) => c.category === category);
    if (platform !== "all") list = list.filter((c) => c.platform === platform);
    if (type !== "all") list = list.filter((c) => c.contentType === type);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.excerpt.toLowerCase().includes(q)
      );
    }
    return sortByDate(list);
  }, [all, category, platform, type, search]);

  return (
    <div>
      {/* Categories */}
      <div className="flex items-center gap-2 label-tech text-faint">
        <LayoutGrid className="h-4 w-4" />
        Categories
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
              category === c
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/40 hover:text-content"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search content…"
            className="w-full rounded-md border border-border bg-surface/50 py-2.5 pl-9 pr-3 text-sm text-content outline-none transition-colors placeholder:text-faint focus:border-accent/50"
          />
        </div>
        <Select value={platform} onChange={setPlatform} label="Platform">
          <option value="all">All platforms</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {platformMeta[p].label}
            </option>
          ))}
        </Select>
        <Select value={type} onChange={setType} label="Type">
          <option value="all">All types</option>
          {CONTENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {/* Results */}
      <p className="mt-6 font-mono text-xs text-faint">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>
      {filtered.length > 0 ? (
        <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">No content matches these filters.</p>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  label,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border bg-surface/50 px-3 py-2.5 text-sm text-content outline-none transition-colors focus:border-accent/50"
      >
        {children}
      </select>
    </label>
  );
}
