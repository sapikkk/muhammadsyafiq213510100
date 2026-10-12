"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { ubahStatusKolam } from "@/app/actions/infrastruktur";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kolamStatusLabel, kolamStatusList, type KolamStatus } from "@/lib/infrastruktur-kolam-status";
import type { SerializedInfrastrukturPohon, SerializedKolam } from "@/lib/infrastruktur-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { labelLahanUntukLayar } from "@/lib/produksi-ui-labels";

type Pohon = SerializedInfrastrukturPohon;

function filterPohon(data: Pohon, query: string): Pohon {
  const q = query.trim().toLowerCase();
  if (!q) return data;

  const lahan = data.lahan
    .map((lahan) => {
      const lahanMatch = String(lahan.id).includes(q);
      const greenhouse = lahan.greenhouse
        .map((gh) => {
          const ghMatch = gh.nama.toLowerCase().includes(q);
          const kolam = gh.kolam.filter(
            (k) =>
              k.nama.toLowerCase().includes(q) ||
              String(k.kapasitasLubang).includes(q),
          );
          if (ghMatch || kolam.length > 0) {
            return { ...gh, kolam: ghMatch ? gh.kolam : kolam };
          }
          return null;
        })
        .filter((g): g is (typeof lahan.greenhouse)[number] => g !== null);
      if (lahanMatch || greenhouse.length > 0) {
        return { ...lahan, greenhouse: lahanMatch ? lahan.greenhouse : greenhouse };
      }
      return null;
    })
    .filter((l): l is (typeof data.lahan)[number] => l !== null);

  return { ...data, lahan };
}

function KolamStatusBadge({ status }: { status: KolamStatus }) {
  const label = kolamStatusLabel[status] ?? status;
  const variant = status === "MENGANGGUR" ? "outline" : ("secondary" as const);
  return <Badge variant={variant}>{label}</Badge>;
}

function KolamStatusDialog({ kolam }: { kolam: SerializedKolam }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(kolam.status as KolamStatus);
  const [state, action] = useFormState(ubahStatusKolam, {});
  useActionToast({ error: state.error, ok: state.ok });

  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state.ok]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-8 text-xs">
          Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Status kolam {kolam.nama}</DialogTitle>
          <DialogDescription>
            Menganggur = siap dipakai semai; terpakai = ada siklus aktif di kolam ini.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 pt-2">
          <input type="hidden" name="kolamId" value={kolam.id} />
          <input type="hidden" name="status" value={status} />
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Status</span>
            <Select value={status} onValueChange={(v) => setStatus(v as KolamStatus)}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {kolamStatusList.map((s) => (
                  <SelectItem key={s} value={s}>
                    {kolamStatusLabel[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <SubmitButton pendingLabel="…">Simpan</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type GhBaris = {
  lahan: Pohon["lahan"][number];
  gh: Pohon["lahan"][number]["greenhouse"][number];
};

function GreenhouseBaris({
  baris,
  writable,
}: {
  baris: GhBaris;
  writable: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { lahan, gh } = baris;
  const kapasitas = gh.kolam.reduce((n, k) => n + k.kapasitasLubang, 0);
  const lahanLabel = labelLahanUntukLayar(
    lahan.id,
    lahan.greenhouse.map((g) => g.nama).join(", ") || null,
  );

  return (
    <>
      <TableRow>
        <TableCell className="w-10 p-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-expanded={open}
            aria-label={open ? "Tutup detail kolam" : "Buka detail kolam"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell className="font-medium">{gh.nama}</TableCell>
        <TableCell className="text-muted-foreground">{lahanLabel}</TableCell>
        <TableCell>{gh.nilaiInvestasi}</TableCell>
        <TableCell>{gh.umurEkonomis} bln</TableCell>
        <TableCell>{gh.depresiasiPerBulan}/bln</TableCell>
        <TableCell>
          {gh.kolam.length} kolam ·{" "}
          {kapasitas.toLocaleString("id-ID")} lubang
        </TableCell>
      </TableRow>
      {open ? (
        <TableRow className="bg-muted/20 hover:bg-muted/20">
          <TableCell colSpan={7} className="p-0">
            <div className="space-y-2 border-t px-4 py-3 text-sm">
              <p className="text-muted-foreground">
                {lahanLabel}: sewa {lahan.nilaiSewa} / {lahan.masaSewa} bulan · amortisasi{" "}
                {lahan.amortisasiPerBulan}/bulan · listrik {lahan.biayaListrikBulan}/bulan (seluruh
                greenhouse di lahan ini)
              </p>
              {gh.kolam.length === 0 ? (
                <p className="text-muted-foreground">Belum ada kolam.</p>
              ) : (
                <Table noContainer>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kolam</TableHead>
                      <TableHead>Kapasitas</TableHead>
                      <TableHead>Status</TableHead>
                      {writable ? <TableHead className="w-24" /> : null}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gh.kolam.map((k) => (
                      <TableRow key={k.id}>
                        <TableCell className="font-medium">{k.nama}</TableCell>
                        <TableCell>
                          {k.kapasitasLubang.toLocaleString("id-ID")} lubang
                        </TableCell>
                        <TableCell>
                          <KolamStatusBadge status={k.status as KolamStatus} />
                        </TableCell>
                        {writable ? (
                          <TableCell>
                            <KolamStatusDialog kolam={k} />
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}

export function InfrastrukturPohon({
  data,
  mode = "owner",
}: {
  data: Pohon;
  mode?: "admin" | "owner";
}) {
  const [filter, setFilter] = useState("");
  const view = useMemo(() => filterPohon(data, filter), [data, filter]);
  const barisGreenhouse = useMemo(() => {
    const out: GhBaris[] = [];
    for (const lahan of view.lahan) {
      for (const gh of lahan.greenhouse) {
        out.push({ lahan, gh });
      }
    }
    return out;
  }, [view]);
  const writable = mode === "admin";

  if (data.lahan.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada data lahan. Admin dapat menambah lahan lewat tombol di atas.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Cari greenhouse atau kolam…"
        className="h-9 max-w-sm"
        aria-label="Cari infrastruktur"
      />
      <p className="text-sm text-muted-foreground">
        Total kapasitas lubang:{" "}
        <span className="font-medium text-foreground">
          {data.totalKapasitasLubang.toLocaleString("id-ID")}
        </span>
        {data.totalKapasitasLubang === 1920 ? (
          <span className="text-primary"> (target 1.920 tercapai)</span>
        ) : null}
      </p>
      {barisGreenhouse.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          {view.lahan.length === 0
            ? "Tidak ada baris yang cocok dengan pencarian."
            : "Belum ada greenhouse. Admin dapat menambah dari tombol di atas."}
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Greenhouse</TableHead>
              <TableHead>Lahan</TableHead>
              <TableHead>Investasi</TableHead>
              <TableHead>Umur</TableHead>
              <TableHead>Depresiasi</TableHead>
              <TableHead>Ringkasan kolam</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barisGreenhouse.map((baris) => (
              <GreenhouseBaris
                key={baris.gh.id}
                baris={baris}
                writable={writable}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
