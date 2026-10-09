import Link from "next/link";
import type { HistoriPetaniBaris, TugasPetani } from "@/lib/tugas-petani";
import { Badge } from "@/components/ui/badge";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

function prioritasVariant(p: TugasPetani["prioritas"]) {
  if (p === "tinggi") return "default" as const;
  if (p === "sedang") return "secondary" as const;
  return "outline" as const;
}

export function PetaniTugasPanel({
  tugas,
  histori,
}: {
  tugas: TugasPetani[];
  histori: HistoriPetaniBaris[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tugas hari ini</h2>
        {tugas.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Tidak ada tugas terbuka. Batch aktif sudah up to date.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {tugas.map((t) => (
              <li key={t.id} className="space-y-2 p-4 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={prioritasVariant(t.prioritas)}>{t.prioritas}</Badge>
                  <p className="font-medium">{t.judul}</p>
                </div>
                <p className="text-muted-foreground">{t.deskripsi}</p>
                <Link
                  href={t.href}
                  className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline"
                >
                  Buka
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Histori aktivitas</h2>
        {histori.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Belum ada log produksi.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {histori.map((h, i) => (
              <li key={`${h.siklus_kode}-${i}`} className="space-y-1 p-4 text-sm">
                <p className="font-medium">{h.siklus_kode}</p>
                <p className="text-muted-foreground">{h.ringkasan}</p>
                <p className="text-xs text-muted-foreground">
                  {waktu.format(h.waktu)} · {h.jenis}
                </p>
                <Link href={h.href} className="text-primary underline-offset-4 hover:underline">
                  Detail siklus
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
