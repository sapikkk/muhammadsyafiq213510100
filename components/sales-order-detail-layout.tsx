import { notFound } from "next/navigation";
import { SalesOrderDetail, type SoRow } from "@/components/sales-order-detail";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";
import { getSalesOrder, serializeSalesOrder } from "@/lib/sales-order";

export async function SalesOrderDetailLayout({
  id,
  listHref,
  mode,
  surface = "page",
}: {
  id: number;
  listHref: string;
  mode: "admin" | "pengiriman" | "owner";
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const row = await getSalesOrder(id);
  if (!row) notFound();

  const so = serializeSalesOrder(row) as SoRow;
  const sectionTitle =
    mode === "admin" ? "Aksi dan riwayat" : mode === "owner" ? "Ringkasan pesanan" : "Kirim dan terima";
  const eyebrow = mode === "pengiriman" ? "Pengiriman" : "Pesanan jual";

  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      eyebrow={eyebrow}
      title={so.nomor_so}
      badge={<Badge variant="secondary">{labelSalesOrderStatus(so.status)}</Badge>}
      description={`${so.pelanggan_nama} · Total ${formatRupiah(so.total)}`}
    >
      <PageSection title={sectionTitle} badge={mode === "owner" ? "Read" : "Update"}>
        <SalesOrderDetail row={so} mode={mode} />
      </PageSection>
    </DetailLayout>
  );
}
