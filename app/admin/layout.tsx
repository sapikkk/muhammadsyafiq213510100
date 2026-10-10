import type { ReactNode } from "react";
import { RoleHome } from "@/components/role-home";
import { getStokRendahCount } from "@/lib/cached-queries";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const stokRendahCount = await getStokRendahCount();
  return (
    <RoleHome role="ADMIN" stokRendahCount={stokRendahCount}>
      {children}
    </RoleHome>
  );
}
