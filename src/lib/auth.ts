// Server-only admin authentication: credential check + signed-cookie session.
// The password and secret are read from server env and never reach the client.

import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "yuki_admin";
const MAX_AGE_S = 60 * 60 * 12; // 12 hours

function secret(): string {
  return process.env.AUTH_SECRET ?? "";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** timing-safe string compare that tolerates length differences */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // compare against self to keep the work constant, then fail
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  if (!u || !p) return false; // fail closed when not configured
  // evaluate both to avoid short-circuit timing leaks
  const uOk = safeEqual(username, u);
  const pOk = safeEqual(password, p);
  return uOk && pOk;
}

export function createSessionToken(username: string): string {
  const exp = Date.now() + MAX_AGE_S * 1000;
  const payload = Buffer.from(`${username}:${exp}`).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): { username: string } | null {
  if (!token || !secret()) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(payload))) return null;

  const decoded = Buffer.from(payload, "base64url").toString();
  const sep = decoded.lastIndexOf(":");
  if (sep <= 0) return null;
  const username = decoded.slice(0, sep);
  const exp = Number(decoded.slice(sep + 1));
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  return { username };
}

export const SESSION_MAX_AGE = MAX_AGE_S;

/** Read & verify the session from the request cookies (server components / routes). */
export async function getServerSession(): Promise<{ username: string } | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
