"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HarvestForm } from "@/components/harvest-form";
import { KegagalanForm } from "@/components/kegagalan-form";
import { PindahFaseForm } from "@/components/pindah-fase-form";
import { SiklusAbortForm } from "@/components/siklus-abort-form";
import { TambalSusulanForm } from "@/components/tambal-susulan-form";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { faseLabel, type FaseProduksi } from "@/lib/siklus-fase";
import { cn } from "@/lib/utils";

type PackOpt = {
  id: number;
  kode: string;
  itemNama: string;
  satuan: string;
  sisaUnit: string;
};

export type SiklusLangkahBerikutnya =
  | {
      kind: "fase";
      siklusId: number;
      faseSaatIni: FaseProduksi;
      faseBerikutnya: FaseProduksi;
    }
  | { kind: "harvest"; siklusId: number; jumlahDisemai: number }
  | null;

function FormDialog({
  triggerLabel,
  title,
  children,
  className,
}: {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn("h-11 shrink-0", className)}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="pt-2">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function LangkahBerikutnyaMenu({
  langkah,
}: {
  langkah: NonNullable<SiklusLangkahBerikutnya>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const itemLabel =
    langkah.kind === "harvest"
      ? "Laporan panen & sortasi"
      : `Lanjut ke ${faseLabel[langkah.faseBerikutnya]}`;

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <Button
        type="button"
        variant="default"
        className="h-11 gap-1 pr-2"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        Langkah berikutnya
        <ChevronDown className="h-4 w-4 opacity-80" />
      </Button>
      {menuOpen ? (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[14rem] rounded-md border bg-popover p-1 shadow-md">
          <button
            type="button"
            className="flex w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent"
            onClick={() => {
              setMenuOpen(false);
              setDialogOpen(true);
            }}
          >
            {itemLabel}
          </button>
        </div>
      ) : null}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{itemLabel}</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            {langkah.kind === "harvest" ? (
              <HarvestForm siklusId={langkah.siklusId} jumlahDisemai={langkah.jumlahDisemai} />
            ) : (
              <PindahFaseForm
                siklusId={langkah.siklusId}
                faseSaatIni={langkah.faseSaatIni}
                faseBerikutnya={langkah.faseBerikutnya}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SiklusDetailSecondary({
  siklusId,
  siklusLabel,
  kodeBatch,
  jumlahDisemai,
  totalSusut,
  canTambal,
  canAbort,
  showKegagalan,
  langkahBerikutnya,
  packs,
  variant = "toolbar",
}: {
  siklusId: number;
  siklusLabel: string;
  kodeBatch: string;
  jumlahDisemai: number;
  totalSusut: number;
  canTambal: boolean;
  canAbort: boolean;
  showKegagalan: boolean;
  langkahBerikutnya: SiklusLangkahBerikutnya;
  packs: PackOpt[];
  variant?: "toolbar" | "section";
}) {
  const any = langkahBerikutnya || canTambal || canAbort || showKegagalan;
  if (!any) return null;

  const buttons = (
    <div className="flex flex-wrap items-center gap-2">
      {langkahBerikutnya ? <LangkahBerikutnyaMenu langkah={langkahBerikutnya} /> : null}
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
          <SiklusAbortForm siklusId={siklusId} siklusLabel={siklusLabel} kodeBatch={kodeBatch} />
        </FormDialog>
      ) : null}
    </div>
  );

  if (variant === "section") {
    return (
      <PageSection
        title="Aksi siklus"
        description="Langkah fase, tambal, kegagalan, atau batalkan. Monitor harian ada di daftar siklus (filter kolam)."
        badge="Update"
      >
        {buttons}
      </PageSection>
    );
  }

  return buttons;
}
