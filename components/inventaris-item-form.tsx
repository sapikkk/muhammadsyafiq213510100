"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import { simpanItemInventaris, ubahItemInventaris } from "@/app/actions/inventaris";
import type { SerializedItemInventaris } from "@/lib/inventaris-types";
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

export function InventarisItemForm({
  initial,
  onSuccess,
}: {
  initial?: SerializedItemInventaris;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(initial);
  const [satuan, setSatuan] = useState<string>(initial?.satuan ?? "");
  const [state, formAction] = useFormState(
    isEdit ? ubahItemInventaris : simpanItemInventaris,
    {},
  );
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      {isEdit ? <input type="hidden" name="itemId" value={initial!.id} /> : null}
      {!isEdit ? <input type="hidden" name="satuan" value={satuan} /> : null}
      <Field label="Kode">
        {isEdit ? (
          <Input readOnly className="h-11 bg-muted/40" value={initial!.kode} />
        ) : (
          <Input name="kode" required className="h-11" placeholder="BNH-SLAD" />
        )}
      </Field>
      <Field label="Nama">
        <Input name="nama" required className="h-11" defaultValue={initial?.nama} />
      </Field>
      {isEdit ? (
        <p className="text-xs text-muted-foreground">
          Satuan: {satuanInventarisLabel[initial!.satuan]} — tidak bisa diubah setelah dibuat.
        </p>
      ) : (
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
      )}
      <Field label="Stok minimum (opsional)">
        <Input
          name="stokMinimum"
          className="h-11"
          inputMode="decimal"
          placeholder="0"
          defaultValue={initial?.stokMinimum}
        />
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        {isEdit ? "Simpan perubahan" : "Simpan item"}
      </SubmitButton>
    </form>
  );
}

export function InventarisItemFormSheet({
  trigger,
  initial,
}: {
  trigger: ReactNode;
  initial?: SerializedItemInventaris;
}) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(initial);
  return (
    <FormSheet
      title={isEdit ? "Ubah item" : "Tambah item"}
      description={
        isEdit
          ? "Nama dan stok minimum — kode/satuan tetap."
          : "Master bahan baku — stok awal nol; catat masuk lewat pergerakan IN."
      }
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <InventarisItemForm initial={initial} onSuccess={() => setOpen(false)} />
      ) : null}
    </FormSheet>
  );
}
