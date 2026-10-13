"use client";

import { EksporLembar } from "@/components/ekspor-lembar";
import { Button } from "@/components/ui/button";

export function SiklusEksporPaket({ siklusId }: { siklusId: number }) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <EksporLembar
      judulTombol="Cetak berkas siklus"
      unduhPath={`/api/export/siklus/${siklusId}`}
      pratinjauPath={`/api/export/preview?jenis=siklus-paket&siklusId=${siklusId}`}
      rentang="tanggal"
      defaultDari={today}
      defaultSampai={today}
      sembunyikanRentang
      trigger={
        <Button type="button" variant="outline" className="h-11">
          Cetak berkas siklus
        </Button>
      }
    />
  );
}
