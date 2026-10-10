"use client";

import { useFormState } from "react-dom";
import { submitSmartJurnal, type SmartJurnalState } from "@/app/actions/smart-jurnal";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";
const TIPE_OPTS = [
  { id: "BEBAN_OPERASIONAL", label: "Beban operasional" },
  { id: "PRIVE", label: "Prive pemilik" },
  { id: "SUNTIKAN_MODAL", label: "Suntikan modal" },
] as const;

export function SmartJurnalForm({
  tanggalAwal,
  periodeTutup,
}: {
  tanggalAwal: string;
  periodeTutup: string | null;
}) {
  const [state, formAction] = useFormState(submitSmartJurnal, {} as SmartJurnalState);
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <p className="text-sm text-muted-foreground">
        v2-F.1 — &quot;Saya ingin mencatat …&quot; Pasangan debit/kredit terkunci. Jurnal masuk{" "}
        <strong>SMART</strong>, status awal PENDING (saldo setelah approve).
      </p>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tipe</span>
        <select
          name="tipe"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          defaultValue="BEBAN_OPERASIONAL"
        >
          {TIPE_OPTS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Nominal (Rp)</span>
        <Input name="nominal" inputMode="decimal" className="h-11" required placeholder="250000" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Sumber kas</span>
        <select
          name="sumberKas"
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          defaultValue="1100"
        >
          <option value="1100">1100 · Kas</option>
          <option value="1110">1110 · Bank</option>
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tanggal</span>
        <Input name="tanggal" type="date" defaultValue={tanggalAwal} className="h-11" required />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" maxLength={200} className="h-11" placeholder="Detail singkat" />
      </label>

      <input type="hidden" name="status" value="PENDING" />

      {periodeTutup ? (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="adminOverridePeriod" className="h-4 w-4" />
          Override period lock (PO) — periode tutup {periodeTutup}
        </label>
      ) : null}

      <SubmitButton className="h-11" pendingLabel="Menyimpan…">
        Catat Smart Jurnal
      </SubmitButton>
    </form>
  );
}
