import { notFound } from "next/navigation";
import { ActivePackDetailActions } from "@/components/active-pack-detail-actions";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatQty, formatRupiah, formatTanggal } from "@/lib/format";
import { getActivePack, serializeActivePack, type ActivePackListRow } from "@/lib/active-pack";
import { EntityChangeHistorySection } from "@/components/entity-change-history-section";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";

function toListRow(
  row: NonNullable<Awaited<ReturnType<typeof getActivePack>>>,
): ActivePackListRow {
  const base = serializeActivePack(row);
  return {
    ...base,
    item: row.item,
    dibuatOleh: row.dibuatOleh,
  };
}

export async function ActivePackDetail({
  id,
  listHref,
  writableMode,
  surface = "page",
}: {
  id: number;
  listHref: string;
  writableMode?: "admin" | "petani";
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const row = await getActivePack(id);
  if (!row) notFound();

  const serialized = toListRow(row);
  const satuan = satuanInventarisLabel[serialized.item.satuan];
  const habis = serialized.status === "HABIS";

  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      eyebrow="Active pack"
      title={serialized.kode}
      badge={
        habis ? (
          <Badge variant="outline">Habis</Badge>
        ) : (
          <Badge variant="secondary">Aktif</Badge>
        )
      }
      description={`${serialized.item.kode} · ${serialized.item.nama} · sisa ${formatQty(serialized.sisaUnit)} / ${formatQty(serialized.jumlahUnit)} ${satuan}`}
      actions={
        writableMode && !habis ? (
          <ActivePackDetailActions row={serialized} mode={writableMode} />
        ) : null
      }
    >
      <PageSection title="Ringkasan biaya" badge="Read">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Item label="Harga pack" value={formatRupiah(serialized.hargaPack)} />
          <Item label="Biaya per unit" value={formatRupiah(serialized.biayaPerUnit)} />
          <Item label="Dibuat oleh" value={serialized.dibuatOleh.nama} />
          <Item label="Dibuat pada" value={formatTanggal(serialized.dibuatPada)} />
          <Item label="Keterangan" value={serialized.keterangan ?? "—"} />
        </dl>
      </PageSection>
      <EntityChangeHistorySection entitas="ActivePack" entitasId={id} />
    </DetailLayout>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
