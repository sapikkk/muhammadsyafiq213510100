"use client";

import type { CatatUangPihakBundle } from "@/lib/catat-uang-pihak-types";
import { SmartJurnalForm } from "@/components/smart-jurnal-form";
import { JurnalForm } from "@/components/jurnal-form";
import type { RekeningKasOption } from "@/lib/rekening-kas-types";

type AkunOpt = { id: number; kode: string; nama: string };
type LahanOpt = { id: number; label: string };

export function JurnalBaruPanel({
  akun,
  tanggalAwal,
  periodeTutup,
  mode = "admin-uang",
  lahanOptions = [],
  pihak,
  rekeningOptions = [],
}: {
  akun: AkunOpt[];
  tanggalAwal: string;
  periodeTutup: string | null;
  mode?: "admin-uang" | "owner-koreksi";
  lahanOptions?: LahanOpt[];
  pihak?: CatatUangPihakBundle;
  rekeningOptions?: RekeningKasOption[];
}) {
  if (mode === "owner-koreksi") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Koreksi manual hanya untuk Owner (selisih kecil atau penyesuaian). Transaksi harian Admin lewat
          menu catat uang otomatis.
        </p>
        <JurnalForm akun={akun} tanggalAwal={tanggalAwal} periodeTutup={periodeTutup} actionKind="owner" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pilih jenis uang masuk atau keluar. Penjualan sayur, panen, dan penyusutan tidak perlu dicatat di
        sini (sistem buat sendiri).
      </p>
      <SmartJurnalForm
        tanggalAwal={tanggalAwal}
        periodeTutup={periodeTutup}
        lahanOptions={lahanOptions}
        pihak={pihak ?? { petani: [], pelanggan: [], pemilik: [] }}
        rekeningOptions={rekeningOptions}
      />
    </div>
  );
}
