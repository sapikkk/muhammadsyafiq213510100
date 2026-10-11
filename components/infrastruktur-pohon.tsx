"use client";

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
import { useActionToast } from "@/lib/hooks/use-action-toast";

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

export function InfrastrukturPohon({
  data,
  mode = "owner",
}: {
  data: Pohon;
  mode?: "admin" | "owner";
}) {
  const [filter, setFilter] = useState("");
  const view = useMemo(() => filterPohon(data, filter), [data, filter]);
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
      {view.lahan.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Tidak ada baris yang cocok dengan pencarian.
        </p>
      ) : (
        <div className="space-y-6">
          {view.lahan.map((lahan) => (
            <section key={lahan.id} className="rounded-md border p-4 text-sm">
              <h3 className="font-semibold">Lahan #{lahan.id}</h3>
              <p className="mt-1 text-muted-foreground">
                Sewa {lahan.nilaiSewa} / {lahan.masaSewa} bulan · amortisasi{" "}
                {lahan.amortisasiPerBulan}/bulan
              </p>
              {lahan.greenhouse.length === 0 ? (
                <p className="mt-2 text-muted-foreground">Belum ada greenhouse.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {lahan.greenhouse.map((gh) => (
                    <li key={gh.id} className="rounded-md border border-dashed p-3">
                      <p className="font-medium">{gh.nama}</p>
                      <p className="text-muted-foreground">
                        Investasi {gh.nilaiInvestasi} · umur {gh.umurEkonomis} bulan · depresiasi{" "}
                        {gh.depresiasiPerBulan}/bulan
                      </p>
                      {gh.kolam.length === 0 ? (
                        <p className="mt-2 text-muted-foreground">Belum ada kolam.</p>
                      ) : (
                        <ul className="mt-2 divide-y rounded-md border">
                          {gh.kolam.map((k) => (
                            <li key={k.id} className="flex flex-wrap items-center gap-2 p-2">
                              <span className="font-medium">{k.nama}</span>
                              <span className="text-muted-foreground">
                                {k.kapasitasLubang.toLocaleString("id-ID")} lubang
                              </span>
                              <KolamStatusBadge status={k.status as KolamStatus} />
                              {writable ? <KolamStatusDialog kolam={k} /> : null}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
