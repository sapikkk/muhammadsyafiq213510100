"use client";

import { useState, type ReactNode } from "react";
import { KegagalanForm } from "@/components/kegagalan-form";
import { MonitorPertumbuhanForm } from "@/components/monitor-pertumbuhan-form";
import { SiklusAbortForm } from "@/components/siklus-abort-form";
import { TambalSusulanForm } from "@/components/tambal-susulan-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PackOpt = {
  id: number;
  kode: string;
  itemNama: string;
  satuan: string;
  sisaUnit: string;
};

function FormDialog({
  triggerLabel,
  title,
  children,
}: {
  triggerLabel: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="h-11">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="pt-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export function SiklusDetailSecondary({
  siklusId,
  kodeBatch,
  jumlahDisemai,
  totalSusut,
  canMonitor,
  canTambal,
  canAbort,
  showKegagalan,
  packs,
}: {
  siklusId: number;
  kodeBatch: string;
  jumlahDisemai: number;
  totalSusut: number;
  canMonitor: boolean;
  canTambal: boolean;
  canAbort: boolean;
  showKegagalan: boolean;
  packs: PackOpt[];
}) {
  const any = canMonitor || canTambal || canAbort || showKegagalan;
  if (!any) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {canMonitor ? (
        <FormDialog triggerLabel="Monitor pertumbuhan" title="Monitor pertumbuhan">
          <MonitorPertumbuhanForm siklusId={siklusId} />
        </FormDialog>
      ) : null}
      {canTambal ? (
        <FormDialog triggerLabel="Tambal susulan" title="Tambal susulan">
          <TambalSusulanForm siklusId={siklusId} packs={packs} />
        </FormDialog>
      ) : null}
      {showKegagalan ? (
        <FormDialog triggerLabel="Catat kegagalan" title="Catat kegagalan sebagian">
          <KegagalanForm
            siklusId={siklusId}
            jumlahDisemai={jumlahDisemai}
            totalSusut={totalSusut}
          />
        </FormDialog>
      ) : null}
      {canAbort ? (
        <FormDialog triggerLabel="Batalkan siklus" title="Batalkan gagal total">
          <SiklusAbortForm siklusId={siklusId} kodeBatch={kodeBatch} />
        </FormDialog>
      ) : null}
    </div>
  );
}
