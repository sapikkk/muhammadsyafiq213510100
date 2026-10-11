"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import { simpanItemInventaris } from "@/app/actions/inventaris";
import { FormSheet } from "@/components/form-sheet";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { satuanInventarisLabel, satuanInventarisList } from "@/lib/inventaris-satuan";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

export function InventarisItemForm({ onSuccess }: { onSuccess?: () => void }) {
  const [satuan, setSatuan] = useState<string>("");
  const [state, formAction] = useFormState(simpanItemInventaris, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="satuan" value={satuan} />
      <Field label="Kode">
        <Input name="kode" required className="h-11" placeholder="BNH-SLAD" />
      </Field>
      <Field label="Nama">
        <Input name="nama" required className="h-11" />
      </Field>
      <Field label="Satuan">
        <Select value={satuan} onValueChange={setSatuan} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Pilih satuan" />
          </SelectTrigger>
          <SelectContent>
            {satuanInventarisList.map((s) => (
              <SelectItem key={s} value={s}>
                {satuanInventarisLabel[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Stok minimum (opsional)">
        <Input name="stokMinimum" className="h-11" inputMode="decimal" placeholder="0" />
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan item
      </SubmitButton>
    </form>
  );
}

export function InventarisItemFormSheet({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title="Tambah item"
      description="Master bahan baku — stok awal nol; catat masuk lewat pergerakan IN."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? <InventarisItemForm onSuccess={() => setOpen(false)} /> : null}
    </FormSheet>
  );
}
