import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { importMetadata } from "@/lib/importMeta";

export async function POST(req: Request) {
  if (!(await getServerSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { url?: string };
  const url = String(body.url ?? "").trim();
  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "A valid URL is required." }, { status: 422 });
  }
  const draft = await importMetadata(url);
  return NextResponse.json({ draft });
}
