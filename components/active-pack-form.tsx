"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import type { ItemInventaris } from "@prisma/client";
import { FormSheet } from "@/components/form-sheet";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { labelItemPilih } from "@/lib/inventaris-ui-labels";

type PackSaveAction = (
  prev: { error?: string; ok?: string },
  formData: FormData,
) => Promise<{ error?: string; ok?: string }>;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

export function ActivePackForm({
  items,
  action,
  onSuccess,
}: {
  items: ItemInventaris[];
  action: PackSaveAction;
  onSuccess?: () => void;
}) {
  const [itemId, setItemId] = useState(items[0] ? String(items[0].id) : "");
  const [state, formAction] = useFormState(action, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Belum ada item inventaris aktif. Admin harus menambah bahan di menu
        Inventaris dulu, baru pack bisa dirakit di sini.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="itemId" value={itemId} />
      <p className="text-sm text-muted-foreground">
        Biaya per unit = harga pack ÷ jumlah unit. Status habis otomatis saat sisa 0.
      </p>
      <Field label="Kode pack">
        <Input name="kode" required className="h-11" placeholder="AP-BNH-01" />
      </Field>
      <Field label="Barang">
        <Select value={itemId || undefined} onValueChange={setItemId} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Pilih item" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[100]">
            {items.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {labelItemPilih({
                  nama: item.nama,
                  kode: item.kode,
                  satuanLabel: satuanInventarisLabel[item.satuan],
                })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Harga pack (Rp)">
        <Input name="hargaPack" required className="h-11" inputMode="decimal" />
      </Field>
      <Field label="Jumlah unit dalam pack">
        <Input name="jumlahUnit" required className="h-11" inputMode="decimal" />
      </Field>
      <Field label="Keterangan (opsional)">
        <Input name="keterangan" className="h-11" maxLength={255} />
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan pack
      </SubmitButton>
    </form>
  );
}

export function ActivePackFormSheet({
  trigger,
  items,
  action,
}: {
  trigger: ReactNode;
  items: ItemInventaris[];
  action: PackSaveAction;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title="Buka paket siap pakai baru"
      description="Alokasi biaya benih/media per unit — dipakai saat semai & tambal."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <ActivePackForm items={items} action={action} onSuccess={() => setOpen(false)} />
      ) : null}
    </FormSheet>
  );
}
