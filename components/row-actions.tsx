import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type RowActionsProps = {
  viewHref?: string;
  onView?: () => void;
  viewLabel?: string;
  onEdit?: () => void;
  editLabel?: string;
  editTrigger?: ReactNode;
  onDeactivate?: () => void;
  deactivateLabel?: string;
  deactivateTrigger?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function RowActions({
  viewHref,
  onView,
  viewLabel = "Lihat",
  onEdit,
  editLabel = "Ubah",
  editTrigger,
  onDeactivate,
  deactivateLabel = "Nonaktifkan",
  deactivateTrigger,
  children,
  className,
}: RowActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-1.5 whitespace-nowrap",
        className,
      )}
    >
      {viewHref ? (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs"
        >
          <Link href={viewHref}>{viewLabel}</Link>
        </Button>
      ) : onView ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs"
          onClick={onView}
        >
          {viewLabel}
        </Button>
      ) : null}

      {editTrigger ? (
        editTrigger
      ) : onEdit ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs"
          onClick={onEdit}
        >
          {editLabel}
        </Button>
      ) : null}

      {deactivateTrigger ? (
        deactivateTrigger
      ) : onDeactivate ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-destructive hover:bg-destructive/10"
          onClick={onDeactivate}
        >
          {deactivateLabel}
        </Button>
      ) : null}

      {children}
    </div>
  );
}
