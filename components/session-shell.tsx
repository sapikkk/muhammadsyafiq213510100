import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { RoleHome } from "@/components/role-home";
import { authOptions } from "@/lib/auth";
import { listAlertStokMinimum } from "@/lib/inventaris";
import type { Role } from "@/types/role";

/** Wraps content in RoleHome when the user is logged in. */
export async function SessionShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) {
    return <>{children}</>;
  }
  const role = session.user.role as Role;
  const stokRendah = await listAlertStokMinimum();
  return (
    <RoleHome role={role} stokRendahCount={stokRendah.length}>
      {children}
    </RoleHome>
  );
}
