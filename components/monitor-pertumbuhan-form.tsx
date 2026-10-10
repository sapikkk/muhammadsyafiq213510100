"use client";

import { useFormState } from "react-dom";
import { submitMonitorPertumbuhan } from "@/app/actions/monitor";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { kondisiMonitorOptions } from "@/lib/monitor-produksi";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function MonitorPertumbuhanForm({ siklusId }: { siklusId: number }) {
  const [state, formAction] = useFormState(submitMonitorPertumbuhan, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <input type="hidden" name="siklusId" value={siklusId} />
      <h2 className="text-lg font-semibold">Monitor pertumbuhan</h2>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Kondisi</span>
        <select
          name="kondisi"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {kondisiMonitorOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan lapangan</span>
        <Input name="catatan" className="h-11" maxLength={255} placeholder="Contoh: daun ke-3 rata, ada jamur sedikit" />
      </label>

      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan monitor
      </SubmitButton>
    </form>
  );
}
