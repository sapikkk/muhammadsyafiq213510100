"use client";

import { Filter } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormSheet } from "@/components/form-sheet";
import { cn } from "@/lib/utils";

export function ListFilterSheet({
  title = "Filter",
  description,
  children,
  active,
}: {
  title?: string;
  description?: string;
  children: ReactNode | ((close: () => void) => ReactNode);
  /** Tampilkan titik jika filter sedang aktif. */
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FormSheet
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="max-h-[85vh] overflow-y-auto"
      trigger={
        <Button type="button" variant="outline" className="relative h-11 gap-2">
          <Filter className="size-4" aria-hidden />
          Filter
          {active ? (
            <span
              className={cn(
                "absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary",
              )}
              aria-hidden
            />
          ) : null}
        </Button>
      }
    >
      <div>{typeof children === "function" ? children(() => setOpen(false)) : children}</div>
    </FormSheet>
  );
}
