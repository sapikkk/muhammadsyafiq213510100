import Link from "next/link";
import { BentoSection } from "@/components/dashboard-bento";
import { Button } from "@/components/ui/button";
import { PETANI_ALUR_LANGKAH } from "@/lib/petani-alur-langkah";
import type { TugasPetani } from "@/lib/tugas-petani-types";

export function PetaniAlurPanel({ tugasUtama }: { tugasUtama?: TugasPetani }) {
  return (
    <BentoSection title="Urutan kerja" className="max-sm:p-3">
      <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
        <span className="sm:hidden">4 langkah lapangan · menu lain di sidebar.</span>
        <span className="hidden sm:inline">
          Empat langkah ini saja yang Anda kerjakan di lapangan. Menu lain ada di sidebar kiri.
        </span>
      </p>
      <ol
        className={[
          "flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4",
          "[scrollbar-width:thin]",
        ].join(" ")}
      >
        {PETANI_ALUR_LANGKAH.map((step) => (
          <li
            key={step.no}
            className="flex min-w-[7.25rem] shrink-0 snap-start flex-col rounded-md border border-border p-2 sm:min-w-0 sm:p-3"
          >
            <span className="text-[10px] font-medium tabular-nums text-muted-foreground sm:text-xs">
              Langkah {step.no}
            </span>
            <span className="mt-0.5 text-sm font-semibold leading-snug">{step.label}</span>
            <span className="mt-0.5 hidden flex-1 text-xs leading-relaxed text-muted-foreground sm:mt-1 sm:block">
              {step.hint}
            </span>
            <Link
              href={step.href}
              scroll={false}
              className="mt-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline sm:mt-2 sm:text-sm"
            >
              Buka
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-2 rounded-md border border-dashed p-2.5 sm:mt-4 sm:p-4">
        {tugasUtama ? (
          <>
            <p className="text-xs font-medium text-muted-foreground sm:text-sm">Mulai dari sini</p>
            <p className="mt-0.5 text-sm font-semibold leading-snug">{tugasUtama.judul}</p>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
              {tugasUtama.deskripsi}
            </p>
            <Button type="button" className="mt-2 h-9 w-full text-sm sm:mt-3 sm:h-11 sm:w-auto" asChild>
              <Link href={tugasUtama.href} scroll={false}>
                Buka tugas
              </Link>
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Tidak ada tugas terbuka. Kolam kosong? Mulai semai baru.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button type="button" className="h-9 text-sm sm:h-11" asChild>
                <Link href="/petani/siklus/baru" scroll={false}>
                  Mulai semai
                </Link>
              </Button>
              <Button type="button" variant="outline" className="h-9 text-sm sm:h-11" asChild>
                <Link href="/petani/siklus" scroll={false}>
                  Lihat siklus
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </BentoSection>
  );
}
