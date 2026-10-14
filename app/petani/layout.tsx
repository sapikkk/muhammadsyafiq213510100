import type { ReactNode } from "react";
import { RoleHome } from "@/components/role-home";
import { getStokRendahCount } from "@/lib/cached-queries";

export default async function PetaniLayout({ children }: { children: ReactNode }) {
  const stokRendahCount = await getStokRendahCount();
  return (
    <RoleHome role="PEKERJA" stokRendahCount={stokRendahCount}>
      {children}
    </RoleHome>
  );
}
