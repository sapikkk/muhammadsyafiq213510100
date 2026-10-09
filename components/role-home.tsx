import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { AppSidebar } from "@/components/app-sidebar";
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
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar
        role={role}
        userName={name}
        stokRendahCount={stokRendahCount}
        auditShowAllNav={isAuditBypassRbac()}
      />
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Top header bar */}
        <header className="flex h-14 shrink-0 items-center border-b bg-background px-6">
          <div>
            <p className="text-xs text-muted-foreground">{roleLabel[role]}</p>
            <h1 className="text-sm font-semibold leading-tight">{name}</h1>
          </div>
        </header>
        {/* Page content */}
        <div className="flex-1 p-6">
          <div className="mx-auto w-full max-w-5xl space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
