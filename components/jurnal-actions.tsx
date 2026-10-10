"use client";

import { useFormState } from "react-dom";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import {
  ajukanJurnalAction,
  balikJurnalAction,
  setujuiJurnalAction,
  tolakJurnalAction,
} from "@/app/actions/jurnal";
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
import type { StatusJurnalKey } from "@/lib/jurnal-status";

export function JurnalActions({
  id,
  status,
}: {
  id: number;
  status: StatusJurnalKey;
}) {
  const [ajukan, ajukanAction] = useFormState(ajukanJurnalAction, {});
  const [setujui, setujuiAction] = useFormState(setujuiJurnalAction, {});
  const [tolak, tolakAction] = useFormState(tolakJurnalAction, {});
  const [balik, balikAction] = useFormState(balikJurnalAction, {});
  const pesan = ajukan.saved ?? setujui.saved ?? tolak.saved ?? balik.saved;
  const error = ajukan.error ?? setujui.error ?? tolak.error ?? balik.error;

  useActionToast({ error, saved: pesan });

  return (
    <section aria-labelledby="aksi-title" className="space-y-3">
      <h2 id="aksi-title" className="text-lg font-semibold">
        Tindakan
      </h2>
      {pesan ? (
        <p role="status" className="text-sm">
          {pesan}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {status === "DRAFT" ? (
        <form action={ajukanAction}>
          <input type="hidden" name="id" value={id} />
          <SubmitButton className="h-11" pendingLabel="Mengajukan...">
            Ajukan untuk disetujui
          </SubmitButton>
        </form>
      ) : null}

      {status === "PENDING" ? (
        <div className="flex flex-wrap gap-3">
          <form action={setujuiAction}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton className="h-11" pendingLabel="Menyetujui...">
              Setujui
            </SubmitButton>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" className="h-11">
                Tolak
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tolak jurnal ini?</DialogTitle>
                <DialogDescription>
                  Tulis alasannya supaya pembuat jurnal tahu apa yang harus
                  diperbaiki. Saldo akun tidak berubah.
                </DialogDescription>
              </DialogHeader>
              <form action={tolakAction} className="space-y-3">
                <input type="hidden" name="id" value={id} />
                <label className="block space-y-1.5 text-sm">
                  <span className="font-medium">Alasan</span>
                  <textarea
                    name="alasan"
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </label>
                <SubmitButton
                  variant="destructive"
                  className="h-11"
                  pendingLabel="Menolak..."
                >
                  Tolak jurnal
                </SubmitButton>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}

      {status === "APPROVED" ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Jurnal disetujui tidak bisa diedit. Buat jurnal pembalik (PENDING)
            jika perlu koreksi setelah disetujui.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" className="h-11">
                Buat jurnal pembalik
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pembalikan jurnal #{id}</DialogTitle>
                <DialogDescription>
                  Debit dan kredit ditukar pada jurnal baru berstatus PENDING.
                  Setujui jurnal pembalik untuk mengoreksi saldo akun.
                </DialogDescription>
              </DialogHeader>
              <form action={balikAction} className="space-y-3">
                <input type="hidden" name="id" value={id} />
                <label className="block space-y-1.5 text-sm">
                  <span className="font-medium">Alasan</span>
                  <textarea
                    name="alasan"
                    rows={3}
                    required
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </label>
                <SubmitButton className="h-11" pendingLabel="Membuat pembalik...">
                  Buat jurnal pembalik
                </SubmitButton>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}

      {status === "REJECTED" ? (
        <p className="text-sm text-muted-foreground">
          Jurnal ditolak dan tidak bisa diubah.
        </p>
      ) : null}
    </section>
  );
}
