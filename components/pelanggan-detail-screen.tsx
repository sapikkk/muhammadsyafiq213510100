import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { PelangganRiwayatPanel } from "@/components/pelanggan-riwayat-panel";
import { Badge } from "@/components/ui/badge";
import { getPelangganRingkas, listRiwayatBelanjaPelanggan } from "@/lib/pelanggan-riwayat";

export async function PelangganDetailScreen({
  id,
  listHref = "/admin/pelanggan",
  surface = "page",
}: {
  id: number;
  listHref?: string;
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id) || id <= 0) notFound();

  const pelanggan = await getPelangganRingkas(id);
  if (!pelanggan) notFound();

  const riwayat = await listRiwayatBelanjaPelanggan(id);

  return (
    <DetailLayout
      backHref={listHref}
      surface={surface}
      financeNavRole={surface === "page" ? "ADMIN" : undefined}
      title={pelanggan.nama}
      badge={pelanggan.aktif ? null : <Badge variant="outline">Nonaktif</Badge>}
      description={[pelanggan.no_telepon, pelanggan.email].filter(Boolean).join(" · ") || undefined}
    >
      <PageSection title="Riwayat belanja" badge="Read">
        <PelangganRiwayatPanel
          pelangganId={id}
          rows={riwayat.map((r) => ({
            ...r,
            nomor_invoice: r.nomor_invoice,
          }))}
        />
      </PageSection>
    </DetailLayout>
  );
}
