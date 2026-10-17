"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function EntityChangeHistoryDisclosure({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (count === 0) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-11 w-full shadow-none sm:w-fit"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Sembunyikan riwayat perubahan" : `Tampilkan riwayat perubahan (${count})`}
      </Button>
      {open ? children : null}
    </div>
  );
}
