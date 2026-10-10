"use client";

import { useFormState } from "react-dom";
import { simpanPetaniMaster } from "@/app/actions/petani-master";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PetaniMasterForm() {
  const [state, formAction] = useFormState(simpanPetaniMaster, {} as { error?: string; ok?: boolean });
  useActionToast({ error: state.error, ok: state.ok ? "Tersimpan." : undefined });

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4 rounded-lg border p-4">
      <h3 className="font-medium">Tambah petani (master ERD)</h3>
      <div className="space-y-2">
        <label htmlFor="nama" className="text-sm font-medium">
          Nama
        </label>
        <Input id="nama" name="nama" required maxLength={100} />
      </div>
      <div className="space-y-2">
        <label htmlFor="gajiBulanan" className="text-sm font-medium">
          Gaji bulanan (Rp)
        </label>
        <Input id="gajiBulanan" name="gajiBulanan" inputMode="decimal" required />
      </div>
      <Button type="submit">Simpan</Button>
    </form>
  );
}
