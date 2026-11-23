import { PetaniKolamSektor } from "@/components/petani-kolam-sektor";
import { PageHeaderRow } from "@/components/page-header-row";
import { loadPapanKolamPetani } from "@/lib/petani-kolam-papan";

export const dynamic = "force-dynamic";

export default async function PetaniKolamPage() {
  const sektor = await loadPapanKolamPetani();

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderRow title="Enam kolam rakit" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sektor.map((s) => (
          <PetaniKolamSektor key={s.slot} sektor={s} />
        ))}
      </div>
    </div>
  );
}
