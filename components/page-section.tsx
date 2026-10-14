import type { ReactNode } from "react";
import { pageLeadClass, sectionTitleClass } from "@/lib/ui-typography";
import { cn } from "@/lib/utils";

export function PageSection({
  title,
  description,
  badge,
  children,
  className,
  id,
}: {
  title?: string;
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
    <section
      id={id}
      className={cn("min-w-0 max-w-full space-y-4", className)}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      {title || badgeLabel ? (
        <div className="flex flex-wrap items-baseline gap-2">
          {title ? (
            <h2 id={id ? `${id}-title` : undefined} className={sectionTitleClass}>
              {title}
            </h2>
          ) : null}
          {badgeLabel ? (
            <span className="rounded border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {badgeLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      {description ? <p className={pageLeadClass}>{description}</p> : null}
      {children}
    </section>
  );
}
