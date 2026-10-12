import { AdminFlowDashboard } from "@/components/admin-flow-dashboard";
import { RegisterPetani } from "@/components/register-petani";
import { ResetRequests } from "@/components/reset-requests";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { PageSection } from "@/components/page-section";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminPage() {
  const [pending, stokRendah] = await Promise.all([
    prisma.passwordResetRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { requestedAt: "asc" },
      include: { user: { select: { nama: true, email: true } } },
    }),
    listAlertStokMinimum(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <InventarisAlertBanner items={stokRendah} detailHref="/admin/stok-rendah" />
      <AdminFlowDashboard />

      <PageSection
        title="Daftarkan petani"
        description="Buat akun login petani (email dan sandi awal)."
        badge="Create"
      >
        <RegisterPetani />
      </PageSection>

      {pending.length > 0 ? (
        <PageSection
          title="Permintaan reset sandi"
          description={`${pending.length} permintaan menunggu persetujuan Anda.`}
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
