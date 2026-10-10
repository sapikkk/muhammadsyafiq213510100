import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { JurnalDaftar } from "@/components/jurnal-daftar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listJurnal, serializeJurnalListRow, type FilterJurnal } from "@/lib/jurnal";
import { statusJurnalLabel, statusJurnalList } from "@/lib/jurnal-status";

export const dynamic = "force-dynamic";

const selectClass =
  "flex h-11 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground";

export default async function OwnerJurnalPage({
  searchParams,
}: {
  searchParams: FilterJurnal;
}) {
  const rows = await listJurnal(searchParams);
  const adaFilter = Boolean(searchParams.status || searchParams.dari || searchParams.sampai);
  const serialized = rows.map(serializeJurnalListRow);

  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Jurnal"
      description="US2.6 — lihat dan filter jurnal; tanpa buat/edit/approve."
      flowSteps={[
        { label: "Filter", detail: "Tanggal & status — lalu terapkan." },
        { label: "Detail", detail: "Klik baris untuk melihat baris debit/kredit." },
      ]}
      list={
        <div className="space-y-4">
          <form
            method="get"
            aria-label="Filter jurnal"
            className="grid gap-3 rounded-md border bg-muted/20 p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
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
                  className="inline-flex h-11 items-center px-3 text-sm hover:bg-accent"
                >
                  Hapus filter
                </Link>
              ) : null}
            </div>
          </form>
          <JurnalDaftar
            rows={serialized}
            detailPrefix="/owner/jurnal"
            emptyMessage={adaFilter ? "Tidak ada jurnal untuk filter ini." : "Belum ada jurnal."}
          />
        </div>
      }
      listTitle={`${rows.length} jurnal${adaFilter ? " sesuai filter" : ""}`}
    />
  );
}
