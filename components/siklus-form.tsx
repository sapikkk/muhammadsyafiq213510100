"use client";

import { useFormState } from "react-dom";
import { mulaiSiklusSemai } from "@/app/actions/siklus";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { SatuanInventaris } from "@prisma/client";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type VarietasOpt = { id: number; nama: string };
type KolamOpt = { id: number; label: string; kapasitas: number };
type PackOpt = {
  id: number;
  kode: string;
  itemNama: string;
  satuan: string;
  sisaUnit: string;
};

export function SiklusForm({
  varietas,
  kolam,
  packs,
  tanggalAwal,
}: {
  varietas: VarietasOpt[];
  kolam: KolamOpt[];
  packs: PackOpt[];
  tanggalAwal: string;
}) {
  const [state, formAction] = useFormState(mulaiSiklusSemai, {});

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">Mulai siklus semai</h2>
      <p className="text-sm text-muted-foreground">
        Varietas aktif, kolam, dan active pack benih (wajib) akan dipotong atomik.
        Gagal simpan = rollback otomatis.
      </p>
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-primary" role="status">
          {state.ok}
        </p>
      ) : null}

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Varietas aktif</span>
        <select name="varietasId" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih varietas
          </option>
          {varietas.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nama}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Kolam</span>
        <select name="kolamId" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih kolam
          </option>
          {kolam.map((k) => (
            <option key={k.id} value={k.id}>
              {k.label} (kap. {k.kapasitas} lubang)
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tanggal semai</span>
        <Input name="tanggalSemai" type="date" required className="h-11" defaultValue={tanggalAwal} />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah disemai (bibit)</span>
        <Input name="jumlahDisemai" required className="h-11" inputMode="numeric" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Active pack benih</span>
        <select name="activePackBenihId" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih pack aktif
          </option>
          {packs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.kode} — {p.itemNama} (sisa {p.sisaUnit}{" "}
              {satuanInventarisLabel[p.satuan as SatuanInventaris]})
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah benih dari pack</span>
        <Input name="jumlahBenihPakai" required className="h-11" inputMode="decimal" />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Active pack media (opsional)</span>
        <select name="activePackMediaId" className={selectClass} defaultValue="">
          <option value="">Tidak dipakai</option>
          {packs.map((p) => (
            <option key={`m-${p.id}`} value={p.id}>
              {p.kode} — {p.itemNama}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah media dari pack</span>
        <Input name="jumlahMediaPakai" className="h-11" inputMode="decimal" />
      </label>

      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan siklus
      </SubmitButton>
    </form>
  );
}
