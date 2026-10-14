"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListFilterSheet } from "@/components/list-filter-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function KegagalanPeriodeFilter({
  bagian,
  bulan,
  dari,
  sampai,
}: {
  bagian: string;
  bulan?: string;
  dari?: string;
  sampai?: string;
}) {
  const pathname = usePathname();
  const active = Boolean(bulan || dari || sampai);

  const baseQs = new URLSearchParams();
  baseQs.set("bagian", bagian);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ListFilterSheet
        title="Filter periode"
        description="Bulan atau rentang tanggal semai siklus."
        active={active}
      >
        {(close) => (
          <form
            method="get"
            action={pathname}
            className="grid gap-3"
            onSubmit={() => close()}
          >
            <input type="hidden" name="bagian" value={bagian} />
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Bulan (prioritas)</span>
              <Input name="bulan" type="month" defaultValue={bulan} className="h-11" />
            </label>
            <p className="text-xs text-muted-foreground">Atau rentang tanggal semai:</p>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Dari tanggal</span>
              <Input name="dari" type="date" defaultValue={dari} className="h-11" />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Sampai tanggal</span>
              <Input name="sampai" type="date" defaultValue={sampai} className="h-11" />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" className="h-11">
                Terapkan
              </Button>
              {active ? (
                <Button type="button" variant="ghost" className="h-11" asChild>
                  <Link href={`${pathname}?${baseQs.toString()}`}>Hapus filter</Link>
                </Button>
              ) : null}
            </div>
          </form>
        )}
      </ListFilterSheet>
      <span className="text-sm text-muted-foreground">
        {active
          ? bulan
            ? `Bulan ${bulan}`
            : dari && sampai
              ? `${dari} – ${sampai}`
              : "Filter aktif"
          : "Semua periode"}
      </span>
    </div>
  );
}
