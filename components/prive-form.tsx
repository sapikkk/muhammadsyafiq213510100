"use client";

import { useFormState } from "react-dom";
import { submitPrive, type PriveState } from "@/app/actions/prive";
import { KasSumberSelect } from "@/components/kas-sumber-select";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PriveForm({ defaultTanggal }: { defaultTanggal: string }) {
  const [state, formAction] = useFormState(submitPrive, {} as PriveState);
  useActionToast({
    error: state.error,
    message:
      state.ok && state.jurnalId
        ? `Jurnal prive #${state.jurnalId} menunggu persetujuan Admin.`
        : undefined,
  });

  return (
    <form action={formAction} className="max-w-md space-y-4 rounded-md border p-4">
      <p className="text-sm text-muted-foreground">
        Jurnal PENDING: debit Prive (3200), kredit Kas tunai atau Bank. Admin menyetujui seperti jurnal lain.
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tanggal</span>
        <Input name="tanggal" type="date" defaultValue={defaultTanggal} className="h-11" required />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Nominal (Rp)</span>
        <Input name="nominal" inputMode="decimal" className="h-11" required placeholder="500000" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Sumber kas</span>
        <KasSumberSelect className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" className="h-11" maxLength={200} placeholder="Keperluan pribadi" />
      </label>
      <SubmitButton pendingLabel="Menyimpan…">Kirim jurnal prive</SubmitButton>
    </form>
  );
}
