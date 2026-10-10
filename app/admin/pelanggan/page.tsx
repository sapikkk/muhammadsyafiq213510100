import { CrudPageLayout } from "@/components/crud-page-layout";
import { PelangganDaftar } from "@/components/pelanggan-daftar";
import { PelangganForm } from "@/components/pelanggan-form";
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
        { label: "Tambah pelanggan", detail: "Isi form di bawah — simpan sekali per pelanggan." },
        { label: "Pakai di SO", detail: "Buka Sales order → pilih pelanggan dari dropdown." },
      ]}
      list={<PelangganDaftar rows={rows.map(serializePelanggan)} />}
      listDescription="Read — semua pelanggan aktif. Klik baris untuk ubah (jika form mendukung)."
      create={<PelangganForm />}
      createTitle="Form pelanggan baru"
      createDescription="Create — nama, alamat, telepon, email wajib valid."
    />
  );
}
