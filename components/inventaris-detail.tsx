import { notFound } from "next/navigation";
import { InventarisDetailActions } from "@/components/inventaris-detail-actions";
import { InventarisRiwayat } from "@/components/inventaris-riwayat";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatQty } from "@/lib/format";
import { getItemInventaris, listPergerakan, serializeItem, serializePergerakan } from "@/lib/inventaris";
import { EntityChangeHistorySection } from "@/components/entity-change-history-section";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { DetailKodeStrip } from "@/components/detail-kode-strip";

export async function InventarisDetail({
  id,
  listHref,
  writableMode,
  requireAktif = false,
  surface = "page",
}: {
  id: number;
  listHref: string;
  writableMode?: "admin" | "petani";
  requireAktif?: boolean;
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const item = await getItemInventaris(id);
  if (!item || (requireAktif && !item.aktif)) notFound();

  const serialized = serializeItem(item);
  const riwayat = await listPergerakan(id, 50);
  const satuan = satuanInventarisLabel[serialized.satuan];
  const inSheet = surface === "sheet";

  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      title={serialized.nama}
      badge={
        <>
          {!serialized.aktif ? <Badge variant="outline">Nonaktif</Badge> : null}
          {serialized.diBawahMinimum ? (
            <Badge variant="outline">Di bawah minimum</Badge>
          ) : serialized.aktif ? (
            <Badge variant="outline">Stok cukup</Badge>
          ) : null}
        </>
      }
      description={`Stok ${formatQty(serialized.stokSaatIni)} ${satuan} · minimum ${formatQty(serialized.stokMinimum)} ${satuan}`}
      actions={
        writableMode ? <InventarisDetailActions item={serialized} mode={writableMode} /> : null
      }
    >
      <DetailKodeStrip label="Kode barang" kode={serialized.kode} />
      <PageSection
        title="Riwayat pergerakan"
        badge="Read"
        hidePermissionBadge={writableMode === "petani"}
      >
        <InventarisRiwayat
          rows={riwayat.map(serializePergerakan)}
          hideItemColumn
          collapsedInSheet={inSheet}
        />
      </PageSection>
      {writableMode === "petani" ? null : (
        <EntityChangeHistorySection entitas="ItemInventaris" entitasId={id} />
      )}
    </DetailLayout>
  );
}
