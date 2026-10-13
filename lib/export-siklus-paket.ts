import "server-only";

import { formatTanggal } from "@/lib/format";
import type { ExportDocument } from "@/lib/export-document-types";
import { labelLaporanPanenStatus } from "@/lib/laporan-panen-status";
import { labelTahap, listLogKegagalan } from "@/lib/log-kegagalan";
import { getSiklusProduksi, listLogProduksi } from "@/lib/siklus-produksi";
import { labelSiklusStatus } from "@/lib/siklus-status-label";
import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

export async function buildSiklusPaketDocument(siklusId: number): Promise<ExportDocument | null> {
  const siklus = await getSiklusProduksi(siklusId);
  if (!siklus) return null;

  const [logs, kegagalan] = await Promise.all([
    listLogProduksi(siklusId),
    listLogKegagalan(siklusId),
  ]);

  const judul = labelBarisProduksiUtama(partsFromSiklusNested(siklus));
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "short", timeStyle: "short" });

  const sections: ExportDocument["sections"] = [
    {
      title: "Ringkas siklus",
      headers: ["Field", "Nilai"],
      rows: [
        ["Batch", siklus.kode_batch],
        ["Status", labelSiklusStatus(siklus.status)],
        [
          "Semai",
          formatTanggal(
            new Date(`${siklus.tanggal_semai.toISOString().slice(0, 10)}T12:00:00.000Z`),
          ),
        ],
        ["Jumlah disemai", String(siklus.jumlah_disemai)],
        ["Total susut", String(siklus.total_susut)],
      ],
    },
    {
      title: "Log fase",
      headers: ["Waktu", "Dari", "Ke", "Catatan"],
      rows: logs.map((l) => [
        fmt.format(l.waktu),
        isFaseProduksi(l.fase_dari) ? faseLabel[l.fase_dari] : l.fase_dari,
        isFaseProduksi(l.fase_ke) ? faseLabel[l.fase_ke] : l.fase_ke,
        (l.catatan ?? "").slice(0, 120),
      ]),
    },
    {
      title: "Log kegagalan",
      headers: ["Tahap", "Jumlah gagal", "Penyebab"],
      rows: kegagalan.map((k) => [
        labelTahap(k.tahap),
        String(k.jumlah_gagal),
        k.penyebab.slice(0, 120),
      ]),
    },
  ];

  if (siklus.laporanPanen) {
    const lp = siklus.laporanPanen;
    sections.push({
      title: "Laporan panen",
      headers: ["Pos", "Nilai"],
      rows: [
        ["Status", labelLaporanPanenStatus(lp.status)],
        ["Layak (pohon)", String(lp.jumlah_layak)],
        ["Berat layak (g)", String(lp.berat_layak_gram)],
        ["Tidak layak (pohon)", String(lp.jumlah_tidak_layak)],
        ["Berat tidak layak (g)", String(lp.berat_tidak_layak_gram)],
      ],
    });
  }

  return {
    title: `Berkas siklus — ${judul}`,
    subtitleLines: [`Kode batch: ${siklus.kode_batch}`],
    sections,
  };
}
