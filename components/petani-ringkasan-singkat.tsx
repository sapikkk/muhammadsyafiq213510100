import { BentoSection } from "@/components/dashboard-bento";
import { MetricCards } from "@/components/metric-cards";
import {
  metricLubangTerisi,
  metricSiapJual,
  metricStokRendah,
  metricTugasPetani,
} from "@/lib/dashboard-metric-items";
import type { KapasitasKolamRingkas } from "@/lib/produksi-kapasitas-types";

export function PetaniRingkasanSingkat({
  tugasCount,
  stokRendahCount,
  kap,
  siapJualLubang,
}: {
  tugasCount: number;
  stokRendahCount: number;
  kap: KapasitasKolamRingkas;
  siapJualLubang: number;
}) {
  const metricTugas = {
    ...metricTugasPetani(tugasCount),
    ...(tugasCount > 0
      ? {
          followUp: {
            actionLabel: "Lihat daftar tugas",
            href: "/petani#tugas-hari-ini",
          },
        }
      : {}),
  };

  return (
    <BentoSection title="Ringkasan singkat">
      <MetricCards
        variant="compact"
        className="w-full grid-cols-2 lg:grid-cols-4"
        items={[
          metricTugas,
          metricLubangTerisi(kap, "/petani"),
          metricSiapJual(siapJualLubang, kap, "/petani"),
          metricStokRendah(stokRendahCount, "/petani"),
        ]}
      />
    </BentoSection>
  );
}
