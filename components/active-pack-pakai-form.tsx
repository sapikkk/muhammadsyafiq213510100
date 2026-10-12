"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
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
import { formatQty, formatRupiah } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { labelItemUtama } from "@/lib/inventaris-ui-labels";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import type { ActivePackListRow } from "@/lib/active-pack-types";

type PakaiAction = (
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

export function ActivePackPakaiForm({
  packs,
  action,
  fixedPackId,
  onSuccess,
}: {
  packs: ActivePackListRow[];
  action: PakaiAction;
  fixedPackId?: number;
  onSuccess?: () => void;
}) {
  const aktif = packs.filter((p) => p.status === "AKTIF");
  const [packId, setPackId] = useState(
    fixedPackId ? String(fixedPackId) : aktif[0] ? String(aktif[0].id) : "",
  );
  const [state, formAction] = useFormState(action, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  if (aktif.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Tidak ada pack aktif untuk dipakai.
      </p>
    );
  }

  const resolvedId = fixedPackId ?? Number(packId);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={resolvedId || ""} />
      {!fixedPackId ? (
        <Field label="Pack">
          <Select value={packId} onValueChange={setPackId} required>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Pilih pack aktif" />
            </SelectTrigger>
            <SelectContent>
              {aktif.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {labelItemUtama(p.item)} · sisa {formatQty(p.sisaUnit)}{" "}
                  {satuanInventarisLabel[p.item.satuan]} @ {formatRupiah(p.biayaPerUnit)}/unit
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      ) : null}
      <Field label="Jumlah pakai">
        <Input name="jumlah" required className="h-11" inputMode="decimal" />
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Catat pemakaian
      </SubmitButton>
    </form>
  );
}

export function ActivePackPakaiFormSheet({
  trigger,
  packs,
  action,
  fixedPackId,
  title = "Pakai unit dari pack",
}: {
  trigger: ReactNode;
  packs: ActivePackListRow[];
  action: PakaiAction;
  fixedPackId?: number;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const target = fixedPackId ? packs.find((p) => p.id === fixedPackId) : null;
  if (fixedPackId && target?.status !== "AKTIF") {
    return null;
  }

  return (
    <FormSheet
      title={title}
      description="Kurangi sisa pack — otomatis saat petani semai, atau manual di sini."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <ActivePackPakaiForm
          packs={packs}
          action={action}
          fixedPackId={fixedPackId}
          onSuccess={() => setOpen(false)}
        />
      ) : null}
    </FormSheet>
  );
}
