"use client";

import { EksporLembar } from "@/components/ekspor-lembar";

type Props = {
  unduhPath: string;
  jenisPratinjau: string;
  judulTombol?: string;
};

/** Ekspor daftar CRUD tanpa rentang tanggal/bulan. */
export function EksporDaftarTombol({
  unduhPath,
  jenisPratinjau,
  judulTombol = "Ekspor",
}: Props) {
  return (
    <EksporLembar
      judulTombol={judulTombol}
      unduhPath={unduhPath}
      pratinjauPath={`/api/export/preview?jenis=${encodeURIComponent(jenisPratinjau)}`}
      rentang="bulan"
      defaultDari=""
      defaultSampai=""
      sembunyikanRentang
    />
  );
}
