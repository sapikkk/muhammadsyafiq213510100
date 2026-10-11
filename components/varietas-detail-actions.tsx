"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ubahStatusVarietas } from "@/app/actions/varietas";
import { VarietasFormSheet } from "@/components/varietas-form";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import type { SerializedVarietas } from "@/lib/varietas-types";

export function VarietasDetailActions({ row }: { row: SerializedVarietas }) {
  const nextStatus = row.status === "AKTIF" ? "NONAKTIF" : "AKTIF";
  const toggleLabel = row.status === "AKTIF" ? "Nonaktifkan" : "Aktifkan";

  return (
    <>
      <VarietasFormSheet
        initial={row}
        trigger={
          <Button type="button" className="h-11">
            Ubah
          </Button>
        }
      />
      <VarietasStatusDialog varietasId={row.id} nextStatus={nextStatus} triggerLabel={toggleLabel} />
    </>
  );
}

function VarietasStatusDialog({
  varietasId,
  nextStatus,
  triggerLabel,
}: {
  varietasId: number;
  nextStatus: "AKTIF" | "NONAKTIF";
  triggerLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(ubahStatusVarietas, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state.ok]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="h-11">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{triggerLabel} varietas</DialogTitle>
          <DialogDescription>
            {nextStatus === "NONAKTIF"
              ? "Varietas nonaktif tidak bisa dipilih di siklus baru."
              : "Varietas aktif kembali muncul di dropdown semai."}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 pt-2">
          <input type="hidden" name="varietasId" value={varietasId} />
          <input type="hidden" name="status" value={nextStatus} />
          {nextStatus === "NONAKTIF" ? (
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="konfirmasi" value="ya" className="mt-1" required />
              Saya yakin menonaktifkan varietas ini.
            </label>
          ) : null}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <SubmitButton pendingLabel="…">{triggerLabel}</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
