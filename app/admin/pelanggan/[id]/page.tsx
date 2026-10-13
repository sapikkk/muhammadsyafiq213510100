import Link from "next/link";
import { notFound } from "next/navigation";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { Button } from "@/components/ui/button";
import { PelangganRiwayatPanel } from "@/components/pelanggan-riwayat-panel";
import { getPelangganRingkas, listRiwayatBelanjaPelanggan } from "@/lib/pelanggan-riwayat";

export const dynamic = "force-dynamic";

export default async function AdminPelangganDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const pelanggan = await getPelangganRingkas(id);
  if (!pelanggan) notFound();

  const riwayat = await listRiwayatBelanjaPelanggan(id);

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      title={pelanggan.nama}
      actions={
        <Button type="button" variant="outline" className="h-11" asChild>
          <Link href="/admin/pelanggan">Kembali ke daftar</Link>
        </Button>
      }
      list={
        <PelangganRiwayatPanel
          pelangganId={id}
          rows={riwayat.map((r) => ({
            ...r,
            nomor_invoice: r.nomor_invoice,
          }))}
        />
      }
      listTitle="Riwayat belanja"
    />
  );
}
