"use client";

import { AlertTriangle, ChevronDown, MoreHorizontal, Sprout, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HarvestForm } from "@/components/harvest-form";
import { KegagalanForm } from "@/components/kegagalan-form";
import { PindahFaseForm } from "@/components/pindah-fase-form";
import { SiklusAbortForm } from "@/components/siklus-abort-form";
import { TambalSusulanForm } from "@/components/tambal-susulan-form";
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
      ? "Lapor panen"
      : `Lanjut: ${faseLabel[langkah.faseBerikutnya]}`;

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
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[14rem] rounded-md border border-border bg-popover p-1 shadow-md">
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

function LainnyaMenu({
  items,
}: {
  items: { key: string; label: string; icon: ReactNode; dialogTitle: string; body: ReactNode }[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  if (items.length === 0) return null;
  const active = items.find((i) => i.key === activeKey);

  return (
    <>
      <div ref={wrapRef} className="relative shrink-0">
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-1.5 px-3"
          aria-expanded={menuOpen}
          aria-label="Aksi lain"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Lainnya</span>
        </Button>
        {menuOpen ? (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded-md border border-border bg-popover p-1 shadow-md">
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveKey(item.key);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {active ? (
        <Dialog open={Boolean(activeKey)} onOpenChange={(o) => !o && setActiveKey(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{active.dialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="pt-2">{active.body}</div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}

export function SiklusDetailActions({
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
  className,
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
  className?: string;
}) {
  const lainnya: {
    key: string;
    label: string;
    icon: ReactNode;
    dialogTitle: string;
    body: ReactNode;
  }[] = [];

  if (canTambal) {
    lainnya.push({
      key: "tambal",
      label: "Tambal susulan",
      icon: <Sprout className="h-4 w-4 shrink-0" aria-hidden />,
      dialogTitle: "Tambal susulan",
      body: <TambalSusulanForm siklusId={siklusId} packs={packs} />,
    });
  }
  if (showKegagalan) {
    lainnya.push({
      key: "gagal",
      label: "Catat kegagalan",
      icon: <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />,
      dialogTitle: "Catat kegagalan sebagian",
      body: (
        <KegagalanForm
          siklusId={siklusId}
          jumlahDisemai={jumlahDisemai}
          totalSusut={totalSusut}
        />
      ),
    });
  }
  if (canAbort) {
    lainnya.push({
      key: "abort",
      label: "Batalkan siklus",
      icon: <XCircle className="h-4 w-4 shrink-0" aria-hidden />,
      dialogTitle: "Batalkan gagal total",
      body: (
        <SiklusAbortForm siklusId={siklusId} siklusLabel={siklusLabel} kodeBatch={kodeBatch} />
      ),
    });
  }

  const any = langkahBerikutnya || lainnya.length > 0;
  if (!any) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2 rounded-md border bg-muted/20 p-3", className)}>
      {langkahBerikutnya ? <LangkahBerikutnyaMenu langkah={langkahBerikutnya} /> : null}
      <LainnyaMenu items={lainnya} />
    </div>
  );
}
