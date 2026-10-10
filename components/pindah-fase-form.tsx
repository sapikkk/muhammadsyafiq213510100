"use client";

import { useFormState } from "react-dom";
import { pindahFaseSiklus } from "@/app/actions/siklus";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { faseLabel, type FaseProduksi } from "@/lib/siklus-fase";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PindahFaseForm({
  siklusId,
  faseSaatIni,
  faseBerikutnya,
}: {
  siklusId: number;
  faseSaatIni: FaseProduksi;
  faseBerikutnya: FaseProduksi;
}) {
  const [state, formAction] = useFormState(pindahFaseSiklus, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-md border-2 border-foreground p-4 shadow-sm"
      aria-label={`Lanjut fase ke ${faseLabel[faseBerikutnya]}`}
    >
      <input type="hidden" name="siklusId" value={siklusId} />
      <p className="text-sm text-muted-foreground">
        Fase sekarang: <span className="font-medium text-foreground">{faseLabel[faseSaatIni]}</span>
      </p>
      <label className="flex min-h-12 items-center gap-3 text-sm">
        <input
          type="checkbox"
          name="konfirmasi"
          required
          className="h-6 w-6 shrink-0 accent-foreground"
        />
        <span>Saya yakin ingin lanjut ke fase {faseLabel[faseBerikutnya]}.</span>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" className="h-11" maxLength={255} />
      </label>
      <SubmitButton className="h-14 w-full text-base" pendingLabel="Menyimpan...">
        Lanjut ke {faseLabel[faseBerikutnya]}
      </SubmitButton>
    </form>
  );
}
