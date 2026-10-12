"use client";

import { SmartJurnalForm } from "@/components/smart-jurnal-form";
import { JurnalForm } from "@/components/jurnal-form";

type AkunOpt = { id: number; kode: string; nama: string };
type LahanOpt = { id: number; label: string };

export function JurnalBaruPanel({
  akun,
  tanggalAwal,
  periodeTutup,
  mode = "admin-uang",
  lahanOptions = [],
}: {
  akun: AkunOpt[];
  tanggalAwal: string;
  periodeTutup: string | null;
  mode?: "admin-uang" | "owner-koreksi";
  lahanOptions?: LahanOpt[];
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
      />
    </div>
  );
}
