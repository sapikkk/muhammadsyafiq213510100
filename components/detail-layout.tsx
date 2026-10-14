import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FinanceModuleNav } from "@/components/finance-module-nav";
import { DetailLayoutCoachFooter } from "@/components/detail-layout-coach-footer";
import { DetailLayoutToolbar } from "@/components/detail-layout-toolbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DetailLayoutProps = {
  backHref: string;
  backLabel?: string;
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  /** Aksi utama (fase, form) — strip penuh di bawah judul, di atas isi. */
  primaryActions?: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  className?: string;
  /** `sheet` = drill-down dalam panel samping (tanpa link kembali). */
  surface?: "page" | "sheet";
  financeNavRole?: "ADMIN" | "OWNER";
};

export function DetailLayout({
  backHref,
  backLabel = "Kembali ke daftar",
  title,
  description,
  badge,
  actions,
  primaryActions,
  children,
  extra,
  className,
  surface = "page",
  financeNavRole,
}: DetailLayoutProps) {
  const inSheet = surface === "sheet";

  return (
    <div className={cn("flex flex-col", inSheet ? "gap-5" : "gap-6", className)}>
      {financeNavRole && !inSheet ? <FinanceModuleNav role={financeNavRole} /> : null}
      <div className={cn(inSheet && "space-y-4")}>
        {inSheet ? null : (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 mb-3 min-h-11 gap-1.5 px-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Link href={backHref} scroll={false}>
              <ArrowLeft className="size-3.5" aria-hidden />
              <span>{backLabel}</span>
            </Link>
          </Button>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <header className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1
                className={cn(
                  "font-semibold tracking-tight text-foreground",
                  inSheet ? "text-xl leading-snug" : "text-2xl",
                )}
              >
                {title}
              </h1>
              {badge ? <div className="shrink-0">{badge}</div> : null}
            </div>
            {description ? (
              <div className="text-sm text-muted-foreground">{description}</div>
            ) : null}
          </header>
          <DetailLayoutToolbar actions={actions} />
        </div>

        {primaryActions ? (
          <div className="rounded-md border border-border bg-muted/15 p-3 sm:p-4">{primaryActions}</div>
        ) : null}
      </div>

      <div className={cn("flex flex-col", inSheet ? "gap-5" : "gap-6")}>{children}</div>

      {extra}
      {!inSheet ? <DetailLayoutCoachFooter /> : null}
    </div>
  );
}
