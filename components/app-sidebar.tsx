"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getNavFlowGroups, type NavFlowGroup } from "@/lib/nav-flow";
import {
  isOwnerSidebarModuleActive,
  OWNER_SIDEBAR_MODULES,
} from "@/lib/owner-sidebar-nav";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { NotifikasiUnreadBadge } from "@/components/notifikasi-unread-badge";
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

function isNavActive(pathname: string, href: string, searchParams: URLSearchParams) {
  const [path, query] = href.split("?");
  if (path === "/admin" || path === "/owner" || path === "/petani") {
    if (pathname !== path) return false;
    return !query;
  }
  const pathOk = pathname === path || pathname.startsWith(`${path}/`);
  if (!pathOk) return false;
  if (!query) {
    return pathname === path;
  }
  const expected = new URLSearchParams(query);
  let match = true;
  expected.forEach((v, k) => {
    if (searchParams.get(k) !== v) match = false;
  });
  if (!match) return false;
  return true;
}

/** Satu highlight — cocokkan path + query (epic 3.x / 7.x). */
function pickActiveNavKey(
  pathname: string,
  searchParams: URLSearchParams,
  groups: NavFlowGroup[],
): string | null {
  for (const group of groups) {
    for (const item of group.items) {
      if (isNavActive(pathname, item.href, searchParams)) {
        return item.navKey ?? `${item.href}::${item.label}`;
      }
    }
  }
  return null;
}

export function AppSidebar({
  role,
  userName,
  stokRendahCount = 0,
  notifikasiUnreadCount = 0,
  auditShowAllNav = false,
  onNavigate,
}: {
  role: Role;
  userName: string;
  stokRendahCount?: number;
  notifikasiUnreadCount?: number;
  auditShowAllNav?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groups = auditShowAllNav ? null : getNavFlowGroups(role, stokRendahCount);
  const flatAudit = auditShowAllNav ? getAuditNavItems(stokRendahCount) : null;
  const activeNavKey =
    groups && !flatAudit ? pickActiveNavKey(pathname, searchParams, groups) : null;

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-sidebar">
      <div className="flex h-14 shrink-0 items-center border-b px-4">
        <Link
          href={role === "OWNER" ? "/owner" : "/"}
          className="flex items-center gap-2"
          onClick={() => onNavigate?.()}
        >
          <KokonusBrandMark size={28} className="rounded-md" />
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
                active={isNavActive(pathname, item.href, searchParams)}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        ) : role === "OWNER" ? (
          <ul className="space-y-0.5">
            {OWNER_SIDEBAR_MODULES.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isOwnerSidebarModuleActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        ) : (
          groups!.map((group) => (
            <NavFlowGroup
              key={group.id}
              group={group}
              pathname={pathname}
              activeNavKey={activeNavKey}
              onNavigate={onNavigate}
            />
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
            <p className="truncate text-xs text-muted-foreground">{roleLabel[role]}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href="/pengaturan?bagian=notifikasi"
            onClick={() => onNavigate?.()}
            className="relative flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4 shrink-0" />
            Pengaturan
            <NotifikasiUnreadBadge count={notifikasiUnreadCount} />
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

function NavFlowGroup({
  group,
  pathname,
  activeNavKey,
  onNavigate,
}: {
  group: NavFlowGroup;
  pathname: string;
  activeNavKey: string | null;
  onNavigate?: () => void;
}) {
  const searchParams = useSearchParams();
  const hasActive = group.items.some((item) =>
    isNavActive(pathname, item.href, searchParams),
  );
  const [open, setOpen] = useState(hasActive);

  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  return (
    <div className="mb-2 last:mb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-9 w-full items-center justify-between rounded-md px-2.5 text-left text-xs font-semibold tracking-tight transition-colors",
          open ? "bg-sidebar-accent/70 text-foreground" : "text-foreground hover:bg-sidebar-accent/50",
        )}
        aria-expanded={open}
      >
        <span className="leading-snug">{group.title}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 shrink-0 opacity-60 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <ul className="ml-2 mt-1 space-y-0.5 border-l-2 border-border/70 pl-2">
          {group.items.map((item) => {
            const key = item.navKey ?? `${item.href}::${item.label}`;
            return (
              <NavLink
                key={key}
                item={item}
                active={activeNavKey === key}
                muted={
                  activeNavKey !== key && isNavActive(pathname, item.href, searchParams)
                }
                onNavigate={onNavigate}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function NavLink({
  item,
  active,
  muted = false,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  muted?: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        onClick={() => onNavigate?.()}
        className={cn(
          "flex min-h-11 items-start gap-2 rounded-md px-2 py-1.5 text-sm leading-snug transition-colors",
          active
            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground ring-1 ring-border/80"
            : muted
              ? "text-muted-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        )}
      >
        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" />
        <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-1.5 gap-y-0">
          {item.epicCode ? (
            <span className="shrink-0 tabular-nums text-[10px] font-semibold text-muted-foreground">
              {item.epicCode}
            </span>
          ) : null}
          <span>{item.label}</span>
        </span>
        {item.badge ? (
          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center border border-current px-1 text-[10px] font-semibold">
            {item.badge}
          </span>
        ) : null}
        {active ? <ChevronRight className="mt-1 h-3 w-3 shrink-0 opacity-50" /> : null}
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
