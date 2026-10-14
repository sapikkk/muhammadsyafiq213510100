import Link from "next/link";
import { notFound } from "next/navigation";
import { SalesOrderDetail } from "@/components/sales-order-detail";
import { SalesOrderDetailActions } from "@/components/sales-order-detail-actions";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";
import { getSalesOrder, serializeSalesOrder } from "@/lib/sales-order";
import type { SoRow } from "@/lib/sales-order-detail-types";
import { ensureRekeningKasDefaults, listRekeningKasAktif } from "@/lib/rekening-kas";

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

  const [row, rekeningOptions] = await Promise.all([
    getSalesOrder(id),
    (async () => {
      await ensureRekeningKasDefaults();
      return listRekeningKasAktif();
    })(),
  ]);
  if (!row) notFound();

  const so = serializeSalesOrder(row) as SoRow;
  const showFaktur =
    mode === "admin" && so.status !== "DRAFT" && so.status !== "CANCELLED";

  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      title={so.nomor_so}
      badge={<Badge variant="secondary">{labelSalesOrderStatus(so.status)}</Badge>}
      description={`${so.pelanggan_nama} · ${formatRupiah(so.total)}`}
      actions={
        showFaktur ? (
          <Button variant="outline" className="h-11" asChild>
            <Link href={`/admin/penjualan/${so.id}/invoice`} scroll={false}>
              Faktur{so.nomor_invoice ? ` · ${so.nomor_invoice}` : ""}
            </Link>
          </Button>
        ) : null
      }
      primaryActions={
        <SalesOrderDetailActions row={so} mode={mode} rekeningOptions={rekeningOptions} />
      }
    >
      <PageSection title="Barang" badge="Read" hidePermissionBadge={mode === "pengiriman"}>
        <SalesOrderDetail row={so} mode={mode} />
      </PageSection>
    </DetailLayout>
  );
}
