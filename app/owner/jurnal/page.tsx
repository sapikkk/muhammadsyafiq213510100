import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { JurnalDaftar } from "@/components/jurnal-daftar";
import { JurnalListFilter } from "@/components/jurnal-list-filter";
import { Button } from "@/components/ui/button";
import { listJurnal, serializeJurnalListRow, type FilterJurnal } from "@/lib/jurnal";

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
      title="Jurnal umum"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <JurnalListFilter
            basePath="/owner/jurnal"
            dari={searchParams.dari}
            sampai={searchParams.sampai}
            status={searchParams.status}
            selectClass={selectClass}
          />
          <Button asChild variant="outline" className="h-11">
            <Link href="/owner/jurnal/koreksi">Koreksi manual</Link>
          </Button>
        </div>
      }
      list={
        <div className="space-y-4">
          <JurnalDaftar
            rows={serialized}
            detailPrefix="/owner/jurnal"
            emptyMessage={adaFilter ? "Tidak ada jurnal untuk filter ini." : "Belum ada jurnal."}
          />
        </div>
      }
      listTitle={`${rows.length} catatan${adaFilter ? " sesuai filter" : ""}`}
    />
  );
}
