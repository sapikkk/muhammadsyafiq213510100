import type { ReactNode } from "react";
import { Prisma } from "@prisma/client";
import { DetailLayout } from "@/components/detail-layout";
import { JurnalBalanceDaftar, type JurnalBarisRow } from "@/components/jurnal-balance-daftar";
import { DetailKodeStrip } from "@/components/detail-kode-strip";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/format";
import type { getJurnal } from "@/lib/jurnal";
import { statusJurnalLabel } from "@/lib/jurnal-status";
import { labelAkunCari } from "@/lib/akun-ui-labels";
import { smartJurnalTipeLabel } from "@/lib/smart-jurnal-catalog";

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

  const barisRows: JurnalBarisRow[] = jurnal.baris.map((b) => {
    const prefix = b.kredit.gt(0) ? "↳ " : "";
    return {
      id: b.id,
      akunNama: `${prefix}${b.akun.nama}`,
      akunKode: b.akun.kode,
      akunLabel: `${prefix}${labelAkunCari(b.akun)}`,
      debit: b.debit.gt(0) ? b.debit.toString() : "",
      kredit: b.kredit.gt(0) ? b.kredit.toString() : "",
    };
  });

  const meta = [
    formatTanggal(jurnal.tanggal),
    `Dibuat ${jurnal.dibuatOleh.nama}, ${waktu.format(jurnal.dibuatPada)}`,
  ].join(" · ");

  return (
    <DetailLayout
      backHref={backHref}
      surface={surface}
      financeNavRole={backHref.startsWith("/owner") ? "OWNER" : backHref.startsWith("/admin") ? "ADMIN" : undefined}
      eyebrow="Catatan keuangan"
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
        <div className="space-y-2 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <p>Alasan penolakan: {jurnal.alasanTolak}</p>
          {jurnal.status === "REJECTED" ? (
            <p className="text-muted-foreground">
              Catatan ditolak tidak mengubah saldo. Buat catatan baru dengan tipe yang benar jika transaksi
              memang terjadi.
            </p>
          ) : null}
          {jurnal.status === "REJECTED" &&
          jurnal.sumber === "SMART" &&
          /pendapatan lain/i.test(jurnal.keterangan) &&
          /modal|suntik/i.test(jurnal.keterangan) ? (
            <p className="font-medium text-foreground">
              Untuk suntikan modal: menu Catat uang → «{smartJurnalTipeLabel.SUNTIKAN_MODAL}», bukan{" "}
              {smartJurnalTipeLabel.PENDAPATAN_LAIN}.
            </p>
          ) : null}
        </div>
      ) : null}

      <PageSection title="Baris catatan" badge="Read">
        <JurnalBalanceDaftar
          rows={barisRows}
          totalDebit={totalDebit.toString()}
          totalKredit={totalKredit.toString()}
        />
      </PageSection>

      {barisRows.length > 0 ? (
        <PageSection title="Kode akun (referensi)" badge="Read">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {Array.from(
              new Map(
                barisRows.map((b) => [b.akunKode, b.akunNama.replace(/^↳\s*/, "")] as const),
              ).entries(),
            ).map(([kode, nama]) => (
              <DetailKodeStrip key={kode} label={nama} kode={kode} />
            ))}
          </div>
        </PageSection>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Total debit = kredit: {formatRupiah(totalDebit)}
      </p>
    </DetailLayout>
  );
}
