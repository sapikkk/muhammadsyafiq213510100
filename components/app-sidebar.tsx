"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronRight, LeafyGreen, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNavFlowGroups } from "@/lib/nav-flow";
import { getNavItems, type NavItem } from "@/lib/nav-items";
import type { Role } from "@/types/role";
import { roleLabel } from "@/types/role";

function getAuditNavItems(stokRendahCount: number): NavItem[] {
  const seen = new Set<string>();
  const items: NavItem[] = [];
  for (const r of ["OWNER", "ADMIN", "PEKERJA"] as Role[]) {
    for (const item of getNavItems(r, stokRendahCount)) {
      if (seen.has(item.href)) continue;
      seen.add(item.href);
      items.push({
        ...item,
        label: `${roleLabel[r]} · ${item.label}`,
      });
    }
  }
  return items;
}

function isNavActive(pathname: string, href: string) {
  if (href === pathname) return true;
  if (href === "/admin" || href === "/owner" || href === "/petani") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export function AppSidebar({
  role,
  userName,
  stokRendahCount = 0,
  auditShowAllNav = false,
  onNavigate,
}: {
  role: Role;
  userName: string;
  stokRendahCount?: number;
  auditShowAllNav?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const groups = auditShowAllNav ? null : getNavFlowGroups(role, stokRendahCount);
  const flatAudit = auditShowAllNav ? getAuditNavItems(stokRendahCount) : null;

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-sidebar">
      <div className="flex h-14 shrink-0 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => onNavigate?.()}>
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
            <LeafyGreen className="h-4 w-4 text-background" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Kokonus Farm</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Menu utama">
        {flatAudit ? (
          <ul className="space-y-0.5">
            {flatAudit.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isNavActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        ) : (
          groups!.map((group) => (
            <div key={group.id} className="mb-5 last:mb-2">
              <div className="mb-1.5 px-2">
                <p className="text-xs font-semibold tracking-tight text-foreground">{group.title}</p>
                <p className="text-[11px] leading-snug text-muted-foreground">{group.hint}</p>
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={isNavActive(pathname, item.href)}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </div>
          ))
        )}
      </nav>

      <div className="shrink-0 border-t p-2">
        <div className="mb-1 flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold uppercase">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{userName}</p>
            <p className="truncate text-[11px] text-muted-foreground">{roleLabel[role]}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href="/pengaturan"
            onClick={() => onNavigate?.()}
            className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4 shrink-0" />
            Pengaturan
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Keluar
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        onClick={() => onNavigate?.()}
        className={cn(
          "flex min-h-10 items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0 opacity-90" />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge ? (
          <span className="flex h-5 min-w-5 items-center justify-center border border-current px-1 text-[10px] font-semibold">
            {item.badge}
          </span>
        ) : null}
        {active ? <ChevronRight className="h-3 w-3 shrink-0 opacity-60" /> : null}
      </Link>
    </li>
  );
}

export function AppSidebarUsers({
  role,
  userName,
  stokRendahCount = 0,
}: {
  role: Role;
  userName: string;
  stokRendahCount?: number;
}) {
  return (
    <div className="hidden md:flex">
      <AppSidebar role={role} userName={userName} stokRendahCount={stokRendahCount} />
    </div>
  );
}
