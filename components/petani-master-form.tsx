"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import { simpanPetaniMaster } from "@/app/actions/petani-master";
import { FormSheet } from "@/components/form-sheet";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

type PetaniInitial = {
  id: number;
  nama: string;
  gaji_bulanan: string;
};

export function PetaniMasterForm({
  initial,
  onSuccess,
}: {
  initial?: PetaniInitial;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useFormState(simpanPetaniMaster, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <div className="space-y-2">
        <label htmlFor="petani-nama" className="text-sm font-medium">
          Nama
        </label>
        <Input
          id="petani-nama"
          name="nama"
          required
          maxLength={100}
          className="h-11"
          defaultValue={initial?.nama}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="petani-gaji" className="text-sm font-medium">
          Gaji bulanan (Rp)
        </label>
        <Input
          id="petani-gaji"
          name="gajiBulanan"
          inputMode="decimal"
          required
          className="h-11"
          defaultValue={initial?.gaji_bulanan}
        />
      </div>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        {initial ? "Simpan perubahan" : "Simpan petani"}
      </SubmitButton>
    </form>
  );
}

export function PetaniMasterFormSheet({
  trigger,
  initial,
}: {
  trigger: ReactNode;
  initial?: PetaniInitial;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title={initial ? "Ubah petani" : "Tambah petani"}
      description="Master ERD (nama & gaji). Akun login HP didaftarkan terpisah di beranda Admin."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <PetaniMasterForm
          key={initial?.id ?? "baru"}
          initial={initial}
          onSuccess={() => setOpen(false)}
        />
      ) : null}
    </FormSheet>
  );
}
