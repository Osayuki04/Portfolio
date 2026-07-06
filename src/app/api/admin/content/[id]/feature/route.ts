import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { phpFetch } from "@/lib/phpApi";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getServerSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const res = await phpFetch(`/content/${Number(id)}/feature`, { method: "POST", body });
  const json = await res.json().catch(() => ({ error: "Bad response from API" }));
  return NextResponse.json(json, { status: res.status });
}
