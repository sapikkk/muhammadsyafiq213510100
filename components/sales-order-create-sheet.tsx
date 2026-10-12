import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { SalesOrderForm } from "@/components/sales-order-form";
import { loadSalesOrderCreateContext } from "@/lib/sales-order-create-context";

/** Buat pesanan jual dalam sheet (intercept dari daftar). */
export async function SalesOrderCreateSheet() {
  const { pelanggan, siklus, akunDp } = await loadSalesOrderCreateContext();

  return (
    <DetailSheetFrame>
      <DetailLayout
        backHref="/admin/penjualan"
        surface="sheet"
        title="Buat pesanan jual"
      >
        <PageSection title="Baris pesanan" badge="Create">
          <SalesOrderForm pelanggan={pelanggan} siklus={siklus} akunDp={akunDp} />
        </PageSection>
      </DetailLayout>
    </DetailSheetFrame>
  );
}
