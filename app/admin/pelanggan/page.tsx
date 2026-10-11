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
      description="Master data pelanggan dipakai saat membuat sales order."
      flowSteps={[
        { label: "Lihat daftar", detail: "Cari nama atau email di tabel." },
        { label: "Tambah atau ubah", detail: "Panel samping kanan — data kontak saja." },
        { label: "Pakai di SO", detail: "Sales order → pilih pelanggan dari dropdown." },
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
