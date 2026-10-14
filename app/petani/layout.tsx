import type { ReactNode } from "react";
import { Suspense } from "react";
import { PetaniUrlToast } from "@/components/petani-url-toast";
import { RoleHome } from "@/components/role-home";
import { getStokRendahCount } from "@/lib/cached-queries";

export default async function PetaniLayout({ children }: { children: ReactNode }) {
  const stokRendahCount = await getStokRendahCount();
  return (
    <RoleHome role="PEKERJA" stokRendahCount={stokRendahCount}>
      <Suspense fallback={null}>
        <PetaniUrlToast />
      </Suspense>
      {children}
    </RoleHome>
  );
}
