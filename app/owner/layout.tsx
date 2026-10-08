import type { ReactNode } from "react";
import { RoleHome } from "@/components/role-home";
import { listAlertStokMinimum } from "@/lib/inventaris";

export default async function OwnerLayout({ children }: { children: ReactNode }) {
  const stokRendah = await listAlertStokMinimum();
  return (
    <RoleHome role="OWNER" stokRendahCount={stokRendah.length}>
      {children}
    </RoleHome>
  );
}
