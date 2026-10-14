"use client";

import Link from "next/link";
import { ListFilterSheet } from "@/components/list-filter-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { statusJurnalLabel, statusJurnalList } from "@/lib/jurnal-status";

export function JurnalListFilter({
  basePath,
  dari,
  sampai,
  status,
  selectClass,
}: {
  basePath: string;
  dari?: string;
  sampai?: string;
  status?: string;
  selectClass: string;
}) {
  const active = Boolean(dari || sampai || status);

  return (
    <ListFilterSheet
      title="Filter catatan"
      description="Batasi tanggal dan status jurnal."
      active={active}
    >
      {(close) => (
        <form
          method="get"
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={() => close()}
        >
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Dari tanggal</span>
            <Input name="dari" type="date" defaultValue={dari} className="h-11" />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Sampai tanggal</span>
            <Input name="sampai" type="date" defaultValue={sampai} className="h-11" />
          </label>
          <label className="block space-y-1.5 text-sm sm:col-span-2">
            <span className="font-medium">Status</span>
            <select name="status" defaultValue={status ?? ""} className={selectClass}>
              <option value="">Semua status</option>
              {statusJurnalList.map((s) => (
                <option key={s} value={s}>
                  {statusJurnalLabel[s]}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit" className="h-11">
              Terapkan
            </Button>
            {active ? (
              <Button type="button" variant="ghost" className="h-11" asChild>
                <Link href={basePath}>Hapus filter</Link>
              </Button>
            ) : null}
          </div>
        </form>
      )}
    </ListFilterSheet>
  );
}
