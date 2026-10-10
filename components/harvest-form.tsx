"use client";

import { useFormState } from "react-dom";
import { submitHarvestReport } from "@/app/actions/harvest";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function HarvestForm({ siklusId, jumlahDisemai }: { siklusId: number; jumlahDisemai: number }) {
  const [state, formAction] = useFormState(submitHarvestReport, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <input type="hidden" name="siklusId" value={siklusId} />
      <h2 className="text-lg font-semibold">Laporan panen & sortasi</h2>
      <p className="text-sm text-muted-foreground">
        Batch disemai {jumlahDisemai} bibit. Isi hasil sortasi layak vs tidak layak (satu laporan
        per batch).
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Jumlah layak jual (pohon)</span>
          <Input name="jumlahLayak" required className="h-11" inputMode="numeric" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Jumlah tidak layak (pohon)</span>
          <Input name="jumlahTidakLayak" required className="h-11" inputMode="numeric" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Berat layak (gram)</span>
          <Input name="beratLayakGram" required className="h-11" inputMode="decimal" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Berat tidak layak (gram)</span>
          <Input name="beratTidakLayakGram" required className="h-11" inputMode="decimal" />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" className="h-11" maxLength={500} />
      </label>

      <SubmitButton className="h-11" pendingLabel="Mengirim...">
        Kirim laporan panen
      </SubmitButton>
    </form>
  );
}
