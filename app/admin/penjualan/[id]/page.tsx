import { notFound } from "next/navigation";
import { SalesOrderDetail, type SoRow } from "@/components/sales-order-detail";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import { getSalesOrder, serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function AdminPenjualanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const row = await getSalesOrder(id);
  if (!row) notFound();

  const so = serializeSalesOrder(row) as SoRow;

  return (
    <DetailLayout
      backHref="/admin/penjualan"
      eyebrow="Sales order"
      title={so.nomor_so}
      badge={<Badge variant="secondary">{so.status}</Badge>}
      description={`${so.pelanggan_nama} · Total ${formatRupiah(so.total)}`}
    >
      <PageSection title="Aksi & riwayat" badge="Update">
        <SalesOrderDetail row={so} mode="admin" />
      </PageSection>
    </DetailLayout>
  );
}
