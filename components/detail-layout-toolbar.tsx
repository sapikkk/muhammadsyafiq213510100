"use client";

import type { ReactNode } from "react";

export function DetailLayoutToolbar({ actions }: { actions?: ReactNode }) {
  if (!actions) return null;
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5">
      {actions}
    </div>
  );
}
