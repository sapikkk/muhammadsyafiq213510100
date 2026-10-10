"use client";

import { useFormState } from "react-dom";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import {
  ajukanJurnalAction,
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
  const pesan = ajukan.saved ?? setujui.saved ?? tolak.saved;
  const error = ajukan.error ?? setujui.error ?? tolak.error;

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

      {status === "APPROVED" || status === "REJECTED" ? (
        <p className="text-sm text-muted-foreground">
          Jurnal ini sudah final dan tidak bisa diubah.
        </p>
      ) : null}
    </section>
  );
}
