import { AdminFlowDashboard } from "@/components/admin-flow-dashboard";
import { ResetRequests } from "@/components/reset-requests";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { PageSection } from "@/components/page-section";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import { alertBannerItems } from "@/lib/inventaris";
import { listAlertStokMinimumCached } from "@/lib/cached-queries";
import { CuacaWidget } from "@/components/cuaca-widget";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminPage() {
  const [pending, stokRendah, produksi] = await Promise.all([
    prisma.passwordResetRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { requestedAt: "asc" },
      include: { user: { select: { nama: true, email: true } } },
    }),
    listAlertStokMinimumCached(),
    loadProduksiRingkasan(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <CuacaWidget />
      <InventarisAlertBanner
        items={alertBannerItems(stokRendah)}
        detailHref="/admin/stok-rendah"
      />
      <AdminFlowDashboard />
      <PageSection title="Tanam dan kolam">
        <ProduksiRingkasanPanel data={produksi} />
      </PageSection>

      {pending.length > 0 ? (
        <PageSection
          id="reset-sandi"
          title={`Permintaan reset sandi (${pending.length})`}
          badge="Update"
        >
          <ResetRequests
            requests={pending.map((request) => ({
              id: request.id,
              nama: request.user.nama,
              email: request.user.email,
              requestedAt: formatter.format(request.requestedAt),
            }))}
          />
        </PageSection>
      ) : null}
    </div>
  );
}
