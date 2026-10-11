import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { SalesOrderForm } from "@/components/sales-order-form";
import { loadSalesOrderCreateContext } from "@/lib/sales-order-create-context";

export const dynamic = "force-dynamic";

export default async function AdminPenjualanBaruPage() {
  const { pelanggan, siklus, akunDp } = await loadSalesOrderCreateContext();

  return (
    <DetailLayout
      backHref="/admin/penjualan"
      eyebrow="Penjualan"
      title="Buat sales order"
      description="Draft — konfirmasi stok setelah baris pesan valid."
    >
      <PageSection title="Baris pesanan" badge="Create">
        <SalesOrderForm pelanggan={pelanggan} siklus={siklus} akunDp={akunDp} />
      </PageSection>
    </DetailLayout>
  );
}
