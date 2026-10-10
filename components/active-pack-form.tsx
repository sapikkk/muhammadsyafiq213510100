"use client";

import { useFormState } from "react-dom";
import type { ItemInventaris } from "@prisma/client";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function ActivePackForm({
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
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">Buka active pack baru</h2>
      <p className="text-sm text-muted-foreground">
        Biaya per unit = harga pack ÷ jumlah unit. Status Habis otomatis saat
        sisa 0.
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Kode pack</span>
        <Input name="kode" required className="h-11" placeholder="AP-BNH-01" />
      </label>
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
        <span className="font-medium">Harga pack (Rp)</span>
        <Input name="hargaPack" required className="h-11" inputMode="decimal" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah unit dalam pack</span>
        <Input name="jumlahUnit" required className="h-11" inputMode="decimal" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Keterangan (opsional)</span>
        <Input name="keterangan" className="h-11" maxLength={255} />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan pack
      </SubmitButton>
    </form>
  );
}
