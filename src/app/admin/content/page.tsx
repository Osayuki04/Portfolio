import type { Metadata } from "next";
import { AdminContent } from "@/components/admin/AdminContent";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { getServerSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Content Admin",
  robots: { index: false, follow: false },
};

// Auth-gated: this route never renders the admin UI without a valid session.
export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await getServerSession();
  if (!session) return <AdminLogin />;
  return <AdminContent username={session.username} />;
}
