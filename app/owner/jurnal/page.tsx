import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { listJurnal, type FilterJurnal } from "@/lib/jurnal";
import { statusJurnalLabel, statusJurnalList } from "@/lib/jurnal-status";

export const dynamic = "force-dynamic";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export default async function OwnerJurnalPage({
  searchParams,
}: {
  searchParams: FilterJurnal;
}) {
  const rows = await listJurnal(searchParams);
  const adaFilter = Boolean(searchParams.status || searchParams.dari || searchParams.sampai);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jurnal"
        description="US2.6 — lihat dan filter jurnal; tanpa buat/edit/approve."
      />

      <form
        method="get"
        aria-label="Filter jurnal"
        className="grid gap-3 rounded-md border p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
      >
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Dari tanggal</span>
          <Input name="dari" type="date" defaultValue={searchParams.dari} className="h-11" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Sampai tanggal</span>
          <Input name="sampai" type="date" defaultValue={searchParams.sampai} className="h-11" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Status</span>
          <select name="status" defaultValue={searchParams.status ?? ""} className={selectClass}>
            <option value="">Semua status</option>
            {statusJurnalList.map((s) => (
              <option key={s} value={s}>
                {statusJurnalLabel[s]}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="outline" className="h-11">
            Terapkan
          </Button>
          {adaFilter ? (
            <Link
              href="/owner/jurnal"
              className="inline-flex h-11 items-center rounded-md px-3 text-sm hover:bg-accent"
            >
              Hapus filter
            </Link>
          ) : null}
        </div>
      </form>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{`${rows.length} jurnal${adaFilter ? " sesuai filter" : ""}`}</h2>
        {rows.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Tidak ada jurnal untuk filter ini.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {rows.map((j) => {
              const total = j.baris.reduce(
                (sum, b) => sum.add(b.debit),
                new Prisma.Decimal(0),
              );
              return (
                <li key={j.id}>
                  <Link
                    href={`/owner/jurnal/${j.id}`}
                    className="flex flex-col gap-1 p-4 hover:bg-accent sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{j.keterangan}</p>
                      <p className="text-xs text-muted-foreground">
                        {`${formatTanggal(j.tanggal)} · ${j.dibuatOleh.nama}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums">{formatRupiah(total)}</span>
                      <Badge variant="secondary">{statusJurnalLabel[j.status]}</Badge>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
