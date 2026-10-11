import { notFound } from "next/navigation";
import { SalesOrderDetail, type SoRow } from "@/components/sales-order-detail";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import { getSalesOrder, serializeSalesOrder } from "@/lib/sales-order";

export async function SalesOrderDetailLayout({
  id,
  listHref,
  mode,
  surface = "page",
}: {
  id: number;
  listHref: string;
  mode: "admin" | "pengiriman";
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const row = await getSalesOrder(id);
  if (!row) notFound();

  const so = serializeSalesOrder(row) as SoRow;
  const isAdmin = mode === "admin";

  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      eyebrow={isAdmin ? "Sales order" : "Pengiriman"}
      title={so.nomor_so}
      badge={<Badge variant="secondary">{so.status}</Badge>}
      description={`${so.pelanggan_nama} · Total ${formatRupiah(so.total)}`}
    >
      <PageSection
        title={isAdmin ? "Aksi & riwayat" : "Kirim / terima"}
        badge="Update"
      >
        <SalesOrderDetail row={so} mode={isAdmin ? "admin" : "pengiriman"} />
      </PageSection>
    </DetailLayout>
  );
}
