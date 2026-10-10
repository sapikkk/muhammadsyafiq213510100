"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { submitSmartJurnal, type SmartJurnalState } from "@/app/actions/smart-jurnal";
import { KasSumberSelect } from "@/components/kas-sumber-select";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { AKUN_KODE } from "@/lib/akun-kode";
import { smartJurnalTipe, smartJurnalTipeLabel, type SmartJurnalTipe } from "@/lib/smart-jurnal";

const NO_KAS: SmartJurnalTipe[] = ["PENYUSUTAN_GREENHOUSE"];

export function SmartJurnalForm({
  tanggalAwal,
  periodeTutup,
}: {
  tanggalAwal: string;
  periodeTutup: string | null;
}) {
  const [state, formAction] = useFormState(submitSmartJurnal, {} as SmartJurnalState);
  const [tipe, setTipe] = useState<SmartJurnalTipe>("BEBAN_OPERASIONAL");
  useActionToast({ error: state.error, ok: state.ok });

  const showKas = !NO_KAS.includes(tipe);
  const showTujuan = tipe === "TRANSFER_KAS";

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <p className="text-sm text-muted-foreground">
        v2-F.2 — tipe terkunci debit/kredit. Jurnal <strong>SMART</strong>, status PENDING (saldo setelah
        approve).
      </p>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tipe</span>
        <select
          name="tipe"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          value={tipe}
          onChange={(e) => setTipe(e.target.value as SmartJurnalTipe)}
        >
          {smartJurnalTipe.map((id) => (
            <option key={id} value={id}>
              {smartJurnalTipeLabel[id]}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Nominal (Rp)</span>
        <Input name="nominal" inputMode="decimal" className="h-11" required placeholder="250000" />
      </label>

      {showKas ? (
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">{showTujuan ? "Transfer dari" : "Sumber kas"}</span>
          <KasSumberSelect className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm" />
        </label>
      ) : null}

      {showTujuan ? (
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Transfer ke</span>
          <select
            name="tujuanKas"
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            defaultValue={AKUN_KODE.BANK}
          >
            <option value={AKUN_KODE.KAS}>Kas tunai (1100)</option>
            <option value={AKUN_KODE.BANK}>Bank (1110)</option>
          </select>
        </label>
      ) : null}

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
