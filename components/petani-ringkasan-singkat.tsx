import Link from "next/link";
import { BentoSection } from "@/components/dashboard-bento";
import { MetricCards } from "@/components/metric-cards";
import {
  metricLubangTerisi,
  metricSiapJual,
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
    <BentoSection title="Ringkasan singkat" className="max-sm:p-3">
      <div className="flex flex-col gap-2 min-[480px]:flex-row min-[480px]:items-stretch">
        <MetricCards
          variant="compact"
          className="min-w-0 flex-1"
          items={[
            metricTugas,
            metricLubangTerisi(kap, "/petani"),
            metricSiapJual(siapJualLubang, kap, "/petani"),
          ]}
        />
        <aside
          className="flex w-full shrink-0 flex-col justify-center rounded-md border border-dashed border-border px-3 py-2.5 min-[480px]:w-[9.5rem] lg:w-40"
          aria-label="Stok di bawah minimum"
        >
          <p className="text-[11px] font-medium leading-tight text-muted-foreground">
            Stok di bawah minimum
          </p>
          {stokRendahCount > 0 ? (
            <>
              <p className="mt-0.5 text-xl font-semibold tabular-nums">{stokRendahCount}</p>
              <p className="text-[10px] text-muted-foreground">Perlu cek</p>
              <Link
                href="/petani/stok-rendah"
                scroll={false}
                className="mt-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Lihat stok rendah
              </Link>
            </>
          ) : (
            <>
              <p className="mt-0.5 text-sm font-semibold tabular-nums">0</p>
              <p className="text-[10px] leading-snug text-muted-foreground">
                Semua stok di atas minimum.
              </p>
              <Link
                href="/petani/inventaris"
                scroll={false}
                className="mt-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Cek stok barang
              </Link>
            </>
          )}
        </aside>
      </div>
    </BentoSection>
  );
}
