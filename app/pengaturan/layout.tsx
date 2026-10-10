import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SessionShell } from "@/components/session-shell";
import { authOptions } from "@/lib/auth";

export default async function PengaturanLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) redirect("/login");
  return <SessionShell>{children}</SessionShell>;
}
