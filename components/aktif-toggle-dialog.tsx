"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
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

type ActionState = { error?: string; ok?: string };

export function AktifToggleDialog({
  id,
  aktif,
  idFieldName,
  action,
  label,
  offDescription,
  onDescription,
  trigger,
}: {
  id: number;
  aktif: boolean;
  idFieldName: string;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  label: string;
  offDescription: string;
  onDescription: string;
  trigger?: ReactNode;
}) {
  const nextAktif = !aktif;
  const triggerLabel = aktif ? "Nonaktifkan" : "Aktifkan";
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(action, {});
  useActionToast(state);

  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state.ok]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2.5 text-xs text-destructive hover:bg-destructive/10"
          >
            {triggerLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {triggerLabel} {label}
          </DialogTitle>
          <DialogDescription>{nextAktif ? onDescription : offDescription}</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4 pt-2">
          <input type="hidden" name={idFieldName} value={id} />
          <input type="hidden" name="aktif" value={nextAktif ? "true" : "false"} />
          {!nextAktif ? (
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="konfirmasi" value="ya" className="mt-1" required />
              Saya yakin menonaktifkan data ini.
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
