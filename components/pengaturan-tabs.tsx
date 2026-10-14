"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type PengaturanTab = {
  id: string;
  label: string;
  href: string;
};

const TABS_BASE: PengaturanTab[] = [
  { id: "profil", label: "Profil & sandi", href: "/pengaturan?bagian=profil" },
  { id: "notifikasi", label: "Notifikasi", href: "/pengaturan?bagian=notifikasi" },
];

const TAB_TIM: PengaturanTab = {
  id: "tim",
  label: "Tim & akun",
  href: "/pengaturan?bagian=tim",
};

function tabActive(pathname: string, searchParams: URLSearchParams, tab: PengaturanTab): boolean {
  if (pathname !== "/pengaturan") return false;
  const bagian = searchParams.get("bagian") || "profil";
  return tab.id === bagian;
}

export function PengaturanTabs({ showTimTab }: { showTimTab: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabs = showTimTab ? [...TABS_BASE, TAB_TIM] : TABS_BASE;

  return (
    <nav aria-label="Bagian pengaturan" className="overflow-x-auto border-b pb-2">
      <ul className="flex min-w-max gap-1">
        {tabs.map((tab) => {
          const active = tabActive(pathname, searchParams, tab);
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md border px-3 text-sm font-medium transition-colors",
                  active
                    ? "border-border bg-background text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
