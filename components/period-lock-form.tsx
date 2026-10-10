"use client";

import { useFormState } from "react-dom";
import {
  updatePeriodeTutupAction,
  type PeriodLockState,
} from "@/app/actions/period-lock";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PeriodLockForm({ periodeTutup }: { periodeTutup: string | null }) {
  const [state, formAction] = useFormState(updatePeriodeTutupAction, {} as PeriodLockState);
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="max-w-md space-y-4 rounded-md border p-4">
      <p className="text-sm text-muted-foreground">
        Aktif:{" "}
        {periodeTutup
          ? `jurnal dengan tanggal sebelum ${periodeTutup} ditolak.`
          : "belum ada lock (semua tanggal diizinkan)."}
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tanggal tutup periode</span>
        <Input
          name="periodeTutup"
          type="date"
          defaultValue={periodeTutup ?? ""}
          className="h-11"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="clear" className="h-4 w-4" />
        Hapus period lock
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan…">
        Simpan pengaturan
      </SubmitButton>
    </form>
  );
}
