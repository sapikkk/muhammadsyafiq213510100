"use client";

import { useFormState } from "react-dom";
import { simpanItemInventaris } from "@/app/actions/inventaris";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { satuanInventarisLabel, satuanInventarisList } from "@/lib/inventaris-satuan";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function InventarisItemForm() {
  const [state, formAction] = useFormState(simpanItemInventaris, {});

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-md border p-4"
      aria-labelledby="item-form-title"
    >
      <h2 id="item-form-title" className="text-lg font-semibold">
        Tambah item
      </h2>
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
        <span className="font-medium">Kode</span>
        <Input name="kode" required className="h-11" placeholder="BNH-SLAD" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Nama</span>
        <Input name="nama" required className="h-11" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Satuan</span>
        <select name="satuan" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih satuan
          </option>
          {satuanInventarisList.map((s) => (
            <option key={s} value={s}>
              {satuanInventarisLabel[s]}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Stok minimum (opsional)</span>
        <Input name="stokMinimum" className="h-11" inputMode="decimal" placeholder="0" />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan item
      </SubmitButton>
    </form>
  );
}
