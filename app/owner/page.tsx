import { RoleHome } from "@/components/role-home";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerPage() {
  const petani = await prisma.user.findMany({
    where: { role: "PEKERJA" },
    orderBy: { nama: "asc" },
    select: { id: true, nama: true, email: true },
  });

  return (
    <RoleHome role="OWNER">
      <section aria-labelledby="petani-title" className="space-y-3">
        <h2 id="petani-title" className="text-lg font-semibold">
          Akun petani
        </h2>
        {petani.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Belum ada akun petani.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {petani.map((akun) => (
              <li key={akun.id} className="p-4 text-sm">
                <p className="font-medium">{akun.nama}</p>
                <p className="text-muted-foreground">{akun.email}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </RoleHome>
  );
}
