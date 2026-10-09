import type { ReactNode } from "react";
import { RoleHome } from "@/components/role-home";
import { listAlertStokMinimum } from "@/lib/inventaris";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const stokRendah = await listAlertStokMinimum();
  return (
    <RoleHome role="ADMIN" stokRendahCount={stokRendah.length}>
      {children}
    </RoleHome>
  );
}
