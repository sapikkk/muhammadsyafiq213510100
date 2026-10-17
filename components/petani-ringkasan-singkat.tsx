import Link from "next/link";
import { Warehouse } from "lucide-react";
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
    <BentoSection title="Ringkasan singkat">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        <MetricCards
          variant="compact"
          className="min-w-0 flex-1 max-sm:gap-1.5 max-sm:[grid-template-columns:repeat(3,minmax(0,1fr))] md:[grid-template-columns:repeat(3,minmax(0,1fr))]"
          items={[
            metricTugas,
            metricLubangTerisi(kap, "/petani"),
            metricSiapJual(siapJualLubang, kap, "/petani"),
          ]}
        />
        <aside
          className="flex w-full shrink-0 items-center justify-between gap-2 rounded-md border border-dashed border-border px-2.5 py-2 max-sm:text-left lg:w-40 lg:flex-col lg:items-stretch lg:justify-center lg:px-3 lg:py-2.5"
          aria-label="Stok di bawah minimum"
        >
          <div className="min-w-0 flex-1 lg:flex-none">
            <div className="flex items-start gap-1.5">
              <Warehouse className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <p className="text-[11px] font-medium leading-tight text-muted-foreground">
                Stok di bawah minimum
              </p>
            </div>
            {stokRendahCount > 0 ? (
              <>
                <p className="mt-0.5 text-lg font-semibold tabular-nums sm:text-xl">{stokRendahCount}</p>
                <p className="hidden text-[10px] text-muted-foreground lg:block">Perlu cek</p>
              </>
            ) : (
              <>
                <p className="mt-0.5 text-sm font-semibold tabular-nums">0</p>
                <p className="hidden text-[10px] leading-snug text-muted-foreground lg:block">
                  Semua stok di atas minimum.
                </p>
              </>
            )}
          </div>
          {stokRendahCount > 0 ? (
            <Link
              href="/petani/stok-rendah"
              scroll={false}
              className="shrink-0 text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Lihat stok rendah
            </Link>
          ) : (
            <Link
              href="/petani/inventaris"
              scroll={false}
              className="shrink-0 text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Cek stok barang
            </Link>
          )}
        </aside>
      </div>
    </BentoSection>
  );
}
