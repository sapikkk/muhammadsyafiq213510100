"use client";

import { useFormState } from "react-dom";
import { catatPenyusutanBulanAction } from "@/app/actions/penyusutan";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PenyusutanBulanForm({ defaultBulan }: { defaultBulan: string }) {
  const [state, formAction] = useFormState(catatPenyusutanBulanAction, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="max-w-md space-y-4 rounded-md border p-4">
      <p className="text-sm text-muted-foreground">
        Mencatat penyusutan greenhouse dan listrik untuk bulan yang dipilih. Biasanya sekali
        per bulan; langsung disetujui otomatis.
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Bulan</span>
        <Input name="bulan" type="month" defaultValue={defaultBulan} className="h-11" required />
      </label>
      <SubmitButton className="h-11" pendingLabel="Mencatat…">
        Catat penyusutan bulan ini
      </SubmitButton>
    </form>
  );
}
