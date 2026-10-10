import type { ReactNode } from "react";
import { RoleHome } from "@/components/role-home";
import { getStokRendahCount } from "@/lib/cached-queries";

export default async function OwnerLayout({ children }: { children: ReactNode }) {
  const stokRendahCount = await getStokRendahCount();
  return (
    <RoleHome role="OWNER" stokRendahCount={stokRendahCount}>
      {children}
    </RoleHome>
  );
}
