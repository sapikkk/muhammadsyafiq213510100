import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { JurnalDaftar } from "@/components/jurnal-daftar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listJurnal, serializeJurnalListRow, type FilterJurnal } from "@/lib/jurnal";
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
  const serialized = rows.map(serializeJurnalListRow);

  const filterDesc = adaFilter
    ? [
        searchParams.dari ? `Dari ${searchParams.dari}` : "",
        searchParams.sampai ? `Sampai ${searchParams.sampai}` : "",
        searchParams.status
          ? `Status ${statusJurnalLabel[searchParams.status as keyof typeof statusJurnalLabel] ?? searchParams.status}`
          : "",
      ]
        .filter(Boolean)
        .join(" · ")
    : "Klik baris untuk detail, edit draft, atau ajukan approve.";

  return (
    <CrudPageLayout
      eyebrow="Akuntansi"
      title="Jurnal"
      description="Buat entri di Jurnal baru; setujui atau tolak dari detail (Owner atau Admin)."
      flowSteps={[
        { label: "Buat", detail: "Smart Jurnal atau manual; status draft atau menunggu." },
        { label: "Seimbang", detail: "Total debit sama dengan kredit sebelum diajukan." },
        { label: "Setujui", detail: "Owner atau Admin; saldo akun berubah setelah disetujui." },
      ]}
      actions={
        <>
          <Button asChild className="h-11">
            <Link href="/admin/jurnal/baru">Jurnal baru</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link href="/admin/akuntansi">Period lock</Link>
          </Button>
        </>
      }
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
              <Button type="button" variant="outline" className="h-11" asChild>
                <a
                  href={`/api/export/journal?${new URLSearchParams(
                    Object.entries(searchParams).filter(([, v]) => v) as [string, string][],
                  ).toString()}`}
                >
                  Ekspor xlsx
                </a>
              </Button>
              {adaFilter ? (
                <Button type="button" variant="ghost" className="h-11" asChild>
                  <Link href="/admin/jurnal">Hapus filter</Link>
                </Button>
              ) : null}
            </div>
          </form>
          <JurnalDaftar
            rows={serialized}
            detailPrefix="/admin/jurnal"
            emptyMessage={
              adaFilter
                ? "Tidak ada jurnal yang cocok dengan filter ini."
                : "Belum ada jurnal. Buat jurnal pertama lewat tombol Jurnal baru."
            }
          />
        </div>
      }
      listTitle={`${rows.length} jurnal${adaFilter ? " sesuai filter" : ""}`}
      listDescription={filterDesc}
    />
  );
}
