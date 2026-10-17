import Link from "next/link";
import { ChartCard } from "@/components/chart-card";
import {
  KeuanganPipelineStages,
  pipelineRupiah,
  type KeuanganPipelineStage,
} from "@/components/keuangan-pipeline-stages";
import { OwnerKasNetTrendChart } from "@/components/owner-kas-net-trend-chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/format";
import type { loadOwnerDashboardKeuangan } from "@/lib/owner-dashboard-keuangan";
import { KokonusProgressBar } from "@/components/kokonus/kokonus-progress-bar";
import { cn } from "@/lib/utils";

type Keuangan = Awaited<ReturnType<typeof loadOwnerDashboardKeuangan>>;

const PINTASAN = [
  { href: "/owner/jurnal", label: "Jurnal umum", hint: "Debit dan kredit harian" },
  { href: "/owner/laporan?laporan=laba-rugi", label: "Laba dan neraca", hint: "Hasil dan posisi" },
  { href: "/owner/arus-kas", label: "Arus kas", hint: "Operasi dan pendanaan" },
  { href: "/owner/akun", label: "Bagan akun", hint: "Buku besar per akun" },
  { href: "/owner/rekening", label: "Kas dan bank", hint: "Saldo rekening" },
  { href: "/owner/prive", label: "Ambil pribadi", hint: "Pencairan dari kas" },
] as const;

function CompactMetric({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-w-0 flex-col gap-1 border border-border p-3 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        accent && "owner-keuangan-accent-metric border-transparent",
      )}
    >
      <span
        className={cn(
          "min-w-0 line-clamp-2 text-[11px] font-medium leading-tight sm:text-xs",
          accent ? "text-inherit opacity-90" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      <span className="min-w-0 max-w-full text-sm font-semibold leading-tight tabular-nums tracking-tight sm:text-base">
        {value}
      </span>
    </Link>
  );
}

function FollowUpCard({
  title,
  body,
  actionLabel,
  href,
}: {
  title: string;
  body: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <Card className="flex flex-col gap-2 rounded-none border border-border p-3 shadow-none">
      <h3 className="text-sm font-semibold leading-snug">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
      <Button asChild variant="outline" size="sm" className="w-fit">
        <Link href={href}>{actionLabel}</Link>
      </Button>
    </Card>
  );
}

export function OwnerKeuanganDashboardLayout({ data }: { data: Keuangan }) {
  const pipeline: KeuanganPipelineStage[] = [
    {
      id: "pendapatan",
      label: "Pendapatan",
      value: pipelineRupiah(data.pendapatanBulanIni),
      href: "/owner/laporan?laporan=laba-rugi",
    },
    {
      id: "beban",
      label: "Beban",
      value: pipelineRupiah(data.bebanBulanIni),
      href: "/owner/biaya",
    },
    {
      id: "piutang",
      label: "Piutang terbuka",
      value: data.jumlahPiutang > 0 ? String(data.jumlahPiutang) : "—",
      href: "/owner/penjualan/piutang",
    },
    {
      id: "tagih",
      label: "Perlu ditagih",
      value: data.jumlahPiutangPerluDitagih > 0 ? String(data.jumlahPiutangPerluDitagih) : "—",
      href: "/owner/penjualan/piutang",
    },
    {
      id: "neraca",
      label: "Posisi neraca",
      value: pipelineRupiah(data.totalAktiva),
      href: "/owner/laporan?laporan=neraca",
      inverted: true,
    },
  ];

  const piutangHint =
    data.jumlahPiutangPerluDitagih > 0
      ? `${data.jumlahPiutangPerluDitagih} pesanan sudah ≥30 hari.`
      : "Semua piutang masih di bawah 30 hari.";

  const pendapatanN = Number(data.pendapatanBulanIni);
  const bebanN = Number(data.bebanBulanIni);
  const proporsiMax = Math.max(pendapatanN, bebanN, 1);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Monex: zona gelap — saldo + sorotan laba + grafik */}
      <section
        className={cn(
          "owner-keuangan-hero flex flex-col gap-4 border border-border bg-foreground p-4 text-background sm:gap-5 sm:p-6",
        )}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h2 className="text-lg font-semibold leading-snug sm:text-xl">Saldo kas dan bank</h2>
            <p className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
              {formatRupiah(data.saldoKas)}
            </p>
            <p className="max-w-prose text-sm opacity-90">
              Pendapatan bulan ini {formatRupiah(data.pendapatanBulanIni)} · Beban{" "}
              {formatRupiah(data.bebanBulanIni)}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild size="sm" className="owner-keuangan-hero-cta">
                <Link href="/owner/rekening">Kelola rekening</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="owner-keuangan-hero-outline border-background/40 bg-transparent text-background hover:bg-white/10 hover:text-background"
              >
                <Link href="/owner/laporan?laporan=laba-rugi">Lihat laba rugi</Link>
              </Button>
            </div>
          </div>
          <div className="owner-keuangan-accent-metric w-full max-w-xs shrink-0 border border-background/25 p-4 lg:max-w-sm">
            <p className="text-sm font-medium opacity-90">Laba bersih (perkiraan)</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
              {formatRupiah(data.labaBersih)}
            </p>
            <p className="mt-2 text-sm opacity-80">Estimasi dari pendapatan minus beban bulan berjalan.</p>
          </div>
        </div>
        <ChartCard
          title="Tren arus kas operasi (6 bulan)"
          className="border-background/20 bg-background/5 text-background [&_.text-muted-foreground]:text-background/70"
        >
          <OwnerKasNetTrendChart points={data.arusKasTrend} />
        </ChartCard>
      </section>

      {/* Strip metrik kecil + satu sel aksen (piutang) */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold leading-snug">Ringkasan cepat</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          <CompactMetric
            label="Piutang belum tertagih"
            value={formatRupiah(data.totalPiutang)}
            href="/owner/penjualan/piutang"
            accent
          />
          <CompactMetric
            label="Perlu ditagih"
            value={formatRupiah(data.piutangPerluDitagih)}
            href="/owner/penjualan/piutang"
          />
          <CompactMetric
            label="Total aktiva"
            value={formatRupiah(data.totalAktiva)}
            href="/owner/laporan?laporan=neraca"
          />
          <CompactMetric
            label="Total pasiva"
            value={formatRupiah(data.totalPasiva)}
            href="/owner/laporan?laporan=neraca"
          />
          <CompactMetric
            label="Aktiva lancar"
            value={formatRupiah(data.aktivaLancar)}
            href="/owner/akun"
          />
          <CompactMetric
            label="Beban bulan ini"
            value={formatRupiah(data.bebanBulanIni)}
            href="/owner/biaya"
          />
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-md border border-border p-4">
        <h2 className="text-lg font-semibold leading-snug">Proporsi bulan ini</h2>
        <p className="text-sm text-muted-foreground">Pendapatan dan beban terhadap yang lebih besar di antara keduanya.</p>
        <KokonusProgressBar
          segments={[
            {
              label: "Pendapatan",
              value: pendapatanN,
              max: proporsiMax,
              tone: "lime",
            },
            {
              label: "Beban",
              value: bebanN,
              max: proporsiMax,
              tone: "green",
            },
          ]}
        />
      </section>

      {/* Pipeline horizontal */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-snug">Alur posisi keuangan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ketuk kartu untuk buka laporan atau daftar terkait.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/owner/jurnal">Buka jurnal</Link>
          </Button>
        </div>
        <KeuanganPipelineStages stages={pipeline} />
      </section>

      {/* Tiga kolom bawah */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold leading-snug">Pintasan laporan</h2>
          <ul className="divide-y divide-border border border-border">
            {PINTASAN.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col gap-0.5 px-3 py-3 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold leading-snug">Piutang penjualan</h2>
          <Card className="flex flex-col gap-3 rounded-none border border-border p-4 shadow-none">
            <p className="text-sm text-muted-foreground">{piutangHint}</p>
            <p className="text-2xl font-semibold tabular-nums tracking-tight">
              {formatRupiah(data.totalPiutang)}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.jumlahPiutang > 0
                ? `${data.jumlahPiutang} pesanan dengan sisa piutang`
                : "Belum ada piutang terbuka"}
            </p>
            <Button asChild className="w-full sm:w-fit">
              <Link href="/owner/penjualan/piutang">Lihat daftar piutang</Link>
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold leading-snug">Perlu tindak lanjut</h2>
          <div className="flex flex-col gap-2">
            <FollowUpCard
              title="Tagihan tertunggak"
              body={
                data.jumlahPiutangPerluDitagih > 0
                  ? `${formatRupiah(data.piutangPerluDitagih)} dari ${data.jumlahPiutangPerluDitagih} pesanan.`
                  : "Tidak ada piutang yang melewati 30 hari."
              }
              actionLabel="Buka piutang"
              href="/owner/penjualan/piutang"
            />
            <FollowUpCard
              title="Neraca"
              body={`Aktiva ${formatRupiah(data.totalAktiva)} · Pasiva ${formatRupiah(data.totalPasiva)}`}
              actionLabel="Lihat neraca"
              href="/owner/laporan?laporan=neraca"
            />
            <FollowUpCard
              title="Kas operasional"
              body={`Saldo rekening kas ${formatRupiah(data.saldoKas)}.`}
              actionLabel="Kelola rekening"
              href="/owner/rekening"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
