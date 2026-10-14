import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "@/lib/nav-items";
import { cn } from "@/lib/utils";

export function DashboardNavGrid({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Menu aplikasi"
      className={cn(
        "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            className="flex min-h-11 items-center gap-3 rounded-md border border-border px-3 py-2.5 transition-colors hover:bg-muted/40"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted/30 text-muted-foreground"
              aria-hidden
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">
              {item.label}
            </span>
            {item.badge != null && item.badge > 0 ? (
              <Badge variant="secondary" className="shrink-0 tabular-nums">
                {item.badge}
              </Badge>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
