import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { AppShellLayout } from "@/components/app-shell-layout";
import { authOptions } from "@/lib/auth";
import { isAuditBypassRbac } from "@/lib/rbac";
import { roleLabel, type Role } from "@/types/role";

export async function RoleHome({
  role,
  children,
  stokRendahCount = 0,
}: {
  role: Role;
  children?: ReactNode;
  stokRendahCount?: number;
}) {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || roleLabel[role];

  return (
    <AppShellLayout
      role={role}
      userName={name}
      stokRendahCount={stokRendahCount}
      auditShowAllNav={isAuditBypassRbac()}
    >
      {children}
    </AppShellLayout>
  );
}
