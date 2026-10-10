import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageSection({
  title,
  description,
  badge,
  children,
  className,
  id,
}: {
  title: string;
  description?: string;
  badge?: "Read" | "Create" | "Update" | "Delete";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const badgeLabel =
    badge === "Create"
      ? "Buat"
      : badge === "Update"
        ? "Ubah"
        : badge === "Delete"
          ? "Hapus"
          : badge === "Read"
            ? "Lihat"
            : null;

  return (
    <section id={id} className={cn("space-y-4", className)} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 id={id ? `${id}-title` : undefined} className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {badgeLabel ? (
          <span className="rounded border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {badgeLabel}
          </span>
        ) : null}
      </div>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </section>
  );
}
