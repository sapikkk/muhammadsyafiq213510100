"use client";

import {
  pakaiActivePackAdmin,
  pakaiActivePackPetani,
} from "@/app/actions/active-pack";
import { ActivePackPakaiFormSheet } from "@/components/active-pack-pakai-form";
import { Button } from "@/components/ui/button";
import type { ActivePackListRow } from "@/lib/active-pack-types";

export function ActivePackDetailActions({
  row,
  mode,
}: {
  row: ActivePackListRow;
  mode: "admin" | "petani";
}) {
  const action = mode === "admin" ? pakaiActivePackAdmin : pakaiActivePackPetani;

  return (
    <ActivePackPakaiFormSheet
      packs={[row]}
      action={action}
      fixedPackId={row.id}
      trigger={
        <Button type="button" className="h-11">
          Pakai unit
        </Button>
      }
    />
  );
}
