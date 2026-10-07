import Link from "next/link";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";

export const dynamic = "force-dynamic";

export default async function OwnerInfrastrukturPage() {
  const data = serializeInfrastruktur(await listInfrastrukturPohon());

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Owner</p>
        <h1 className="text-3xl font-semibold tracking-tight">Infrastruktur</h1>
        <p className="text-muted-foreground">
          Hanya baca. Perubahan master lewat Admin.
        </p>
        <Link
          href="/owner"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Owner
        </Link>
      </header>

      <InfrastrukturPohon data={data} />
    </main>
  );
}
