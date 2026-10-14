"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type OwnerBagianLink = {
  id: string;
  label: string;
  epic?: string;
  param: string;
  value: string;
};

export function OwnerBagianSubnav({
  basePath,
  paramName,
  links,
  defaultValue,
}: {
  basePath: string;
  paramName: string;
  links: OwnerBagianLink[];
  defaultValue: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get(paramName) ?? defaultValue;

  if (pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
    return null;
  }

  return (
    <nav aria-label="Bagian halaman" className="overflow-x-auto border-b pb-2">
      <ul className="flex min-w-max gap-1">
        {links.map((link) => {
          const active = current === link.value;
          const href = `${basePath}?${paramName}=${encodeURIComponent(link.value)}`;
          return (
            <li key={link.id}>
              <Link
                href={href}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors",
                  active
                    ? "border-border bg-background text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {link.epic ? (
                  <span className="text-[10px] tabular-nums text-muted-foreground">{link.epic}</span>
                ) : null}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
