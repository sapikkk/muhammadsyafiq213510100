import Link from "next/link";
import { BentoSection } from "@/components/dashboard-bento";
import { MonochromeProgressBar } from "@/components/monochrome-progress-bar";
import { Button } from "@/components/ui/button";
import { PETANI_ALUR_LANGKAH } from "@/lib/petani-alur-langkah";
import type { ProduksiRingkasan } from "@/lib/produksi-kapasitas-types";
import type { TugasPetani } from "@/lib/tugas-petani-types";

/** Urutan kerja + mulai dari sini + ringkas tanam/kolam — satu baris di layar lebar. */
export function PetaniBerandaAlurTanam({
  tugasUtama,
  produksi,
}: {
  tugasUtama?: TugasPetani;
  produksi: ProduksiRingkasan;
}) {
  const k = produksi.kapasitas;

  return (
    <BentoSection title="Urutan kerja" className="max-sm:p-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-3">
        <div className="min-w-0 flex-1 lg:border-r lg:border-border lg:pr-3">
          <ol
            className={[
              "flex gap-1.5 overflow-x-auto pb-0.5 snap-x snap-mandatory lg:flex-wrap lg:overflow-visible",
              "[scrollbar-width:thin]",
            ].join(" ")}
          >
            {PETANI_ALUR_LANGKAH.map((step) => (
              <li
                key={step.no}
                className="flex min-w-[6.5rem] shrink-0 snap-start flex-col rounded-md border border-border px-2 py-1.5 sm:min-w-[7rem] sm:p-2"
              >
                <span className="text-[10px] font-medium text-muted-foreground">
                  {step.no}. {step.label}
                </span>
                <Link
                  href={step.href}
                  scroll={false}
                  className="mt-0.5 text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Buka
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex min-w-0 flex-col justify-center border-t border-border pt-3 lg:w-[min(100%,14rem)] lg:shrink-0 lg:border-t-0 lg:border-border lg:pt-0 lg:pl-0">
          <p className="text-xs font-medium text-muted-foreground">Mulai dari sini</p>
          {tugasUtama ? (
            <>
              <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">
                {tugasUtama.judul}
              </p>
              <Button type="button" className="mt-2 h-9 w-full text-sm" asChild>
                <Link href={tugasUtama.href} scroll={false}>
                  Buka tugas
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className="mt-0.5 text-xs text-muted-foreground">Belum ada tugas terbuka.</p>
              <Button type="button" className="mt-2 h-9 w-full text-sm" asChild>
                <Link href="/petani/siklus/baru" scroll={false}>
                  Mulai semai
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-center border-t border-border pt-3 lg:w-[min(100%,13rem)] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-4">
          <p className="text-xs font-medium text-muted-foreground">Tanam dan kolam</p>
          {k.totalLubang <= 0 ? (
            <Link
              href="/petani/siklus"
              scroll={false}
              className="mt-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Buka siklus tanam
            </Link>
          ) : (
            <div className="mt-1 space-y-1.5">
              <p className="text-sm font-semibold tabular-nums">
                {k.pctTerisi}% terisi
              </p>
              <p className="text-[11px] text-muted-foreground">
                {k.lubangTerisi.toLocaleString("id-ID")}/{k.totalLubang.toLocaleString("id-ID")}{" "}
                lubang · siap jual {produksi.siapJualLubang.toLocaleString("id-ID")}
              </p>
              <MonochromeProgressBar value={k.pctTerisi} />
            </div>
          )}
        </div>
      </div>
    </BentoSection>
  );
}
