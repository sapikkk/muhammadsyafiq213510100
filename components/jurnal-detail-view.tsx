import type { ReactNode } from "react";
import { Prisma } from "@prisma/client";
import { DetailLayout } from "@/components/detail-layout";
import { JurnalBalanceDaftar, type JurnalBarisRow } from "@/components/jurnal-balance-daftar";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/format";
import type { getJurnal } from "@/lib/jurnal";
import { statusJurnalLabel } from "@/lib/jurnal-status";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

type JurnalDetail = NonNullable<Awaited<ReturnType<typeof getJurnal>>>;

export function JurnalDetailView({
  jurnal,
  backHref,
  actions,
  surface = "page",
}: {
  jurnal: JurnalDetail;
  backHref: string;
  actions?: ReactNode;
  surface?: "page" | "sheet";
}) {
  const nol = new Prisma.Decimal(0);
  const totalDebit = jurnal.baris.reduce((s, b) => s.add(b.debit), nol);
  const totalKredit = jurnal.baris.reduce((s, b) => s.add(b.kredit), nol);

  const barisRows: JurnalBarisRow[] = jurnal.baris.map((b) => ({
    id: b.id,
    akunLabel: `${b.kredit.gt(0) ? "↳ " : ""}${b.akun.kode} ${b.akun.nama}`,
    debit: b.debit.gt(0) ? b.debit.toString() : "",
    kredit: b.kredit.gt(0) ? b.kredit.toString() : "",
  }));

  const meta = [
    formatTanggal(jurnal.tanggal),
    `Dibuat ${jurnal.dibuatOleh.nama}, ${waktu.format(jurnal.dibuatPada)}`,
  ].join(" · ");

  return (
    <DetailLayout
      backHref={backHref}
      surface={surface}
      eyebrow={`Catatan keuangan #${jurnal.id}`}
      title={jurnal.keterangan}
      badge={<Badge variant="secondary">{statusJurnalLabel[jurnal.status]}</Badge>}
      description={meta}
      actions={actions}
    >
      {jurnal.diputusOleh && jurnal.diputusPada ? (
        <p className="text-sm text-muted-foreground">
          {`${jurnal.status === "APPROVED" ? "Disetujui" : "Ditolak"} oleh ${jurnal.diputusOleh.nama}, ${waktu.format(jurnal.diputusPada)}.`}
        </p>
      ) : null}
      {jurnal.alasanTolak ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
          Alasan penolakan: {jurnal.alasanTolak}
        </p>
      ) : null}

      <PageSection title="Baris jurnal" badge="Read">
        <JurnalBalanceDaftar
          rows={barisRows}
          totalDebit={totalDebit.toString()}
          totalKredit={totalKredit.toString()}
        />
      </PageSection>

      <p className="text-xs text-muted-foreground">
        Total debit = kredit: {formatRupiah(totalDebit)}
      </p>
    </DetailLayout>
  );
}
