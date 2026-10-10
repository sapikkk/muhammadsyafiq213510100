import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { SalesOrderForm } from "@/components/sales-order-form";
import { PageHeader } from "@/components/page-header";
import { listPelanggan } from "@/lib/pelanggan";
import {
  listSalesOrders,
  listSiklusSiapJual,
  serializeSalesOrder,
} from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function AdminPenjualanPage() {
  const [pelanggan, siklusRows, orders] = await Promise.all([
    listPelanggan(),
    listSiklusSiapJual(),
    listSalesOrders(),
  ]);

  const siklusOpts = siklusRows.map((s) => ({
    id: s.id,
    kode_batch: s.kode_batch,
    varietas_nama: s.varietas.nama,
    harga_curah: s.varietas.harga_jual_curah.toString(),
    harga_pack: s.varietas.harga_jual_pack.toString(),
    jumlah_layak: s.laporanPanen?.jumlah_layak ?? 0,
  }));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Sales order"
        description="EPIC-5 — SO, pengiriman, jurnal, invoice, batal, biaya packing."
      />
      <SalesOrderDaftar rows={orders.map(serializeSalesOrder)} />
      <SalesOrderForm
        pelanggan={pelanggan.map((p) => ({ id: p.id, nama: p.nama }))}
        siklus={siklusOpts}
      />
    </div>
  );
}
