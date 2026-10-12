"use client";

import { useFormState } from "react-dom";
import { submitAbortSiklus } from "@/app/actions/siklus-abort";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { Input } from "@/components/ui/input";
import { DetailKodeStrip } from "@/components/detail-kode-strip";

export function SiklusAbortForm({
  siklusId,
  siklusLabel,
  kodeBatch,
}: {
  siklusId: number;
  siklusLabel: string;
  kodeBatch: string;
}) {
  const [state, formAction] = useFormState(submitAbortSiklus, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <section
      aria-labelledby="abort-siklus-title"
      className="space-y-3 rounded-md border border-destructive/40 bg-destructive/5 p-4"
    >
      <h2 id="abort-siklus-title" className="text-lg font-semibold text-destructive">
        Batalkan gagal total
      </h2>
      <p className="text-sm text-muted-foreground">
        Siklus <strong>{siklusLabel}</strong> dihentikan. Biaya siklus (WIP) dipindah ke beban
        gagal produksi — siklus tidak lanjut panen. Berbeda dengan log kegagalan sebagian
        (klasifikasi susut).
      </p>
      <DetailKodeStrip label="Kode batch" kode={kodeBatch} />
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="siklusId" value={siklusId} />
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Alasan</span>
          <Input name="alasan" required minLength={5} maxLength={500} className="h-11" />
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="konfirmasi" className="mt-1" />
          <span>Saya yakin seluruh siklus gagal total dan tidak akan dipanen.</span>
        </label>
        {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        <SubmitButton pendingLabel="Memproses…" variant="destructive">
          Batalkan siklus
        </SubmitButton>
      </form>
    </section>
  );
}
