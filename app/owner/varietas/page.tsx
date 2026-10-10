import Link from "next/link";
import { VarietasDaftar } from "@/components/varietas-daftar";
import { VarietasForm } from "@/components/varietas-form";
import { listVarietas, serializeVarietas } from "@/lib/varietas";
import { mapRataHppPerLubangSemuaVarietas } from "@/lib/varietas-hpp-rata";

export const dynamic = "force-dynamic";

export default async function OwnerVarietasPage() {
  const [rows, rataHppMap] = await Promise.all([listVarietas(false), mapRataHppPerLubangSemuaVarietas()]);
  const serialized = rows.map((r) => {
    const base = serializeVarietas(r);
    const rata = rataHppMap.get(r.id);
    return { ...base, rataHppPerLubang: rata ?? null };
  });
  const options = serialized.map((r) => ({ id: r.id, label: `${r.nama} (${r.status})` }));

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Owner</p>
        <h1 className="text-3xl font-semibold tracking-tight">Varietas & asumsi</h1>
        <p className="text-muted-foreground">
          Parameter varietas sesuai PRD modul 1.0 — Owner dan Admin boleh mengubah.
        </p>
        <Link
          href="/owner"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Owner
        </Link>
      </header>

      <VarietasDaftar rows={serialized} />
      <VarietasForm varietasOptions={options} />
    </div>
  );
}
