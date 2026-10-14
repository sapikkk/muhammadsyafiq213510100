"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type OwnerSectionTab = {
  id: string;
  label: string;
  epic?: string;
  href: string;
};

function tabActive(pathname: string, searchParams: URLSearchParams, href: string): boolean {
  const [path, query] = href.split("?");
  const pathOk = pathname === path || pathname.startsWith(`${path}/`);
  if (!pathOk) return false;
  if (!query) {
    if (path === "/owner/varietas" && pathname === "/owner/varietas") {
      return searchParams.get("tampilan") !== "status";
    }
    if (pathname !== path) return pathname.startsWith(`${path}/`);
    return true;
  }
  const expected = new URLSearchParams(query);
  let ok = true;
  expected.forEach((v, k) => {
    if (searchParams.get(k) !== v) ok = false;
  });
  return ok;
}

export function OwnerSectionTabs({ tabs }: { tabs: OwnerSectionTab[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav aria-label="Bagian modul" className="overflow-x-auto border-b pb-2">
      <ul className="flex min-w-max gap-1">
        {tabs.map((tab) => {
          const active = tabActive(pathname, searchParams, tab.href);
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors",
                  active
                    ? "border-border bg-background text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {tab.epic ? (
                  <span className="text-[10px] tabular-nums text-muted-foreground">{tab.epic}</span>
                ) : null}
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
