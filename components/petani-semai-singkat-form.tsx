"use client";

import { useFormState } from "react-dom";
import { submitSemaiPetaniSingkat } from "@/app/actions/petani-semai-singkat";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PetaniSemaiSingkatForm({
  kolamId,
  kolamNama,
}: {
  kolamId: number;
  kolamNama: string;
}) {
  const [state, formAction] = useFormState(submitSemaiPetaniSingkat, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="kolamId" value={kolamId} />
      <p className="text-sm text-muted-foreground">Kolam {kolamNama}. Tanggal hari ini. Paket dipotong sendiri.</p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Nama sayur</span>
        <Input name="namaSayur" required className="h-11" autoComplete="off" placeholder="Contoh: selada" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Berapa baki disemai</span>
        <Input name="jumlahBaki" required className="h-11" inputMode="numeric" placeholder="Contoh: 12" />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Kisaran jumlah disemai</span>
        <Input name="kisaranSemai" required className="h-11" placeholder="Contoh: 800-1000" />
      </label>
      <SubmitButton className="h-11 w-full" pendingLabel="Menyimpan...">
        Simpan semai
      </SubmitButton>
    </form>
  );
}
