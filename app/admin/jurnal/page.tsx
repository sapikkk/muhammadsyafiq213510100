import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { listJurnal, type FilterJurnal } from "@/lib/jurnal";
import { statusJurnalLabel, statusJurnalList } from "@/lib/jurnal-status";

export const dynamic = "force-dynamic";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export default async function JurnalPage({
  searchParams,
}: {
  searchParams: FilterJurnal;
}) {
  const rows = await listJurnal(searchParams);
  const adaFilter = Boolean(searchParams.status || searchParams.dari || searchParams.sampai);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight">Jurnal</h1>
          <p className="text-muted-foreground">
            Saldo akun hanya berubah setelah jurnal disetujui.
          </p>
        </div>
        <Link
          href="/admin/jurnal/baru"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Jurnal baru
        </Link>
      </header>

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
          <a
            href={`/api/export/journal?${new URLSearchParams(
              Object.entries(searchParams).filter(([, v]) => v) as [string, string][],
            ).toString()}`}
            className="inline-flex h-11 items-center rounded-md border px-3 text-sm hover:bg-accent"
          >
            Ekspor xlsx
          </a>
          {adaFilter ? (
            <Link
              href="/admin/jurnal"
              className="inline-flex h-11 items-center rounded-md px-3 text-sm hover:bg-accent"
            >
              Hapus filter
            </Link>
          ) : null}
        </div>
      </form>

      <section aria-labelledby="daftar-title" className="space-y-3">
        <h2 id="daftar-title" className="text-lg font-semibold">
          {`${rows.length} jurnal${adaFilter ? " sesuai filter" : ""}`}
        </h2>
        {rows.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            {adaFilter
              ? "Tidak ada jurnal yang cocok dengan filter ini."
              : "Belum ada jurnal. Buat jurnal pertama lewat tombol Jurnal baru."}
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
                    href={`/admin/jurnal/${j.id}`}
                    className="flex flex-col gap-1 p-4 hover:bg-accent sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{j.keterangan}</p>
                      <p className="text-xs text-muted-foreground">
                        {`${formatTanggal(j.tanggal)} · ${j.dibuatOleh.nama} · ${j.baris.length} baris`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums">{formatRupiah(total)}</span>
                      <Badge variant={j.status === "APPROVED" ? "default" : j.status === "REJECTED" ? "outline" : "secondary"}>
                        {statusJurnalLabel[j.status]}
                      </Badge>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Link href="/admin" className="text-sm underline underline-offset-4">
        Kembali ke beranda Admin
      </Link>
    </div>
  );
}
