import Link from "next/link";
import { InfrastrukturForm } from "@/components/infrastruktur-form";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";

export const dynamic = "force-dynamic";

export default async function AdminInfrastrukturPage() {
  const pohon = await listInfrastrukturPohon();
  const data = serializeInfrastruktur(pohon);

  const lahanOptions = data.lahan.map((l) => ({
    id: l.id,
    label: `Lahan #${l.id} (sewa ${l.nilaiSewa})`,
  }));

  const greenhouseOptions = data.lahan.flatMap((l) =>
    l.greenhouse.map((gh) => ({
      id: gh.id,
      label: `${gh.nama} (Lahan #${l.id})`,
    })),
  );

  const kolamOptions = data.lahan.flatMap((l) =>
    l.greenhouse.flatMap((gh) =>
      gh.kolam.map((k) => ({
        id: k.id,
        label: `${k.nama} · ${gh.nama}`,
      })),
    ),
  );

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Infrastruktur</h1>
        <p className="text-muted-foreground">
          Master lahan, greenhouse, dan kolam untuk alokasi kapasitas produksi.
        </p>
        <Link
          href="/admin"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Admin
        </Link>
      </header>

      <InfrastrukturPohon data={data} />
      <InfrastrukturForm
        lahanOptions={lahanOptions}
        greenhouseOptions={greenhouseOptions}
        kolamOptions={kolamOptions}
      />
    </div>
  );
}
