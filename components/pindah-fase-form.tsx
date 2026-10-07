"use client";

import { useFormState } from "react-dom";
import { pindahFaseSiklus } from "@/app/actions/siklus";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { faseLabel, type FaseProduksi } from "@/lib/siklus-fase";

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

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <input type="hidden" name="siklusId" value={siklusId} />
      <p className="text-sm text-muted-foreground">
        Fase sekarang: <span className="font-medium text-foreground">{faseLabel[faseSaatIni]}</span>
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
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input type="checkbox" name="konfirmasi" required className="h-5 w-5 shrink-0" />
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
