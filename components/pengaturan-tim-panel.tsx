"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const SUB = [
  { id: "petani", label: "Data petani", href: "/pengaturan?bagian=tim&tim=petani" },
  { id: "pengguna", label: "Kelola akun login", href: "/pengaturan?bagian=tim&tim=pengguna" },
] as const;

export function PengaturanTimSubnav() {
  const searchParams = useSearchParams();
  const tim = searchParams.get("tim") || "petani";

  return (
    <nav aria-label="Tim lapangan" className="border-b pb-2">
      <ul className="flex flex-wrap gap-1">
        {SUB.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "inline-flex min-h-10 items-center rounded-md border px-3 text-sm font-medium transition-colors",
                tim === item.id
                  ? "border-border bg-background text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
