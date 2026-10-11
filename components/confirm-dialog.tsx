"use client";

import { useState, type ReactNode } from "react";
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

export type ConfirmDialogProps = {
  judul?: string;
  title?: string;
  deskripsi?: string;
  description?: string;
  labelTombol?: string;
  confirmLabel?: string;
  labelBatal?: string;
  cancelLabel?: string;
  pendingLabel?: string;
  variant?: "destructive" | "default" | "outline" | "secondary";
  trigger?: ReactNode;
  action: (formData: FormData) => void | Promise<void>;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ConfirmDialog({
  judul,
  title,
  deskripsi,
  description,
  labelTombol,
  confirmLabel = "Konfirmasi",
  labelBatal = "Batal",
  cancelLabel,
  pendingLabel = "Memproses...",
  variant = "destructive",
  trigger,
  action,
  children,
  open: controlledOpen,
  onOpenChange,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const finalTitle = judul ?? title ?? "Konfirmasi Tindakan";
  const finalDesc = deskripsi ?? description;
  const finalConfirmLabel = labelTombol ?? confirmLabel;
  const finalCancelLabel = cancelLabel ?? labelBatal;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{finalTitle}</DialogTitle>
          {finalDesc ? <DialogDescription>{finalDesc}</DialogDescription> : null}
        </DialogHeader>
        <form
          action={async (formData) => {
            await action(formData);
            handleOpenChange(false);
          }}
          className="space-y-4 pt-2"
        >
          {children}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              {finalCancelLabel}
            </Button>
            <SubmitButton
              variant={variant}
              pendingLabel={pendingLabel}
            >
              {finalConfirmLabel}
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
