import { notFound } from "next/navigation";
import { ClientApproval } from "@/app/admin/harvest/[id]/client-approval";
import { DetailLayout } from "@/components/detail-layout";
import { PageSection } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatRupiah, formatQty } from "@/lib/format";
import { calculateHPP } from "@/lib/hpp";
import { ringkasanSusutSiklus } from "@/lib/susut";
import { labelLaporanPanenStatus } from "@/lib/laporan-panen-status";

export async function HarvestDetailScreen({
  id,
  surface = "page",
}: {
  id: number;
  surface?: "page" | "sheet";
}) {
  if (!Number.isInteger(id)) notFound();

  const laporan = await prisma.laporan_Panen.findUnique({
    where: { id },
    include: {
      siklus: {
        include: {
          varietas: true,
          kolam: true,
        },
      },
      user: true,
    },
  });

  if (!laporan) notFound();

  const susut = await ringkasanSusutSiklus(laporan.siklus_id);

  let hppData = null;
  if (laporan.status === "PENDING") {
    try {
      hppData = await calculateHPP(laporan.siklus_id, prisma);
    } catch (error) {
      const { logger } = await import("@/lib/logger");
      logger.error("calculateHPP gagal", error);
    }
  } else if (laporan.status === "APPROVED") {
    hppData = await prisma.hPP.findUnique({ where: { siklus_id: laporan.siklus_id } });
  }

  const statusLabel = labelLaporanPanenStatus(laporan.status);

  return (
    <DetailLayout
      backHref="/admin/harvest"
      surface={surface}
      eyebrow="Produksi"
      title={`Review panen · ${laporan.siklus.kode_batch}`}
      badge={
        <Badge variant={laporan.status === "PENDING" ? "default" : "secondary"}>
          {statusLabel}
        </Badge>
      }
      description={`${laporan.siklus.varietas.nama} · ${laporan.siklus.kolam.nama} · pelapor ${laporan.user.nama}`}
    >
      <PageSection title="Hasil sortasi" badge="Read">
        <div className="grid gap-4 sm:grid-cols-2 text-sm">
          <div className="rounded-md border bg-muted/20 p-4">
            <p className="text-muted-foreground">Layak jual</p>
            <p className="font-medium tabular-nums">
              {laporan.jumlah_layak} lubang ({formatQty(laporan.berat_layak_gram.toNumber() / 1000)}{" "}
              kg)
            </p>
          </div>
          <div className="rounded-md border bg-muted/20 p-4">
            <p className="text-muted-foreground">Tidak layak (susut)</p>
            <p className="font-medium tabular-nums">
              {laporan.jumlah_tidak_layak} lubang (
              {formatQty(laporan.berat_tidak_layak_gram.toNumber() / 1000)} kg)
            </p>
          </div>
          <div className="sm:col-span-2 rounded-md border p-4">
            <p className="text-muted-foreground">Catatan petani</p>
            <p className="italic">{laporan.catatan || "—"}</p>
          </div>
        </div>
      </PageSection>

      {hppData ? (
        <PageSection title="Rincian biaya pokok (HPP)" badge="Read">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Biaya langsung total</span>
              <span className="tabular-nums">{formatRupiah(hppData.biaya_langsung_total.toString())}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Overhead teralokasi</span>
              <span className="tabular-nums">{formatRupiah(hppData.overhead_teralokasi.toString())}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Plastik packing</span>
              <span className="tabular-nums">{formatRupiah(hppData.biaya_plastik_packing.toString())}</span>
            </div>
            {susut.abnormal > 0 ? (
              <div className="flex justify-between gap-4 text-amber-800">
                <span>Susut abnormal (dikurangi dari HPP)</span>
                <span className="tabular-nums">{formatRupiah(susut.biaya_abnormal.toString())}</span>
              </div>
            ) : null}
            <div className="flex justify-between gap-4 border-t pt-2 font-medium">
              <span>Total biaya produksi</span>
              <span className="tabular-nums">{formatRupiah(hppData.total_biaya.toString())}</span>
            </div>
            <div className="mt-4 space-y-2 border-t pt-4">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">HPP per lubang</span>
                <span className="font-medium tabular-nums">
                  {formatRupiah(hppData.hpp_per_lubang.toString())}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">HPP per kg</span>
                <span className="font-medium tabular-nums">{formatRupiah(hppData.hpp_per_kg.toString())}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">HPP per pack</span>
                <span className="font-medium tabular-nums">{formatRupiah(hppData.hpp_per_pack.toString())}</span>
              </div>
            </div>
          </div>
          {laporan.status === "PENDING" ? (
            <p className="mt-4 text-xs text-muted-foreground">
              HPP disimpan + jurnal persediaan (1350/5100) saat Approve. Susut abnormal → jurnal 5300.
            </p>
          ) : null}
          {"is_override" in hppData && hppData.is_override ? (
            <p className="mt-2 text-xs text-primary">
              Override Admin: {(hppData as { override_justifikasi?: string | null }).override_justifikasi}
            </p>
          ) : null}
        </PageSection>
      ) : null}

      {laporan.status === "PENDING" ? (
        <PageSection title="Langkah berikutnya" badge="Update">
          <ClientApproval laporanId={laporan.id} />
        </PageSection>
      ) : null}
    </DetailLayout>
  );
}
