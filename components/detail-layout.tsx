import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DetailLayoutToolbar } from "@/components/detail-layout-toolbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DetailLayoutProps = {
  backHref: string;
  backLabel?: string;
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  className?: string;
  /** `sheet` = drill-down dalam panel samping (tanpa link kembali). */
  surface?: "page" | "sheet";
};

export function DetailLayout({
  backHref,
  backLabel = "Kembali ke daftar",
  title,
  description,
  eyebrow,
  badge,
  actions,
  children,
  extra,
  className,
  surface = "page",
}: DetailLayoutProps) {
  const inSheet = surface === "sheet";

  return (
    <div className={cn("flex flex-col", inSheet ? "gap-6" : "gap-8", className)}>
      <div>
        {inSheet ? null : (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 mb-3 h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Link href={backHref}>
              <ArrowLeft className="size-3.5" aria-hidden />
              <span>{backLabel}</span>
            </Link>
          </Button>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <header className="space-y-1.5">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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

      <div className="flex flex-col gap-8">{children}</div>

      {extra}
    </div>
  );
}
