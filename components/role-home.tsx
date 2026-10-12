import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { AppShellLayout } from "@/components/app-shell-layout";
import { authOptions } from "@/lib/auth";
import { countNotifikasiBelumDibacaCached } from "@/lib/cached-queries";
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
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const notifikasiUnreadCount =
    userId != null ? await countNotifikasiBelumDibacaCached(userId) : 0;

  return (
    <AppShellLayout
      role={role}
      userName={name}
      stokRendahCount={stokRendahCount}
      notifikasiUnreadCount={notifikasiUnreadCount}
      auditShowAllNav={isAuditBypassRbac()}
    >
      {children}
    </AppShellLayout>
  );
}
