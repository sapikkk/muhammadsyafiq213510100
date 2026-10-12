import { CrudPageLayout } from "@/components/crud-page-layout";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function OwnerPenjualanPage() {
  const orders = await listSalesOrders();

  return (
    <CrudPageLayout
      eyebrow="5.0 Penjualan & Pemasaran"
      title="Pesanan jual"
      description="Pantau pesanan, packing, distribusi, dan jurnal pendapatan — aksi operasional oleh Admin."
      flowSteps={[
        { label: "Pesanan", detail: "Klik baris untuk lihat detail (hanya baca)." },
        { label: "Distribusi", detail: "Status kirim & terkirim — Petani/Admin." },
        { label: "Pendapatan", detail: "Epik 5.3 — jurnal di /owner/jurnal." },
      ]}
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="owner" />}
      listTitle="Semua sales order"
      listDescription="Owner hanya melihat."
    />
  );
}
