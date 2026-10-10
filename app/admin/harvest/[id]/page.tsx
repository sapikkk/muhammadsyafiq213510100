import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma";
import { formatRupiah, formatQty } from "@/lib/format";
import { calculateHPP } from "@/lib/hpp";
import { ringkasanSusutSiklus } from "@/lib/susut";
import { ClientApproval } from "./client-approval";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function HarvestDetailAdminPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const laporan = await prisma.laporan_Panen.findUnique({
    where: { id },
    include: {
      siklus: {
        include: {
          varietas: true,
          kolam: true,
        }
      },
      user: true,
    }
  });

  if (!laporan) notFound();

  const susut = await ringkasanSusutSiklus(laporan.siklus_id);

  // If status is PENDING, calculate provisional HPP to display
  // If status is APPROVED, fetch HPP record
  let hppData = null;
  if (laporan.status === "PENDING") {
    // Simulasi calculation based on current tx (we don't have tx here so we pass prisma)
    try {
      hppData = await calculateHPP(laporan.siklus_id, prisma);
    } catch (error) {
      const { logger } = await import("@/lib/logger");
      logger.error("calculateHPP gagal", error);
    }
  } else if (laporan.status === "APPROVED") {
    hppData = await prisma.hPP.findUnique({ where: { siklus_id: laporan.siklus_id } });
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <PageHeader
        title={`Review Laporan: ${laporan.siklus.kode_batch}`}
        description="Rincian hasil panen dan estimasi HPP."
      />

      <div className="rounded-md border p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Varietas</p>
            <p className="font-medium">{laporan.siklus.varietas.nama}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Kolam</p>
            <p className="font-medium">{laporan.siklus.kolam.nama}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Petani (Pelapor)</p>
            <p className="font-medium">{laporan.user.nama}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge variant={laporan.status === "PENDING" ? "default" : "secondary"}>{laporan.status}</Badge>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Hasil Sortasi</h3>
          <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded">
            <div>
              <p className="text-muted-foreground">Layak Jual</p>
              <p className="font-medium">{laporan.jumlah_layak} lubang ({formatQty(laporan.berat_layak_gram.toNumber() / 1000)} kg)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tidak Layak (Susut)</p>
              <p className="font-medium">{laporan.jumlah_tidak_layak} lubang ({formatQty(laporan.berat_tidak_layak_gram.toNumber() / 1000)} kg)</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Catatan Petani</p>
              <p className="italic">{laporan.catatan || "-"}</p>
            </div>
          </div>
        </div>

        {hppData && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Breakdown HPP (Estimasi)</h3>
            <div className="space-y-2 text-sm bg-muted/30 p-3 rounded">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Biaya Langsung Total:</span>
                <span>{formatRupiah(hppData.biaya_langsung_total.toString())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overhead Teralokasi:</span>
                <span>{formatRupiah(hppData.overhead_teralokasi.toString())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plastik packing:</span>
                <span>{formatRupiah(hppData.biaya_plastik_packing.toString())}</span>
              </div>
              {susut.abnormal > 0 ? (
                <div className="flex justify-between text-amber-800">
                  <span>Susut abnormal (dikurangi dari HPP):</span>
                  <span>{formatRupiah(susut.biaya_abnormal.toString())}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total Biaya Produksi:</span>
                <span>{formatRupiah(hppData.total_biaya.toString())}</span>
              </div>

              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HPP per Lubang:</span>
                  <span className="font-medium">{formatRupiah(hppData.hpp_per_lubang.toString())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HPP per Kg:</span>
                  <span className="font-medium">{formatRupiah(hppData.hpp_per_kg.toString())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HPP per Pack:</span>
                  <span className="font-medium">{formatRupiah(hppData.hpp_per_pack.toString())}</span>
                </div>
              </div>
            </div>
            {laporan.status === "PENDING" ? (
              <p className="mt-2 text-xs text-muted-foreground">
                HPP disimpan + jurnal persediaan (1350/5100) saat Approve. Susut abnormal → jurnal 5300.
              </p>
            ) : null}
            {"is_override" in hppData && hppData.is_override ? (
              <p className="mt-2 text-xs text-primary">
                Override Admin: {(hppData as { override_justifikasi?: string | null }).override_justifikasi}
              </p>
            ) : null}
          </div>
        )}

        {laporan.status === "PENDING" && (
          <div className="border-t pt-4">
            <ClientApproval laporanId={laporan.id} />
          </div>
        )}
      </div>
    </div>
  );
}
