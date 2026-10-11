import "server-only";

import { listPelanggan } from "@/lib/pelanggan";
import { prisma } from "@/lib/prisma";
import { listSiklusSiapJual } from "@/lib/sales-order";

/** Data untuk halaman buat SO (admin). */
export async function loadSalesOrderCreateContext() {
  const [pelanggan, siklusRows, akunDpRows] = await Promise.all([
    listPelanggan(true),
    listSiklusSiapJual(),
    prisma.akun.findMany({
      where: { tipe: "KEWAJIBAN", aktif: true, anak: { none: {} } },
      orderBy: { kode: "asc" },
      select: { id: true, kode: true, nama: true },
    }),
  ]);

  const siklus = siklusRows.map((s) => ({
    id: s.id,
    kode_batch: s.kode_batch,
    varietas_nama: s.varietas.nama,
    harga_curah: s.varietas.harga_jual_curah.toString(),
    harga_pack: s.varietas.harga_jual_pack.toString(),
    jumlah_layak: s.laporanPanen?.jumlah_layak ?? 0,
  }));

  return {
    pelanggan: pelanggan.map((p) => ({ id: p.id, nama: p.nama })),
    siklus,
    akunDp: akunDpRows,
  };
}
