"use client";

import {
  catatPergerakanAdmin,
  catatPergerakanPetani,
} from "@/app/actions/inventaris";
import {
  InventarisMovementFormSheet,
  type InventarisMovementItemOption,
} from "@/components/inventaris-movement-form";
import { Button } from "@/components/ui/button";
import type { SerializedItemInventaris } from "@/lib/inventaris-types";

export function InventarisDetailActions({
  item,
  mode,
}: {
  item: SerializedItemInventaris;
  mode: "admin" | "petani";
}) {
  const option: InventarisMovementItemOption = {
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    satuan: item.satuan,
  };
  const action = mode === "admin" ? catatPergerakanAdmin : catatPergerakanPetani;

  return (
    <InventarisMovementFormSheet
      items={[option]}
      action={action}
      fixedItemId={item.id}
      trigger={
        <Button type="button" className="h-11">
          Catat pergerakan
        </Button>
      }
    />
  );
}
