"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ListFilterSheet } from "@/components/list-filter-sheet";
import { Button } from "@/components/ui/button";
import { statusJurnalLabel, statusJurnalList } from "@/lib/jurnal-status";

export function JurnalListFilter({
  basePath,
  status,
  selectClass,
  periodeQuery,
}: {
  basePath: string;
  status?: string;
  selectClass: string;
  /** Query periode & tanggal/bulan — dipertahankan saat filter status. */
  periodeQuery: string;
}) {
  const searchParams = useSearchParams();
  const active = Boolean(status);
  const clearHref = periodeQuery ? `${basePath}?${periodeQuery}` : basePath;

  return (
    <ListFilterSheet
      title="Filter status"
      description="Batasi status jurnal."
      active={active}
    >
      {(close) => (
        <form
          method="get"
          className="grid gap-3"
          onSubmit={() => close()}
        >
          {Array.from(searchParams.entries())
            .filter(([k]) => k !== "status")
            .map(([k, v]) => (
              <input key={k} type="hidden" name={k} value={v} />
            ))}
          <label className="block space-y-1.5 text-sm">
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
          <div className="flex flex-wrap gap-2">
            <Button type="submit" className="h-11">
              Terapkan
            </Button>
            {active ? (
              <Button type="button" variant="ghost" className="h-11" asChild>
                <Link href={clearHref}>Hapus filter</Link>
              </Button>
            ) : null}
          </div>
        </form>
      )}
    </ListFilterSheet>
  );
}
