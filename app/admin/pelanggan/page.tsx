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
      financeNavRole="ADMIN"
      title="Pelanggan"
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
    />
  );
}
