import type { ReactNode } from "react";
import { RoleHome } from "@/components/role-home";
import { getStokRendahCount } from "@/lib/cached-queries";

export default async function PetaniLayout({ children }: { children: ReactNode }) {
  let stokRendahCount = 0;
  try {
    stokRendahCount = await getStokRendahCount();
  } catch {
    stokRendahCount = 0;
  }
  return (
    <RoleHome role="PEKERJA" stokRendahCount={stokRendahCount}>
      {children}
    </RoleHome>
  );
}
