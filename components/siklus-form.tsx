"use client";

import { useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { mulaiSiklusSemai } from "@/app/actions/siklus";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import {
  estimasiGramBenih,
  estimasiSlabRockwool,
  formatAngkaSingkat,
} from "@/lib/hidroponik-asumsi";
import {
  kapasitasLubangBenihPack,
  kapasitasLubangMediaPack,
} from "@/lib/pack-kapasitas-lubang-math";
import { isItemBenih, isItemMedia } from "@/lib/siklus-pack";
import type { SatuanInventaris } from "@prisma/client";
import { useActionToast } from "@/lib/hooks/use-action-toast";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type VarietasOpt = { id: number; nama: string; bijiPerGram: number };
type KolamOpt = { id: number; label: string; kapasitas: number };
type PackOpt = {
  id: number;
  kode: string;
  itemKode: string;
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
  useActionToast({ error: state.error, ok: state.ok });
  const [varietasId, setVarietasId] = useState("");
  const [jumlahDisemaiRaw, setJumlahDisemaiRaw] = useState("");
  const [packBenihId, setPackBenihId] = useState("");
  const [packMediaId, setPackMediaId] = useState("");

  const packsBenih = useMemo(
    () => packs.filter((p) => isItemBenih(p.itemKode)),
    [packs],
  );
  const packsMedia = useMemo(
    () => packs.filter((p) => isItemMedia(p.itemKode)),
    [packs],
  );

  const jumlahDisemai = Number.parseInt(jumlahDisemaiRaw.replace(/\s/g, ""), 10);
  const varietasPilih = varietas.find((v) => String(v.id) === varietasId);
  const gramEstimasi =
    varietasPilih && Number.isFinite(jumlahDisemai) && jumlahDisemai > 0
      ? estimasiGramBenih(jumlahDisemai, varietasPilih.bijiPerGram)
      : null;
  const slabEstimasi =
    Number.isFinite(jumlahDisemai) && jumlahDisemai > 0
      ? estimasiSlabRockwool(jumlahDisemai)
      : null;

  const packBenih = packs.find((p) => String(p.id) === packBenihId);
  const packMedia = packs.find((p) => String(p.id) === packMediaId);
  const packSama = packBenihId && packMediaId && packBenihId === packMediaId;

  const kapBenih =
    packBenih && varietasPilih
      ? kapasitasLubangBenihPack(Number(packBenih.sisaUnit), varietasPilih.bijiPerGram)
      : null;
  const kapMedia = packMedia
    ? kapasitasLubangMediaPack(Number(packMedia.sisaUnit), packMedia.itemKode)
    : null;
  const gramPakai =
    gramEstimasi != null && Number.isFinite(gramEstimasi) ? formatAngkaSingkat(gramEstimasi, 4) : "";
  const mediaPakai =
    slabEstimasi != null && packMediaId ? String(slabEstimasi) : "";

  const satuanBenihLabel = packBenih
    ? satuanInventarisLabel[packBenih.satuan as SatuanInventaris]
    : "gram";
  const satuanMediaLabel = packMedia
    ? satuanInventarisLabel[packMedia.satuan as SatuanInventaris]
    : "unit";

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">Mulai siklus semai</h2>
      <p className="text-sm text-muted-foreground">
        <strong>Jumlah disemai = lubang/bibit.</strong> Sistem hitung potong proporsional pack
        (gram benih &amp; slab media) dari varietas + kapasitas lubang pack (v2-C.1).
      </p>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Varietas aktif</span>
        <select
          name="varietasId"
          required
          className={selectClass}
          defaultValue=""
          onChange={(e) => setVarietasId(e.target.value)}
        >
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
        <span className="font-medium">Jumlah disemai (bibit / pohon)</span>
        <Input
          name="jumlahDisemai"
          required
          className="h-11"
          inputMode="numeric"
          placeholder="mis. 480"
          onChange={(e) => setJumlahDisemaiRaw(e.target.value)}
        />
        {kapBenih != null && Number.isFinite(jumlahDisemai) && jumlahDisemai > 0 ? (
          <p className="text-xs text-muted-foreground">
            Pack benih: max {kapBenih} lubang
            {jumlahDisemai > kapBenih ? (
              <span className="text-destructive"> — melebihi sisa pack</span>
            ) : null}
          </p>
        ) : null}
      </label>

      <fieldset className="space-y-3 rounded-md border border-dashed p-3">
        <legend className="px-1 text-sm font-medium">Benih (wajib)</legend>

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Active pack benih</span>
          <select
            name="activePackBenihId"
            required
            className={selectClass}
            defaultValue=""
            onChange={(e) => setPackBenihId(e.target.value)}
          >
            <option value="" disabled>
              Pilih pack benih (BNH-…)
            </option>
            {packsBenih.length === 0 ? (
              <option value="" disabled>
                Belum ada pack benih — buat di Active pack
              </option>
            ) : null}
            {packsBenih.map((p) => {
              const kap =
                varietasPilih && p.satuan === "GRAM"
                  ? kapasitasLubangBenihPack(Number(p.sisaUnit), varietasPilih.bijiPerGram)
                  : null;
              return (
                <option key={p.id} value={p.id}>
                  {p.kode} — {p.itemNama} (sisa {p.sisaUnit}{" "}
                  {satuanInventarisLabel[p.satuan as SatuanInventaris]}
                  {kap != null ? ` · ~${kap} lubang` : ""})
                </option>
              );
            })}
          </select>
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Potong proporsional benih ({satuanBenihLabel})</span>
          <Input
            name="jumlahBenihPakai"
            required
            readOnly
            className="h-11 bg-muted/40"
            value={gramPakai}
            placeholder="Isi jumlah lubang + pilih varietas/pack"
          />
        </label>
      </fieldset>

      <fieldset className="space-y-3 rounded-md border border-dashed p-3">
        <legend className="px-1 text-sm font-medium">Media semai (opsional)</legend>

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Active pack media</span>
          <select
            name="activePackMediaId"
            className={selectClass}
            defaultValue=""
            onChange={(e) => setPackMediaId(e.target.value)}
          >
            <option value="">Tidak dipakai</option>
            {packsMedia.map((p) => {
              const kap = kapasitasLubangMediaPack(Number(p.sisaUnit), p.itemKode);
              return (
                <option key={`m-${p.id}`} value={p.id}>
                  {p.kode} — {p.itemNama} (sisa {p.sisaUnit}{" "}
                  {satuanInventarisLabel[p.satuan as SatuanInventaris]}
                  {kap > 0 ? ` · ~${kap} lubang` : ""})
                </option>
              );
            })}
          </select>
          {packsMedia.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Buat active pack untuk item RW-SLAB (rockwool) di menu Active pack.
            </p>
          ) : null}
        </label>

        {packSama ? (
          <p className="text-sm text-destructive" role="alert">
            Jangan pilih pack benih yang sama untuk media — stok akan dipotong dua kali.
          </p>
        ) : null}

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Potong proporsional media ({satuanMediaLabel})</span>
          <Input
            name="jumlahMediaPakai"
            className="h-11 bg-muted/40"
            readOnly
            value={mediaPakai}
            disabled={!packMediaId}
            placeholder={packMediaId ? "0" : "—"}
          />
          {kapMedia != null && Number.isFinite(jumlahDisemai) && jumlahDisemai > 0 ? (
            <p className="text-xs text-muted-foreground">
              Pack media: max {kapMedia} lubang
              {jumlahDisemai > kapMedia ? (
                <span className="text-destructive"> — melebihi sisa pack</span>
              ) : null}
            </p>
          ) : null}
        </label>
      </fieldset>

      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan siklus
      </SubmitButton>
    </form>
  );
}
