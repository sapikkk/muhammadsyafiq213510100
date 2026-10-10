import { CrudPageLayout } from "@/components/crud-page-layout";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { SalesOrderForm } from "@/components/sales-order-form";
import { listPelanggan } from "@/lib/pelanggan";
import { prisma } from "@/lib/prisma";
import {
  listSalesOrders,
  listSiklusSiapJual,
  serializeSalesOrder,
} from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function AdminPenjualanPage() {
  const [pelanggan, siklusRows, orders, akunDpRows] = await Promise.all([
    listPelanggan(),
    listSiklusSiapJual(),
    listSalesOrders(),
    prisma.akun.findMany({
      where: { tipe: "KEWAJIBAN", aktif: true, anak: { none: {} } },
      orderBy: { kode: "asc" },
      select: { id: true, kode: true, nama: true },
    }),
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
    <CrudPageLayout
      eyebrow="Penjualan"
      title="Sales order"
      description="Dari draft SO sampai kirim, jurnal pendapatan/HPP, dan pelunasan piutang."
      flowSteps={[
        { label: "Buat draft", detail: "Pilih pelanggan + batch panen + lubang/pack." },
        { label: "Konfirmasi", detail: "Status CONFIRMED — stok lubang ter-reserve." },
        { label: "DP (opsional)", detail: "Catat uang muka → jurnal Dr kas Cr uang muka." },
        { label: "Kirim / deliver", detail: "Jurnal pendapatan + HPP; status DELIVERED." },
        { label: "Pelunasan", detail: "Jika piutang: catat bayar di baris SO." },
      ]}
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} />}
      listTitle="Semua sales order"
      listDescription="Read & Update — aksi per baris (konfirmasi, kirim, pelunasan, batal)."
      create={
        <SalesOrderForm
          pelanggan={pelanggan.map((p) => ({ id: p.id, nama: p.nama }))}
          siklus={siklusOpts}
          akunDp={akunDpRows}
        />
      }
      createTitle="Buat SO baru"
      createDescription="Create — isi baris batch; total & HPP dihitung otomatis."
    />
  );
}
