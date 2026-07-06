import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { phpFetch } from "@/lib/phpApi";

async function guard() {
  return (await getServerSession()) ? null : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const res = await phpFetch(`/content/${Number(id)}`, { method: "PATCH", body });
  const json = await res.json().catch(() => ({ error: "Bad response from API" }));
  return NextResponse.json(json, { status: res.status });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  const res = await phpFetch(`/content/${Number(id)}`, { method: "DELETE" });
  const json = await res.json().catch(() => ({ error: "Bad response from API" }));
  return NextResponse.json(json, { status: res.status });
}
