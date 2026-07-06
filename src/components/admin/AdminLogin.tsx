"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Loader2, ArrowLeft } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Login failed.");
      }
      router.refresh(); // re-render the gated page now that the cookie is set
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col justify-center container-px py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-content"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to site
      </Link>

      <div className="rounded-xl border border-border bg-card/40 p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/60 text-accent">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="heading-tech mt-5 text-2xl">Private area</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sorry — this feature is only for Osayuki and not for the public. Please log in to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-faint">Username</span>
            <input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-md border border-border bg-surface/50 px-3 py-2.5 text-sm text-content outline-none placeholder:text-faint focus:border-accent/50"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-faint">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-md border border-border bg-surface/50 px-3 py-2.5 text-sm text-content outline-none placeholder:text-faint focus:border-accent/50"
            />
          </label>

          {error && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 p-2.5 font-mono text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !username || !password}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors hover:bg-content hover:border-content disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
