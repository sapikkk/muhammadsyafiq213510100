import { PelangganDaftar } from "@/components/pelanggan-daftar";
import { PelangganForm } from "@/components/pelanggan-form";
import { PageHeader } from "@/components/page-header";
import { listPelanggan, serializePelanggan } from "@/lib/pelanggan";

export const dynamic = "force-dynamic";

export default async function AdminPelangganPage() {
  const rows = await listPelanggan();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Pelanggan" description="Master pelanggan untuk sales order (US5.1)." />
      <PelangganDaftar rows={rows.map(serializePelanggan)} />
      <PelangganForm />
    </div>
  );
}
