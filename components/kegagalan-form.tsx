"use client";

import { useFormState } from "react-dom";
import { submitLogKegagalan } from "@/app/actions/kegagalan";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { tahapKegagalanOptions } from "@/lib/kegagalan-labels";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function KegagalanForm({
  siklusId,
  jumlahDisemai,
  totalSusut,
}: {
  siklusId: number;
  jumlahDisemai: number;
  totalSusut: number;
}) {
  const [state, formAction] = useFormState(submitLogKegagalan, {});
  useActionToast({ error: state.error, ok: state.ok });
  const sisa = jumlahDisemai - totalSusut;

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <input type="hidden" name="siklusId" value={siklusId} />
      <h2 className="text-lg font-semibold">Catat kegagalan</h2>
      <p className="text-sm text-muted-foreground">
        Disemai {jumlahDisemai} bibit · susut terkumpul {totalSusut} · sisa kapasitas catat{" "}
        {sisa}.
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tahap</span>
        <select
          name="tahap"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {tahapKegagalanOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Jumlah gagal (pohon/biji)</span>
          <Input name="jumlahGagal" required className="h-11" inputMode="numeric" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Hari hidup sejak semai</span>
          <Input name="hariHidup" required className="h-11" inputMode="numeric" defaultValue={0} />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Penyebab</span>
        <textarea
          name="penyebab"
          required
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Contoh: jamur di rockwool, suhu naik"
        />
      </label>

      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan log kegagalan
      </SubmitButton>
    </form>
  );
}
