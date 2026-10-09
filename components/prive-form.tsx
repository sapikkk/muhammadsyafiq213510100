"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { submitPrive, type PriveState } from "@/app/actions/prive";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { notify } from "@/lib/notify";

export function PriveForm({ defaultTanggal }: { defaultTanggal: string }) {
  const [state, formAction] = useFormState(submitPrive, {} as PriveState);

  useEffect(() => {
    if (state.error) notify.error(state.error);
    if (state.ok && state.jurnalId) {
      notify.success(`Jurnal prive #${state.jurnalId} menunggu persetujuan Admin.`);
    }
  }, [state.error, state.ok, state.jurnalId]);

  return (
    <form action={formAction} className="max-w-md space-y-4 rounded-md border p-4">
      <p className="text-sm text-muted-foreground">
        Mencatat jurnal PENDING: debit Prive (3200), kredit Kas (1100). Admin menyetujui seperti jurnal lain.
      </p>
      {state.error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">{state.error}</p>
      ) : null}
      {state.ok ? (
        <p className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm">
          Jurnal #{state.jurnalId} menunggu persetujuan Admin.
        </p>
      ) : null}
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tanggal</span>
        <Input name="tanggal" type="date" defaultValue={defaultTanggal} className="h-11" required />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Nominal (Rp)</span>
        <Input name="nominal" inputMode="decimal" className="h-11" required placeholder="500000" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" className="h-11" maxLength={200} placeholder="Keperluan pribadi" />
      </label>
      <SubmitButton pendingLabel="Menyimpan…">Kirim jurnal prive</SubmitButton>
    </form>
  );
}
