"use client";

import { EksporLembar } from "@/components/ekspor-lembar";
import { Button } from "@/components/ui/button";

export function JurnalEksporTombol({
  searchQuery,
  defaultDari,
  defaultSampai,
}: {
  searchQuery: Record<string, string>;
  defaultDari: string;
  defaultSampai: string;
}) {
  return (
    <EksporLembar
      judulTombol="Ekspor"
      unduhPath="/api/export/journal"
      pratinjauPath="/api/export/preview?jenis=jurnal"
      rentang="tanggal"
      defaultDari={defaultDari}
      defaultSampai={defaultSampai}
      formats={["xlsx"]}
      extraParams={searchQuery}
      trigger={
        <Button type="button" variant="outline" className="h-11">
          Ekspor
        </Button>
      }
    />
  );
}
