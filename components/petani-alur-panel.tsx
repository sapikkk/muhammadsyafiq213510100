import Link from "next/link";
import { BentoSection } from "@/components/dashboard-bento";
import { Button } from "@/components/ui/button";
import { PETANI_ALUR_LANGKAH } from "@/lib/petani-alur-langkah";
import type { TugasPetani } from "@/lib/tugas-petani-types";

export function PetaniAlurPanel({ tugasUtama }: { tugasUtama?: TugasPetani }) {
  return (
    <BentoSection title="Urutan kerja">
      <p className="mb-3 text-sm text-muted-foreground">
        Empat langkah ini saja yang Anda kerjakan di lapangan. Menu lain ada di sidebar kiri.
      </p>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PETANI_ALUR_LANGKAH.map((step) => (
          <li key={step.no} className="flex flex-col rounded-md border border-border p-3">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {step.no}
            </span>
            <span className="mt-0.5 font-semibold leading-snug">{step.label}</span>
            <span className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
              {step.hint}
            </span>
            <Link
              href={step.href}
              scroll={false}
              className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Buka
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-md border border-dashed p-4">
        {tugasUtama ? (
          <>
            <p className="text-sm font-medium text-muted-foreground">Mulai dari sini</p>
            <p className="mt-1 font-semibold leading-snug">{tugasUtama.judul}</p>
            <p className="mt-1 text-sm text-muted-foreground">{tugasUtama.deskripsi}</p>
            <Button type="button" className="mt-3 h-11 w-full sm:w-auto" asChild>
              <Link href={tugasUtama.href} scroll={false}>
                Buka tugas
              </Link>
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Tidak ada tugas terbuka. Kolam kosong? Mulai semai baru.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" className="h-11" asChild>
                <Link href="/petani/siklus/baru" scroll={false}>
                  Mulai semai
                </Link>
              </Button>
              <Button type="button" variant="outline" className="h-11" asChild>
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
