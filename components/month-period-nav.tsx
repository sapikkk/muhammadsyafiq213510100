"use client";

import { OwnerPeriodFilter } from "@/components/owner-period-filter";
import { parsePeriodeMode } from "@/lib/period-nav";

/** @deprecated Pakai OwnerPeriodFilter — wrapper agar impor lama tetap jalan. */
export function MonthPeriodNav({
  dari,
  sampai,
  preserveKeys = ["laporan"],
  periode = "bulan",
}: {
  dari: string;
  sampai: string;
  preserveKeys?: string[];
  periode?: string;
}) {
  return (
    <OwnerPeriodFilter
      dari={dari}
      sampai={sampai}
      periode={parsePeriodeMode(periode)}
      preserveKeys={preserveKeys}
      rentangField="month"
      rentangOptionLabel="Rentang bulan"
    />
  );
}
