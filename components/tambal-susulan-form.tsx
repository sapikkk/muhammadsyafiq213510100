"use client";

import { useFormState } from "react-dom";
import { submitTambalSusulan } from "@/app/actions/tambal";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

type PackOption = {
  id: number;
  kode: string;
  itemNama: string;
  satuan: string;
  sisaUnit: string;
};

export function TambalSusulanForm({
  siklusId,
  packs,
}: {
  siklusId: number;
  packs: PackOption[];
}) {
  const [state, formAction] = useFormState(submitTambalSusulan, {});
  useActionToast({ error: state.error, ok: state.ok });

  if (packs.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Tidak ada active pack — tambal butuh pack benih/media aktif.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <input type="hidden" name="siklusId" value={siklusId} />
      <h2 className="text-lg font-semibold">Tambal susulan</h2>
      <p className="text-sm text-muted-foreground">
        Ganti bibit/media gagal dari active pack. Susut batch disesuaikan otomatis.
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Active pack</span>
        <select
          name="activePackId"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {packs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.kode} — {p.itemNama} (sisa {p.sisaUnit} {p.satuan})
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Jumlah pakai pack</span>
          <Input name="jumlahPakai" required className="h-11" inputMode="decimal" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Jumlah bibit ditambal</span>
          <Input name="jumlahBibit" required className="h-11" inputMode="numeric" />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" className="h-11" maxLength={255} />
      </label>

      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Catat tambal
      </SubmitButton>
    </form>
  );
}
