"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import { simpanVarietas } from "@/app/actions/varietas";
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
import { varietasStatusLabel, varietasStatusList } from "@/lib/varietas-status";
import type { SerializedVarietas } from "@/lib/varietas-types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

export function VarietasForm({
  initial,
  onSuccess,
}: {
  initial?: SerializedVarietas;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(initial);
  const [status, setStatus] = useState(initial?.status ?? "AKTIF");
  const [state, formAction] = useFormState(simpanVarietas, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <input type="hidden" name="status" value={status} />
      <Field label="Nama">
        <Input name="nama" className="h-11" required defaultValue={initial?.nama} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Harga benih per gram (Rp)">
          <Input
            name="hargaBenihPerGram"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.hargaBenihPerGram}
          />
        </Field>
        <Field label="Biji per gram">
          <Input
            name="bijiPerGram"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.bijiPerGram}
          />
        </Field>
        <Field label="Daya kecambah (%)">
          <Input
            name="dayaKecambah"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.dayaKecambah}
          />
        </Field>
        <Field label="Lama semai (hari)">
          <Input
            name="lamaSemai"
            className="h-11"
            inputMode="numeric"
            required
            defaultValue={initial?.lamaSemai}
          />
        </Field>
        <Field label="Lama di kolam (hari)">
          <Input
            name="lamaDiKolam"
            className="h-11"
            inputMode="numeric"
            required
            defaultValue={initial?.lamaDiKolam}
          />
        </Field>
        <Field label="Berat rata panen (gram)">
          <Input
            name="beratRataRataPanen"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.beratRataRataPanen}
          />
        </Field>
        <Field label="Berat per pack (gram)">
          <Input
            name="beratPerPack"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.beratPerPack}
          />
        </Field>
        <Field label="Harga jual curah (Rp)">
          <Input
            name="hargaJualCurah"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.hargaJualCurah}
          />
        </Field>
        <Field label="Harga jual pack (Rp)">
          <Input
            name="hargaJualPack"
            className="h-11"
            inputMode="decimal"
            required
            defaultValue={initial?.hargaJualPack}
          />
        </Field>
      </div>
      {!isEdit ? (
        <Field label="Status awal">
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {varietasStatusList.map((s) => (
                <SelectItem key={s} value={s}>
                  {varietasStatusLabel[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      ) : null}
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        {isEdit ? "Simpan perubahan" : "Simpan varietas"}
      </SubmitButton>
    </form>
  );
}

export function VarietasFormSheet({
  trigger,
  initial,
}: {
  trigger: ReactNode;
  initial?: SerializedVarietas;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title={initial ? "Ubah varietas" : "Tambah varietas"}
      description="Asumsi benih, pertumbuhan, dan harga jual untuk HPP dan siklus."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <VarietasForm
          key={initial?.id ?? "baru"}
          initial={initial}
          onSuccess={() => setOpen(false)}
        />
      ) : null}
    </FormSheet>
  );
}
