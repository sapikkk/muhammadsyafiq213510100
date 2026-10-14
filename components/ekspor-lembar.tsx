"use client";

import { useCallback, useMemo, useState } from "react";
import type { ExportDocument } from "@/lib/export-document-types";
import { EksporPratinjauTabel } from "@/components/ekspor-pratinjau-tabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export type EksporRentangMode = "bulan" | "tanggal";

type Props = {
  judulTombol?: string;
  /** Path API unduhan, mis. /api/export/income-statement */
  unduhPath: string;
  /** Path pratinjau JSON, mis. /api/export/preview?jenis=laba-rugi */
  pratinjauPath: string;
  rentang: EksporRentangMode;
  defaultDari: string;
  defaultSampai: string;
  extraParams?: Record<string, string>;
  formats?: ("pdf" | "xlsx")[];
  /** Tanpa pemilih rentang (unduhan paket siklus / faktur). */
  sembunyikanRentang?: boolean;
  trigger?: React.ReactNode;
};

export function EksporLembar({
  judulTombol = "Ekspor",
  unduhPath,
  pratinjauPath,
  rentang,
  defaultDari,
  defaultSampai,
  extraParams = {},
  formats = ["pdf", "xlsx"],
  sembunyikanRentang = false,
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dari, setDari] = useState(defaultDari);
  const [sampai, setSampai] = useState(defaultSampai);
  const [format, setFormat] = useState<"pdf" | "xlsx">(formats[0] ?? "pdf");
  const [orient, setOrient] = useState<"portrait" | "landscape">("portrait");
  const [preview, setPreview] = useState<ExportDocument | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const baseParams = useMemo(() => {
    const p = new URLSearchParams(extraParams);
    if (sembunyikanRentang) return p;
    if (rentang === "bulan") {
      p.set("dari", dari);
      p.set("sampai", sampai);
    } else {
      p.set("tglAwal", dari);
      p.set("tglAkhir", sampai);
      p.set("dari", dari);
      p.set("sampai", sampai);
    }
    return p;
  }, [dari, sampai, extraParams, rentang, sembunyikanRentang]);

  const unduhHref = useMemo(() => {
    const p = new URLSearchParams(baseParams);
    p.set("format", format);
    p.set("orient", orient);
    return `${unduhPath}?${p.toString()}`;
  }, [baseParams, format, orient, unduhPath]);

  const muatPratinjau = useCallback(async () => {
    setLoadingPreview(true);
    setPreviewError(null);
    try {
      const p = new URLSearchParams(baseParams);
      const sep = pratinjauPath.includes("?") ? "&" : "?";
      const res = await fetch(`${pratinjauPath}${sep}${p.toString()}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Gagal memuat pratinjau.");
      }
      const json = (await res.json()) as ExportDocument;
      setPreview(json);
    } catch (e) {
      setPreview(null);
      setPreviewError(e instanceof Error ? e.message : "Gagal memuat pratinjau.");
    } finally {
      setLoadingPreview(false);
    }
  }, [baseParams, pratinjauPath]);

  const labelDari = rentang === "bulan" ? "Dari (YYYY-MM)" : "Dari (YYYY-MM-DD)";
  const labelSampai = rentang === "bulan" ? "Sampai (YYYY-MM)" : "Sampai (YYYY-MM-DD)";
  const patternDari = rentang === "bulan" ? "\\d{4}-\\d{2}" : "\\d{4}-\\d{2}-\\d{2}";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button type="button" variant="outline" className="h-11">
            {judulTombol}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-h-[92vh] w-[min(96vw,56rem)] max-w-[min(96vw,56rem)] flex-col gap-4 overflow-hidden p-6 sm:max-w-[min(96vw,56rem)]">
        <DialogHeader>
          <DialogTitle>Ekspor data</DialogTitle>
        </DialogHeader>

        {sembunyikanRentang ? null : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-muted-foreground">{labelDari}</span>
              <Input
                id="ekspor-dari"
                value={dari}
                onChange={(e) => setDari(e.target.value)}
                pattern={patternDari}
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-muted-foreground">{labelSampai}</span>
              <Input
                id="ekspor-sampai"
                value={sampai}
                onChange={(e) => setSampai(e.target.value)}
                pattern={patternDari}
                className="h-11"
              />
            </div>
          </div>
        )}

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Format file</legend>
          <div className="flex flex-wrap gap-2">
            {formats.includes("pdf") ? (
              <Button
                type="button"
                size="sm"
                variant={format === "pdf" ? "default" : "outline"}
                className="h-9"
                onClick={() => setFormat("pdf")}
              >
                PDF
              </Button>
            ) : null}
            {formats.includes("xlsx") ? (
              <Button
                type="button"
                size="sm"
                variant={format === "xlsx" ? "default" : "outline"}
                className="h-9"
                onClick={() => setFormat("xlsx")}
              >
                Excel
              </Button>
            ) : null}
          </div>
        </fieldset>

        {format === "pdf" ? (
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Orientasi kertas</legend>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={orient === "portrait" ? "default" : "outline"}
                className="h-9"
                onClick={() => setOrient("portrait")}
              >
                Portrait
              </Button>
              <Button
                type="button"
                size="sm"
                variant={orient === "landscape" ? "default" : "outline"}
                className="h-9"
                onClick={() => setOrient("landscape")}
              >
                Landscape
              </Button>
            </div>
          </fieldset>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              disabled={loadingPreview}
              onClick={() => void muatPratinjau()}
            >
              {loadingPreview ? "Memuat…" : "Lihat pratinjau"}
            </Button>
            <Button type="button" className="h-11" asChild>
              <a href={unduhHref} download>
                Unduh
              </a>
            </Button>
          </div>
          {previewError ? <p className="text-sm text-destructive">{previewError}</p> : null}
          <div className="min-h-[14rem] flex-1 overflow-hidden">
            <EksporPratinjauTabel doc={preview} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
