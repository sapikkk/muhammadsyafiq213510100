"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/** Sembunyikan tabel berat di sheet/detail — buka lewat tombol. */
export function TableSectionDisclosure({
  count,
  closedLabel,
  openLabel = "Sembunyikan tabel",
  children,
  startOpen = false,
}: {
  count: number;
  closedLabel: string;
  openLabel?: string;
  children: ReactNode;
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen);

  if (count === 0) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-11 w-full sm:w-fit"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? openLabel : closedLabel}
      </Button>
      {open ? children : null}
    </div>
  );
}
