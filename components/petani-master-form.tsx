"use client";

import { useFormState } from "react-dom";
import { simpanPetaniMaster } from "@/app/actions/petani-master";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PetaniMasterForm() {
  const [state, formAction] = useFormState(simpanPetaniMaster, {} as { error?: string; ok?: boolean });

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
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.ok ? <p className="text-sm text-primary">Tersimpan.</p> : null}
      <Button type="submit">Simpan</Button>
    </form>
  );
}
