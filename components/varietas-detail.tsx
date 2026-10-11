import { notFound } from "next/navigation";
import { VarietasDetailActions } from "@/components/varietas-detail-actions";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import { getVarietas, serializeVarietas } from "@/lib/varietas";
import { rataHppPerLubangVarietas } from "@/lib/varietas-hpp-rata";
import { EntityChangeHistorySection } from "@/components/entity-change-history-section";
import { varietasStatusLabel } from "@/lib/varietas-status";

export async function VarietasDetail({
  id,
  listHref,
  writable = false,
  requireAktif = false,
  surface = "page",
}: {
  id: number;
  listHref: string;
  writable?: boolean;
  requireAktif?: boolean;
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const row = await getVarietas(id);
  if (!row || (requireAktif && row.status !== "AKTIF")) notFound();

  const serialized = serializeVarietas(row);
  const rata = await rataHppPerLubangVarietas(id);
  const rataStr = rata ? formatRupiah(rata.toFixed(2)) : "—";
  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      eyebrow="Varietas"
      title={serialized.nama}
      badge={
        <Badge variant="outline">{varietasStatusLabel[serialized.status]}</Badge>
      }
      description={`${serialized.jumlahSiklus} siklus tercatat · HPP rata/lubang ${rataStr}`}
      actions={writable ? <VarietasDetailActions row={serialized} /> : null}
    >
      <PageSection title="Parameter" badge="Read">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Item label="Harga benih/gram" value={formatRupiah(serialized.hargaBenihPerGram)} />
          <Item label="Biji per gram" value={serialized.bijiPerGram} />
          <Item label="Daya kecambah" value={`${serialized.dayaKecambah}%`} />
          <Item label="Lama semai" value={`${serialized.lamaSemai} hari`} />
          <Item label="Lama di kolam" value={`${serialized.lamaDiKolam} hari`} />
          <Item label="Berat rata panen" value={`${serialized.beratRataRataPanen} g`} />
          <Item label="Berat per pack" value={`${serialized.beratPerPack} g`} />
          <Item label="Harga jual curah" value={formatRupiah(serialized.hargaJualCurah)} />
          <Item label="Harga jual pack" value={formatRupiah(serialized.hargaJualPack)} />
        </dl>
      </PageSection>
      <EntityChangeHistorySection entitas="Varietas" entitasId={id} />
    </DetailLayout>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}
