import { RegisterPetani } from "@/components/register-petani";
import { ResetRequests } from "@/components/reset-requests";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <>
      <InventarisAlertBanner items={stokRendah} detailHref="/admin/stok-rendah" />

      <Card>
        <CardHeader>
          <CardTitle>Daftarkan petani</CardTitle>
          <CardDescription>
            Buat akun baru untuk petani yang akan menggunakan sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterPetani />
        </CardContent>
      </Card>

      {pending.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Permintaan reset sandi</CardTitle>
            <CardDescription>
              {pending.length} permintaan menunggu persetujuan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetRequests
              requests={pending.map((request) => ({
                id: request.id,
                nama: request.user.nama,
                email: request.user.email,
                requestedAt: formatter.format(request.requestedAt),
              }))}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
