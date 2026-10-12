"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getFinanceModules, resolveFinanceModuleId, type FinanceModule } from "@/lib/finance-modules";
import { financeModuleIcon } from "@/lib/nav-icons";

export function FinanceModuleNav({ role }: { role: "ADMIN" | "OWNER" }) {
  const pathname = usePathname();
  const modules = getFinanceModules(role);
  const activeId = resolveFinanceModuleId(pathname, role);

  return (
    <nav
      aria-label="Modul keuangan"
      className="overflow-x-auto border-b bg-muted/30 pb-px"
    >
      <ul className="flex min-w-max gap-1 px-1 py-2">
        {modules.map((mod) => (
          <FinanceModuleNavItem key={mod.id} mod={mod} active={mod.id === activeId} />
        ))}
      </ul>
    </nav>
  );
}

function FinanceModuleNavItem({ mod, active }: { mod: FinanceModule; active: boolean }) {
  const Icon = financeModuleIcon(mod.id);
  return (
    <li>
      <Link
        href={mod.href}
        title={mod.hint}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium transition-colors",
          active
            ? "border-border bg-background text-foreground"
            : "text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground",
        )}
      >
        <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
        {mod.label}
      </Link>
    </li>
  );
}
