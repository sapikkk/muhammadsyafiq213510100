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
import { DetailKodeStrip } from "@/components/detail-kode-strip";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

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
          kolam: { include: { greenhouse: true } },
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
      title={`Review panen · ${labelBarisProduksiUtama(partsFromSiklusNested(laporan.siklus))}`}
      badge={
        <Badge variant={laporan.status === "PENDING" ? "default" : "secondary"}>
          {statusLabel}
        </Badge>
      }
      description={`Pelapor ${laporan.user.nama}`}
      primaryActions={
        laporan.status === "PENDING" ? <ClientApproval laporanId={laporan.id} /> : undefined
      }
    >
      <DetailKodeStrip label="Kode batch" kode={laporan.siklus.kode_batch} />
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
              <span className="text-muted-foreground">Biaya umum teralokasi</span>
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
              Setelah disetujui, HPP tersimpan dan stok sayur tercatat di buku. Susut tidak normal masuk beban operasional.
            </p>
          ) : null}
          {"is_override" in hppData && hppData.is_override ? (
            <p className="mt-2 text-xs text-primary">
              HPP diganti manual Admin: {(hppData as { override_justifikasi?: string | null }).override_justifikasi}
            </p>
          ) : null}
        </PageSection>
      ) : null}

    </DetailLayout>
  );
}
