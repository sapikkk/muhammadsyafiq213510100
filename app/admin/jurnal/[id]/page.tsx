import { Prisma } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JurnalActions } from "@/components/jurnal-actions";
import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { getJurnal } from "@/lib/jurnal";
import { statusJurnalLabel } from "@/lib/jurnal-status";

export const dynamic = "force-dynamic";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function JurnalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const jurnal = Number.isInteger(id) ? await getJurnal(id) : null;
  if (!jurnal) notFound();

  const nol = new Prisma.Decimal(0);
  const totalDebit = jurnal.baris.reduce((s, b) => s.add(b.debit), nol);
  const totalKredit = jurnal.baris.reduce((s, b) => s.add(b.kredit), nol);

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">{`Jurnal #${jurnal.id}`}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{jurnal.keterangan}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{formatTanggal(jurnal.tanggal)}</span>
          <span>·</span>
          <span>{`Dibuat ${jurnal.dibuatOleh.nama}, ${waktu.format(jurnal.dibuatPada)}`}</span>
          <Badge variant="secondary">{statusJurnalLabel[jurnal.status]}</Badge>
        </div>
        {jurnal.diputusOleh && jurnal.diputusPada ? (
          <p className="text-sm text-muted-foreground">
            {`${jurnal.status === "APPROVED" ? "Disetujui" : "Ditolak"} oleh ${jurnal.diputusOleh.nama}, ${waktu.format(jurnal.diputusPada)}.`}
          </p>
        ) : null}
        {jurnal.alasanTolak ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
            {`Alasan penolakan: ${jurnal.alasanTolak}`}
          </p>
        ) : null}
      </header>

      <section aria-labelledby="baris-title" className="space-y-3">
        <h2 id="baris-title" className="text-lg font-semibold">
          Baris jurnal
        </h2>
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>
              <th className="py-2 font-medium">Akun</th>
              <th className="py-2 text-right font-medium">Debit</th>
              <th className="py-2 text-right font-medium">Kredit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jurnal.baris.map((b) => (
              <tr key={b.id}>
                <td className={`py-2 ${b.kredit.gt(0) ? "pl-6" : ""}`}>
                  <span className="font-mono">{b.akun.kode}</span> {b.akun.nama}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {b.debit.gt(0) ? formatRupiah(b.debit) : ""}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {b.kredit.gt(0) ? formatRupiah(b.kredit) : ""}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t font-medium">
            <tr>
              <td className="py-2">Total</td>
              <td className="py-2 text-right tabular-nums">{formatRupiah(totalDebit)}</td>
              <td className="py-2 text-right tabular-nums">{formatRupiah(totalKredit)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <JurnalActions id={jurnal.id} status={jurnal.status} />

      <Link href="/admin/jurnal" className="text-sm underline underline-offset-4">
        Kembali ke daftar jurnal
      </Link>
    </div>
  );
}
