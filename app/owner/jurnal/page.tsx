import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { JurnalDaftar } from "@/components/jurnal-daftar";
import { JurnalListFilter } from "@/components/jurnal-list-filter";
import { OwnerPeriodFilter } from "@/components/owner-period-filter";
import { Button } from "@/components/ui/button";
import {
  listJurnal,
  normalizeJurnalFilter,
  serializeJurnalListRow,
  type FilterJurnal,
} from "@/lib/jurnal";
import { defaultYearMonth, parsePeriodeMode } from "@/lib/period-nav";

export const dynamic = "force-dynamic";

const selectClass =
  "flex h-11 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground";

function periodeQueryString(filter: ReturnType<typeof normalizeJurnalFilter>) {
  const q = new URLSearchParams();
  if (filter.periode === "rentang") q.set("periode", "rentang");
  q.set("dari", filter.dari);
  q.set("sampai", filter.sampai);
  if (filter.status) q.set("status", filter.status);
  return q.toString();
}

export default async function OwnerJurnalPage({
  searchParams,
}: {
  searchParams: FilterJurnal;
}) {
  if (!searchParams.dari && !searchParams.sampai) {
    const m = defaultYearMonth();
    redirect(`/owner/jurnal?dari=${m}&sampai=${m}`);
  }

  const filter = normalizeJurnalFilter(searchParams);
  const rows = await listJurnal(filter);
  const adaFilterStatus = Boolean(filter.status);
  const periodeQ = periodeQueryString(filter);
  const serialized = rows.map(serializeJurnalListRow);

  return (
    <CrudPageLayout
      title="Jurnal umum"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <JurnalListFilter
            basePath="/owner/jurnal"
            status={filter.status}
            selectClass={selectClass}
            periodeQuery={periodeQ}
          />
          <Button asChild variant="outline" className="h-11">
            <Link href="/owner/jurnal/koreksi">Koreksi manual</Link>
          </Button>
        </div>
      }
      list={
        <div className="space-y-4">
          <Suspense fallback={null}>
            <OwnerPeriodFilter
              dari={filter.dari}
              sampai={filter.sampai}
              periode={parsePeriodeMode(filter.periode)}
              rentangField="date"
              rentangOptionLabel="Rentang tanggal"
            />
          </Suspense>
          <JurnalDaftar
            rows={serialized}
            detailPrefix="/owner/jurnal"
            emptyMessage={
              adaFilterStatus ? "Tidak ada jurnal untuk filter ini." : "Belum ada jurnal di periode ini."
            }
          />
        </div>
      }
      listTitle={`${rows.length} catatan${adaFilterStatus ? " sesuai filter" : ""}`}
    />
  );
}
