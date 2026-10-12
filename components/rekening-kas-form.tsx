"use client";

import { useFormState } from "react-dom";
import { InstitusiKeuanganSelect } from "@/components/institusi-keuangan-select";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  createRekeningKasAction,
  type RekeningKasFormState,
} from "@/app/actions/rekening-kas";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function RekeningKasForm() {
  const [state, action] = useFormState(createRekeningKasAction, {} as RekeningKasFormState);
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={action} className="max-w-md space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="namaRekening">
          Nama rekening
        </label>
        <Input id="namaRekening" name="namaRekening" required placeholder="Operasional harian" className="h-11" />
      </div>
      <InstitusiKeuanganSelect name="institusiKode" required />
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="nomorRekening">
          Nomor rekening / ID e-wallet
        </label>
        <Input id="nomorRekening" name="nomorRekening" placeholder="Opsional" className="h-11" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="atasNama">
          Atas nama
        </label>
        <Input id="atasNama" name="atasNama" placeholder="Nama pemilik rekening" className="h-11" />
      </div>
      <SubmitButton className="h-11" pendingLabel="Menyimpan…">
        Simpan rekening
      </SubmitButton>
    </form>
  );
}
