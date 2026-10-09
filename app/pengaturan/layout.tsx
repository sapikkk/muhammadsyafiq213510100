import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { RoleHome } from "@/components/role-home";
import { authOptions } from "@/lib/auth";
import { listAlertStokMinimum } from "@/lib/inventaris";
import type { Role } from "@/types/role";

export default async function PengaturanLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) redirect("/login");
  const role = session.user.role as Role;
  const stokRendah = await listAlertStokMinimum();
  return (
    <RoleHome role={role} stokRendahCount={stokRendah.length}>
      {children}
    </RoleHome>
  );
}
