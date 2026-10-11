"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import type { SatuanInventaris } from "@/lib/inventaris-satuan";
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
import { FormSheet } from "@/components/form-sheet";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { tipePergerakanLabel, tipePergerakanList, type TipePergerakan } from "@/lib/inventaris-pergerakan";

export type InventarisMovementItemOption = {
  id: number;
  kode: string;
  nama: string;
  satuan: SatuanInventaris;
};

type MovementAction = (
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

export function InventarisMovementForm({
  items,
  action,
  fixedItemId,
  onSuccess,
}: {
  items: InventarisMovementItemOption[];
  action: MovementAction;
  fixedItemId?: number;
  onSuccess?: () => void;
}) {
  const [itemId, setItemId] = useState(
    fixedItemId ? String(fixedItemId) : items[0] ? String(items[0].id) : "",
  );
  const [tipe, setTipe] = useState<TipePergerakan>("OUT");
  const [state, formAction] = useFormState(action, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  const resolvedItemId = fixedItemId ?? Number(itemId);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="itemId" value={resolvedItemId || ""} />
      <input type="hidden" name="tipe" value={tipe} />
      {!fixedItemId ? (
        <Field label="Item">
          <Select value={itemId} onValueChange={setItemId} required>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Pilih item" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.kode} — {item.nama} ({satuanInventarisLabel[item.satuan]})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      ) : null}
      <Field label="Tipe">
        <Select value={tipe} onValueChange={(v) => setTipe(v as TipePergerakan)}>
          <SelectTrigger className="h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tipePergerakanList.map((t) => (
              <SelectItem key={t} value={t}>
                {tipePergerakanLabel[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <p className="text-sm text-muted-foreground">
        Masuk menambah stok, keluar mengurangi, penyesuaian mengatur stok fisik (wajib keterangan).
      </p>
      <Field label="Jumlah">
        <Input name="jumlah" required className="h-11" inputMode="decimal" />
      </Field>
      <Field label="Keterangan">
        <Input name="keterangan" className="h-11" maxLength={255} />
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan pergerakan
      </SubmitButton>
    </form>
  );
}

export function InventarisMovementFormSheet({
  trigger,
  items,
  action,
  fixedItemId,
  title = "Catat pergerakan",
}: {
  trigger: ReactNode;
  items: InventarisMovementItemOption[];
  action: MovementAction;
  fixedItemId?: number;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title={title}
      description="Stok berubah langsung setelah disimpan."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <InventarisMovementForm
          key={fixedItemId ?? "pilih"}
          items={items}
          action={action}
          fixedItemId={fixedItemId}
          onSuccess={() => setOpen(false)}
        />
      ) : null}
    </FormSheet>
  );
}
