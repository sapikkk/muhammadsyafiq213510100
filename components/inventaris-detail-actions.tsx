"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  catatPergerakanAdmin,
  catatPergerakanPetani,
  ubahStatusItemInventaris,
} from "@/app/actions/inventaris";
import {
  InventarisMovementFormSheet,
  type InventarisMovementItemOption,
} from "@/components/inventaris-movement-form";
import { InventarisItemFormSheet } from "@/components/inventaris-item-form";
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
import type { SerializedItemInventaris } from "@/lib/inventaris-types";

export function InventarisDetailActions({
  item,
  mode,
}: {
  item: SerializedItemInventaris;
  mode: "admin" | "petani";
}) {
  const option: InventarisMovementItemOption = {
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    satuan: item.satuan,
  };
  const action = mode === "admin" ? catatPergerakanAdmin : catatPergerakanPetani;
  const canMove = item.aktif;

  return (
    <div className="flex flex-wrap gap-2">
      {mode === "admin" ? (
        <>
          <InventarisItemFormSheet
            initial={item}
            trigger={
              <Button type="button" className="h-11">
                Ubah
              </Button>
            }
          />
          <InventarisAktifDialog item={item} />
        </>
      ) : null}
      {canMove ? (
        <InventarisMovementFormSheet
          items={[option]}
          action={action}
          fixedItemId={item.id}
          trigger={
            <Button type="button" variant={mode === "admin" ? "outline" : "default"} className="h-11">
              Catat pergerakan
            </Button>
          }
        />
      ) : (
        <p className="self-center text-xs text-muted-foreground">Item nonaktif — pergerakan dinonaktifkan.</p>
      )}
    </div>
  );
}

function InventarisAktifDialog({ item }: { item: SerializedItemInventaris }) {
  const nextAktif = !item.aktif;
  const triggerLabel = item.aktif ? "Nonaktifkan" : "Aktifkan";
  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(ubahStatusItemInventaris, {});
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
          <DialogTitle>
            {triggerLabel} {item.kode}
          </DialogTitle>
          <DialogDescription>
            {nextAktif
              ? "Item aktif kembali muncul di daftar operasional dan paket siap pakai baru."
              : "Item nonaktif tidak bisa dipakai di pergerakan atau pack baru; riwayat tetap ada."}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 pt-2">
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="aktif" value={nextAktif ? "true" : "false"} />
          {!nextAktif ? (
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="konfirmasi" value="ya" className="mt-1" required />
              Saya yakin menonaktifkan item ini.
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
