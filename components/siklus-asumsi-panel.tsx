"use client";

import { useMemo, useState } from "react";
import {
  ROCKWOOL,
  estimasiGramBenih,
  estimasiSlabRockwool,
  formatAngkaSingkat,
} from "@/lib/hidroponik-asumsi";

type VarietasMeta = {
  id: number;
  nama: string;
  bijiPerGram: number;
};

export function SiklusAsumsiPanel({ varietas }: { varietas: VarietasMeta[] }) {
  const [varietasId, setVarietasId] = useState("");
  const [jumlahRaw, setJumlahRaw] = useState("");

  const jumlah = Number.parseInt(jumlahRaw.replace(/\s/g, ""), 10);
  const selected = varietas.find((v) => String(v.id) === varietasId);

  const slab = useMemo(() => estimasiSlabRockwool(jumlah), [jumlah]);
  const gram = useMemo(
    () => (selected ? estimasiGramBenih(jumlah, selected.bijiPerGram) : 0),
    [jumlah, selected],
  );
  const bal = slab > 0 ? Math.ceil(slab / ROCKWOOL.slabPerBal) : 0;

  return (
    <section
      className="space-y-3 rounded-md border border-dashed bg-muted/30 p-4 text-sm"
      aria-labelledby="siklus-asumsi-heading"
    >
      <h2 id="siklus-asumsi-heading" className="text-base font-semibold">
        Bantuan perhitungan media & benih
      </h2>
      <p className="text-muted-foreground">
        Rockwool slab ±{ROCKWOOL.slabCm.panjang}×{ROCKWOOL.slabCm.lebar}×
        {ROCKWOOL.slabCm.tebal} cm dipotong dadu {ROCKWOOL.daduCm}³ cm →{" "}
        <strong>{ROCKWOOL.daduPerSlab} dadu/slab</strong> (1 bal ≈{" "}
        {ROCKWOOL.slabPerBal} slab). Asumsi: 1 bibit = 1 dadu.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="font-medium">Varietas (biji/gram dari master)</span>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
            value={varietasId}
            onChange={(e) => setVarietasId(e.target.value)}
          >
            <option value="">Pilih untuk estimasi gram</option>
            {varietas.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nama} (~{formatAngkaSingkat(v.bijiPerGram, 0)} biji/g)
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Jumlah bibit (coba)</span>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
            inputMode="numeric"
            placeholder="mis. 720"
            value={jumlahRaw}
            onChange={(e) => setJumlahRaw(e.target.value)}
          />
        </label>
      </div>

      {Number.isFinite(jumlah) && jumlah > 0 ? (
        <ul className="list-inside list-disc space-y-1 text-foreground">
          <li>
            Rockwool: ±<strong>{slab}</strong> slab
            {bal > 0 ? (
              <>
                {" "}
                (≈ {bal} bal jika slab dibeli per {ROCKWOOL.slabPerBal})
              </>
            ) : null}
          </li>
          {selected ? (
            <li>
              Benih: ±<strong>{formatAngkaSingkat(gram, 2)} g</strong> pada{" "}
              {formatAngkaSingkat(selected.bijiPerGram, 0)} biji/g
            </li>
          ) : (
            <li className="text-muted-foreground">Pilih varietas untuk estimasi gram benih.</li>
          )}
        </ul>
      ) : (
        <p className="text-muted-foreground">Isi jumlah bibit untuk melihat estimasi slab/bal.</p>
      )}
    </section>
  );
}
