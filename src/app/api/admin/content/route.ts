import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { phpFetch } from "@/lib/phpApi";

// Create
export async function POST(req: Request) {
  if (!(await getServerSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const res = await phpFetch("/content", { method: "POST", body });
  const json = await res.json().catch(() => ({ error: "Bad response from API" }));
  return NextResponse.json(json, { status: res.status });
}
