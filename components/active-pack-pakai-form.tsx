"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { formatQty, formatRupiah } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { ActivePack, ItemInventaris } from "@prisma/client";

type PackAktif = ActivePack & {
  item: Pick<ItemInventaris, "kode" | "nama" | "satuan">;
};

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export function ActivePackPakaiForm({
  packs,
  action,
}: {
  packs: PackAktif[];
  action: (
    prev: { error?: string; ok?: string },
    formData: FormData,
  ) => Promise<{ error?: string; ok?: string }>;
}) {
  const [state, formAction] = useFormState(action, {});
  const aktif = packs.filter((p) => p.status === "AKTIF");

  if (aktif.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Tidak ada pack aktif untuk dipakai.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">Pakai unit dari pack</h2>
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-primary" role="status">
          {state.ok}
        </p>
      ) : null}
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Pack</span>
        <select name="id" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih pack aktif
          </option>
          {aktif.map((p) => (
            <option key={p.id} value={p.id}>
              {p.kode} — sisa {formatQty(p.sisaUnit)}{" "}
              {satuanInventarisLabel[p.item.satuan]} @{" "}
              {formatRupiah(p.biayaPerUnit)}/unit
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah pakai</span>
        <Input name="jumlah" required className="h-11" inputMode="decimal" />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Catat pemakaian
      </SubmitButton>
    </form>
  );
}
