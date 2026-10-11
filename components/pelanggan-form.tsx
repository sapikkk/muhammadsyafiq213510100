"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import { submitPelanggan } from "@/app/actions/pelanggan";
import { FormSheet } from "@/components/form-sheet";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";

type PelangganInitial = {
  id: number;
  nama: string;
  alamat: string;
  no_telepon: string;
  email: string;
};

export function PelangganForm({
  initial,
  onSuccess,
}: {
  initial?: PelangganInitial;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useFormState(submitPelanggan, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Nama</span>
        <Input name="nama" required maxLength={100} className="h-11" defaultValue={initial?.nama} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Alamat</span>
        <Input name="alamat" required className="h-11" defaultValue={initial?.alamat} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">No. telepon</span>
        <Input name="noTelepon" required className="h-11" defaultValue={initial?.no_telepon} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Email</span>
        <Input
          name="email"
          type="email"
          required
          className="h-11"
          defaultValue={initial?.email}
        />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        {initial ? "Simpan perubahan" : "Simpan pelanggan"}
      </SubmitButton>
    </form>
  );
}

export function PelangganFormSheet({
  trigger,
  initial,
}: {
  trigger: ReactNode;
  initial?: PelangganInitial;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title={initial ? "Ubah pelanggan" : "Tambah pelanggan"}
      description="Nama, alamat, telepon, dan email wajib valid."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <PelangganForm
          key={initial?.id ?? "baru"}
          initial={initial}
          onSuccess={() => setOpen(false)}
        />
      ) : null}
    </FormSheet>
  );
}
