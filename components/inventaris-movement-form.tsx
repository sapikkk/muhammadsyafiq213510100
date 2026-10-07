"use client";

import { useFormState } from "react-dom";
import type { ItemInventaris } from "@prisma/client";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { tipePergerakanLabel, tipePergerakanList } from "@/lib/inventaris-pergerakan";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function InventarisMovementForm({
  items,
  action,
}: {
  items: ItemInventaris[];
  action: (
    prev: { error?: string; ok?: string },
    formData: FormData,
  ) => Promise<{ error?: string; ok?: string }>;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-md border p-4"
      aria-labelledby="movement-form-title"
    >
      <h2 id="movement-form-title" className="text-lg font-semibold">
        Catat pergerakan
      </h2>
      <p className="text-sm text-muted-foreground">
        Masuk menambah stok, Keluar mengurangi, Penyesuaian mengatur stok ke
        jumlah fisik (wajib keterangan).
      </p>
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
        <span className="font-medium">Item</span>
        <select name="itemId" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih item
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.kode} — {item.nama} ({satuanInventarisLabel[item.satuan]})
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tipe</span>
        <select name="tipe" required className={selectClass} defaultValue="OUT">
          {tipePergerakanList.map((t) => (
            <option key={t} value={t}>
              {tipePergerakanLabel[t]}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah</span>
        <Input name="jumlah" required className="h-11" inputMode="decimal" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Keterangan</span>
        <Input name="keterangan" className="h-11" maxLength={255} />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan pergerakan
      </SubmitButton>
    </form>
  );
}
