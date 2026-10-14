import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PengaturanTabs } from "@/components/pengaturan-tabs";
import { RoleHome } from "@/components/role-home";
import { authOptions } from "@/lib/auth";
import { getStokRendahCount } from "@/lib/cached-queries";
import type { Role } from "@/types/role";

function roleFromSession(raw: string | undefined): Role | null {
  if (raw === "OWNER" || raw === "ADMIN" || raw === "PEKERJA") return raw;
  return null;
}

export default async function PengaturanLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = roleFromSession(session?.user?.role);
  if (!role) redirect("/login");

  const showTimTab = role === "OWNER";
  let stokRendahCount = 0;
  try {
    stokRendahCount = await getStokRendahCount();
  } catch {
    stokRendahCount = 0;
  }

  return (
    <RoleHome role={role} stokRendahCount={stokRendahCount}>
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <Suspense fallback={null}>
          <PengaturanTabs showTimTab={showTimTab} />
        </Suspense>
        {children}
      </div>
    </RoleHome>
  );
}
