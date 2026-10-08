"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  Box,
  ChevronRight,
  ClipboardList,
  Home,
  Layers,
  LayoutDashboard,
  LeafyGreen,
  LogOut,
  Package,
  Settings,
  Users,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/role";
import { roleLabel } from "@/types/role";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

function getNavItems(role: Role, stokRendahCount: number): NavItem[] {
  const alertItem: NavItem = {
    label: "Stok rendah",
    href: `/${role === "PEKERJA" ? "petani" : role === "ADMIN" ? "admin" : "owner"}/stok-rendah`,
    icon: TriangleAlert,
    badge: stokRendahCount > 0 ? stokRendahCount : undefined,
  };

  if (role === "ADMIN") {
    return [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Bagan akun", href: "/admin/akun", icon: BookOpen },
      { label: "Jurnal", href: "/admin/jurnal", icon: Layers },
      { label: "Inventaris", href: "/admin/inventaris", icon: Box },
      { label: "Active pack", href: "/admin/active-pack", icon: Package },
      {
        label: "Infrastruktur",
        href: "/admin/infrastruktur",
        icon: Home,
      },
      { label: "Varietas", href: "/admin/varietas", icon: LeafyGreen },
      { label: "Laporan panen", href: "/admin/harvest", icon: ClipboardList },
      alertItem,
    ];
  }

  if (role === "OWNER") {
    return [
      { label: "Dashboard", href: "/owner", icon: LayoutDashboard },
      { label: "Inventaris", href: "/owner/inventaris", icon: Box },
      {
        label: "Infrastruktur",
        href: "/owner/infrastruktur",
        icon: Home,
      },
      { label: "Varietas", href: "/owner/varietas", icon: LeafyGreen },
      alertItem,
    ];
  }

  // PEKERJA
  return [
    { label: "Dashboard", href: "/petani", icon: LayoutDashboard },
    { label: "Inventaris", href: "/petani/inventaris", icon: Box },
    { label: "Active pack", href: "/petani/active-pack", icon: Package },
    { label: "Varietas", href: "/petani/varietas", icon: LeafyGreen },
    { label: "Siklus", href: "/petani/siklus", icon: Layers },
    alertItem,
  ];
}

export function AppSidebar({
  role,
  userName,
  stokRendahCount = 0,
}: {
  role: Role;
  userName: string;
  stokRendahCount?: number;
}) {
  const pathname = usePathname();
  const navItems = getNavItems(role, stokRendahCount);

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-sidebar">
      {/* Logo / Brand */}
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
            <LeafyGreen className="h-4 w-4 text-background" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Kokonus Farm
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <p className="mb-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === pathname ||
              (item.href !== "/admin" &&
                item.href !== "/owner" &&
                item.href !== "/petani" &&
                pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                      {item.badge}
                    </span>
                  ) : null}
                  {isActive && (
                    <ChevronRight className="h-3 w-3 opacity-50" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer: user info + settings + logout */}
      <div className="border-t p-2">
        <div className="mb-1 flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold uppercase text-muted-foreground">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{userName}</p>
            <p className="truncate text-[10px] text-muted-foreground">
              {roleLabel[role]}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href="/pengaturan"
            className="flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Pengaturan</span>
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-xs">Keluar</span>
          </button>
        </div>
      </div>
    </aside>
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
      <AppSidebar
        role={role}
        userName={userName}
        stokRendahCount={stokRendahCount}
      />
    </div>
  );
}
