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
  children,
  extra,
  className,
  surface = "page",
  financeNavRole,
}: DetailLayoutProps) {
  const inSheet = surface === "sheet";

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {financeNavRole && !inSheet ? <FinanceModuleNav role={financeNavRole} /> : null}
      <div>
        {inSheet ? null : (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 mb-3 min-h-11 gap-1.5 px-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Link href={backHref}>
              <ArrowLeft className="size-3.5" aria-hidden />
              <span>{backLabel}</span>
            </Link>
          </Button>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <header className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {badge ? <div>{badge}</div> : null}
            </div>
            {description ? (
              <div className="text-sm text-muted-foreground">{description}</div>
            ) : null}
          </header>
          <DetailLayoutToolbar actions={actions} />
        </div>
      </div>

      <div className="flex flex-col gap-6">{children}</div>

      {extra}
      {!inSheet ? <DetailLayoutCoachFooter /> : null}
    </div>
  );
}
