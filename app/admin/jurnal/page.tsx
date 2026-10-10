import Link from "next/link";
import { FlowSteps } from "@/components/flow-steps";
import { JurnalDaftar } from "@/components/jurnal-daftar";
import { PageHeader } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listJurnal, serializeJurnalListRow, type FilterJurnal } from "@/lib/jurnal";
import { statusJurnalLabel, statusJurnalList } from "@/lib/jurnal-status";

export const dynamic = "force-dynamic";

const selectClass =
  "flex h-11 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground";

export default async function JurnalPage({
  searchParams,
}: {
  searchParams: FilterJurnal;
}) {
  const rows = await listJurnal(searchParams);
  const adaFilter = Boolean(searchParams.status || searchParams.dari || searchParams.sampai);
  const serialized = rows.map(serializeJurnalListRow);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          eyebrow="Akuntansi"
          title="Jurnal"
          description="Create di Jurnal baru · Read di tabel · Update lewat approve/tolak (Owner/Admin)."
        />
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/jurnal/baru"
            className="inline-flex h-11 items-center justify-center border border-foreground bg-foreground px-4 text-sm font-medium text-background"
          >
            Jurnal baru
          </Link>
          <Link
            href="/admin/akuntansi"
            className="inline-flex h-11 items-center justify-center border px-4 text-sm font-medium hover:bg-accent"
          >
            Period lock
          </Link>
        </div>
      </div>

      <FlowSteps
        steps={[
          { label: "Buat", detail: "Smart Jurnal atau manual — status DRAFT/PENDING." },
          { label: "Seimbang", detail: "Total debit = kredit sebelum ajukan." },
          { label: "Approve", detail: "Owner/Admin — saldo akun baru berubah." },
        ]}
      />

      <form
        method="get"
        aria-label="Filter jurnal"
        className="grid gap-3 border p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
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
            className="inline-flex h-11 items-center border px-3 text-sm hover:bg-accent"
          >
            Ekspor xlsx
          </a>
          {adaFilter ? (
            <Link
              href="/admin/jurnal"
              className="inline-flex h-11 items-center px-3 text-sm hover:bg-accent"
            >
              Hapus filter
            </Link>
          ) : null}
        </div>
      </form>

      <PageSection
        title={`${rows.length} jurnal${adaFilter ? " sesuai filter" : ""}`}
        description={
          adaFilter
            ? [
                searchParams.dari ? `Dari ${searchParams.dari}` : "",
                searchParams.sampai ? `Sampai ${searchParams.sampai}` : "",
                searchParams.status
                  ? `Status ${statusJurnalLabel[searchParams.status as keyof typeof statusJurnalLabel] ?? searchParams.status}`
                  : "",
              ]
                .filter(Boolean)
                .join(" · ")
            : "Read — klik baris untuk detail, edit draft, atau ajukan approve."
        }
        badge="Read"
      >
        <JurnalDaftar
          rows={serialized}
          detailPrefix="/admin/jurnal"
          emptyMessage={
            adaFilter
              ? "Tidak ada jurnal yang cocok dengan filter ini."
              : "Belum ada jurnal. Buat jurnal pertama lewat tombol Jurnal baru."
          }
        />
      </PageSection>
    </div>
  );
}
