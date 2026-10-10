"use client";

import { useFormState } from "react-dom";
import { submitPelanggan } from "@/app/actions/pelanggan";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PelangganForm() {
  const [state, formAction] = useFormState(submitPelanggan, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction} className="max-w-lg space-y-4 rounded-md border p-4">
      <h3 className="text-lg font-semibold">Tambah pelanggan</h3>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Nama</span>
        <Input name="nama" required maxLength={100} className="h-11" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Alamat</span>
        <Input name="alamat" required className="h-11" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">No. telepon</span>
        <Input name="noTelepon" required className="h-11" />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Email</span>
        <Input name="email" type="email" required className="h-11" />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan pelanggan
      </SubmitButton>
    </form>
  );
}
