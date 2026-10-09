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

export default async function OwnerPage() {
  const [petani, stokRendah] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PEKERJA" },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true, email: true },
    }),
    listAlertStokMinimum(),
  ]);

  return (
    <>
      <InventarisAlertBanner items={stokRendah} detailHref="/owner/stok-rendah" />

      <Card>
        <CardHeader>
          <CardTitle>Akun petani</CardTitle>
          <CardDescription>
            Daftar petani yang terdaftar di sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {petani.length === 0 ? (
            <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              Belum ada akun petani.
            </p>
          ) : (
            <ul className="divide-y rounded-md border">
              {petani.map((akun) => (
                <li key={akun.id} className="px-4 py-3">
                  <p className="text-sm font-medium">{akun.nama}</p>
                  <p className="text-xs text-muted-foreground">{akun.email}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
