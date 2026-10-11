import { notFound } from "next/navigation";
import { InventarisDetailActions } from "@/components/inventaris-detail-actions";
import { InventarisRiwayat } from "@/components/inventaris-riwayat";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatQty } from "@/lib/format";
import { getItemInventaris, listPergerakan, serializeItem, serializePergerakan } from "@/lib/inventaris";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";

export async function InventarisDetail({
  id,
  listHref,
  writableMode,
  requireAktif = false,
}: {
  id: number;
  listHref: string;
  writableMode?: "admin" | "petani";
  requireAktif?: boolean;
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const item = await getItemInventaris(id);
  if (!item || (requireAktif && !item.aktif)) notFound();

  const serialized = serializeItem(item);
  const riwayat = await listPergerakan(id, 50);
  const satuan = satuanInventarisLabel[serialized.satuan];

  return (
    <DetailLayout
      backHref={listHref}
      eyebrow="Inventaris"
      title={`${serialized.kode} · ${serialized.nama}`}
      badge={
        serialized.diBawahMinimum ? (
          <Badge variant="outline">Di bawah minimum</Badge>
        ) : (
          <Badge variant="outline">OK</Badge>
        )
      }
      description={`Stok ${formatQty(serialized.stokSaatIni)} ${satuan} · minimum ${formatQty(serialized.stokMinimum)} ${satuan}`}
      actions={
        writableMode ? <InventarisDetailActions item={serialized} mode={writableMode} /> : null
      }
    >
      <PageSection title="Riwayat pergerakan" description="Read — 50 entri terakhir item ini." badge="Read">
        <InventarisRiwayat rows={riwayat.map(serializePergerakan)} hideItemColumn />
      </PageSection>
    </DetailLayout>
  );
}
