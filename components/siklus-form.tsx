"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { mulaiSiklusSemai } from "@/app/actions/siklus";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { labelPackSiapPakai } from "@/lib/inventaris-ui-labels";
import {
  estimasiGramBenih,
  estimasiSlabRockwool,
  formatAngkaMesin,
  formatAngkaSingkat,
} from "@/lib/hidroponik-asumsi";
import {
  kapasitasLubangBenihPack,
  kapasitasLubangMediaPack,
} from "@/lib/pack-kapasitas-lubang-math";
import { isItemBenih, isItemMedia } from "@/lib/siklus-pack";
import type { SatuanInventaris } from "@prisma/client";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { notify } from "@/lib/notify";

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

function parseLubangPositif(raw: string): number | null {
  const n = Number.parseInt(raw.replace(/\s/g, ""), 10);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

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

  useEffect(() => {
    if (packsMedia.length === 1 && !packMediaId) {
      setPackMediaId(String(packsMedia[0]!.id));
    }
  }, [packsMedia, packMediaId]);

  const jumlahDisemai = parseLubangPositif(jumlahDisemaiRaw);
  const varietasPilih = varietas.find((v) => String(v.id) === varietasId);
  const gramEstimasi =
    varietasPilih && jumlahDisemai != null
      ? estimasiGramBenih(jumlahDisemai, varietasPilih.bijiPerGram)
      : null;
  const slabEstimasi = jumlahDisemai != null ? estimasiSlabRockwool(jumlahDisemai) : null;

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

  const gramPakaiTampil =
    gramEstimasi != null && gramEstimasi > 0 ? formatAngkaSingkat(gramEstimasi, 3) : "";
  const gramPakaiMesin =
    gramEstimasi != null && gramEstimasi > 0 ? formatAngkaMesin(gramEstimasi, 3) : "";
  const mediaPakaiTampil =
    slabEstimasi != null && slabEstimasi > 0 && packMediaId
      ? formatAngkaSingkat(slabEstimasi, 0)
      : "";
  const mediaPakaiMesin =
    slabEstimasi != null && slabEstimasi > 0 && packMediaId ? String(slabEstimasi) : "";

  const satuanBenihLabel = packBenih
    ? satuanInventarisLabel[packBenih.satuan as SatuanInventaris]
    : "gram";
  const satuanMediaLabel = packMedia
    ? satuanInventarisLabel[packMedia.satuan as SatuanInventaris]
    : "unit";

  const siapSimpan =
    varietasId &&
    jumlahDisemai != null &&
    packBenihId &&
    gramPakaiMesin &&
    !packSama &&
    (kapBenih == null || jumlahDisemai <= kapBenih) &&
    (!packMediaId || (mediaPakaiMesin && (kapMedia == null || jumlahDisemai <= kapMedia)));

  function validasiSebelumKirim(): boolean {
    if (!varietasId) {
      notify.error("Pilih varietas.");
      return false;
    }
    if (jumlahDisemai == null) {
      notify.error("Jumlah lubang harus angka positif (minimal 1).");
      return false;
    }
    if (!packBenihId) {
      notify.error("Pilih paket benih.");
      return false;
    }
    if (!gramPakaiMesin) {
      notify.error("Isi jumlah lubang dan varietas agar benih terhitung.");
      return false;
    }
    if (packSama) {
      notify.error("Paket benih dan media tidak boleh sama.");
      return false;
    }
    if (kapBenih != null && jumlahDisemai > kapBenih) {
      notify.error(`Maksimal ${kapBenih} lubang untuk sisa paket benih.`);
      return false;
    }
    if (packMediaId && kapMedia != null && jumlahDisemai > kapMedia) {
      notify.error(`Maksimal ${kapMedia} lubang untuk sisa paket media.`);
      return false;
    }
    return true;
  }

  return (
    <form
      action={formAction}
      className="space-y-4"
      onSubmit={(e) => {
        if (!validasiSebelumKirim()) e.preventDefault();
      }}
    >
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Varietas</span>
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
        <span className="font-medium">Kolam kosong</span>
        <select name="kolamId" required className={selectClass} defaultValue="">
          <option value="" disabled>
            Pilih kolam
          </option>
          {kolam.map((k) => (
            <option key={k.id} value={k.id}>
              {k.label} · {k.kapasitas} lubang
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Tanggal semai</span>
        <Input name="tanggalSemai" type="date" required className="h-11" defaultValue={tanggalAwal} />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Jumlah lubang disemai</span>
        <Input
          name="jumlahDisemai"
          required
          min={1}
          className="h-11 tabular-nums"
          inputMode="numeric"
          pattern="[0-9]+"
          placeholder="mis. 480"
          value={jumlahDisemaiRaw}
          onChange={(e) => setJumlahDisemaiRaw(e.target.value.replace(/[^\d\s]/g, ""))}
        />
        {jumlahDisemaiRaw && jumlahDisemai == null ? (
          <p className="text-xs text-destructive" role="alert">
            Isi angka positif (minimal 1).
          </p>
        ) : null}
        {kapBenih != null && jumlahDisemai != null ? (
          <p className="text-xs text-muted-foreground">
            Paket benih: maks. {kapBenih} lubang
            {jumlahDisemai > kapBenih ? (
              <span className="text-destructive"> — melebihi sisa</span>
            ) : null}
          </p>
        ) : null}
      </label>

      <fieldset className="space-y-3 rounded-md border border-dashed p-3">
        <legend className="px-1 text-sm font-medium">Benih</legend>

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Paket benih</span>
          <select
            name="activePackBenihId"
            required
            className={selectClass}
            defaultValue=""
            onChange={(e) => setPackBenihId(e.target.value)}
          >
            <option value="" disabled>
              Pilih paket benih
            </option>
            {packsBenih.length === 0 ? (
              <option value="" disabled>
                Belum ada paket — buat di menu Paket siap pakai
              </option>
            ) : null}
            {packsBenih.map((p) => {
              const kap =
                varietasPilih && p.satuan === "GRAM"
                  ? kapasitasLubangBenihPack(Number(p.sisaUnit), varietasPilih.bijiPerGram)
                  : null;
              return (
                <option key={p.id} value={p.id}>
                  {labelPackSiapPakai({
                    itemNama: p.itemNama,
                    sisaUnit: p.sisaUnit,
                    satuanLabel: satuanInventarisLabel[p.satuan as SatuanInventaris],
                    kapLubang: kap,
                  })}
                </option>
              );
            })}
          </select>
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Benih dipakai ({satuanBenihLabel})</span>
          <input type="hidden" name="jumlahBenihPakai" value={gramPakaiMesin} />
          <Input
            readOnly
            aria-readonly
            className="h-11 bg-muted/40 tabular-nums text-right"
            value={gramPakaiTampil}
            placeholder="Pilih varietas, lubang, dan paket"
          />
        </label>
      </fieldset>

      <fieldset className="space-y-3 rounded-md border border-dashed p-3">
        <legend className="px-1 text-sm font-medium">Media rockwool (opsional)</legend>

        {jumlahDisemai != null && slabEstimasi != null && slabEstimasi > 0 ? (
          <p className="text-xs text-muted-foreground">
            Perkiraan rockwool untuk {jumlahDisemai.toLocaleString("id-ID")} lubang:{" "}
            <strong>{formatAngkaSingkat(slabEstimasi, 0)} slab</strong> (asumsi 720 lubang/slab).
            {packMediaId ? null : " Pilih paket media di bawah agar biaya rockwool ikut HPP."}
          </p>
        ) : null}

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Paket media</span>
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
                  {labelPackSiapPakai({
                    itemNama: p.itemNama,
                    sisaUnit: p.sisaUnit,
                    satuanLabel: satuanInventarisLabel[p.satuan as SatuanInventaris],
                    kapLubang: kap > 0 ? kap : null,
                  })}
                </option>
              );
            })}
          </select>
          {packsMedia.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Buat paket rockwool di menu Paket siap pakai bila perlu.
            </p>
          ) : null}
        </label>

        {packSama ? (
          <p className="text-sm text-destructive" role="alert">
            Paket benih dan media tidak boleh sama.
          </p>
        ) : null}

        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Media dipakai ({satuanMediaLabel})</span>
          <input type="hidden" name="jumlahMediaPakai" value={mediaPakaiMesin} />
          <Input
            readOnly
            aria-readonly
            className="h-11 bg-muted/40 tabular-nums text-right"
            value={mediaPakaiTampil}
            disabled={!packMediaId}
            placeholder={packMediaId ? "0" : "—"}
          />
          {kapMedia != null && jumlahDisemai != null && packMediaId ? (
            <p className="text-xs text-muted-foreground">
              Paket media: maks. {kapMedia} lubang
              {jumlahDisemai > kapMedia ? (
                <span className="text-destructive"> — melebihi sisa</span>
              ) : null}
            </p>
          ) : null}
        </label>
      </fieldset>

      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="Menyimpan..." disabled={!siapSimpan}>
        Simpan semai
      </SubmitButton>
    </form>
  );
}
