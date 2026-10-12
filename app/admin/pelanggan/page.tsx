import { CrudPageLayout } from "@/components/crud-page-layout";
import { PelangganDaftar } from "@/components/pelanggan-daftar";
import { PelangganFormSheet } from "@/components/pelanggan-form";
import { Button } from "@/components/ui/button";
import { listPelanggan, serializePelanggan } from "@/lib/pelanggan";

export const dynamic = "force-dynamic";

export default async function AdminPelangganPage() {
  const rows = await listPelanggan();

  return (
    <CrudPageLayout
      eyebrow="Penjualan"
      title="Pelanggan"
      description="Data pelanggan dipakai saat membuat sales order."
      flowSteps={[
        { label: "Daftar", detail: "Cari nama atau email di tabel." },
        { label: "Tambah atau ubah", detail: "Panel samping kanan, data kontak saja." },
        { label: "Pesanan jual", detail: "Pilih pelanggan saat membuat pesanan baru." },
      ]}
      actions={
        <PelangganFormSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah
            </Button>
          }
        />
      }
      list={<PelangganDaftar rows={rows.map(serializePelanggan)} />}
      listDescription="Cari, lalu Ubah data kontak. Pelanggan yang sudah dipakai sales order tetap bisa diubah namanya."
    />
  );
}
