import "server-only";

import type { ExportDocument } from "@/lib/export-document-types";
import { formatRupiah } from "@/lib/format";
import { listActivePack } from "@/lib/active-pack";
import { listItemInventaris, listAlertStokMinimum } from "@/lib/inventaris";
import { listLaporanPanen } from "@/lib/laporan-panen";
import { labelLaporanPanenStatus } from "@/lib/laporan-panen-status";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";
import { listSalesOrders } from "@/lib/sales-order";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";
import {
  LIST_SIKLUS_MAX_LIMIT,
  listSiklusProduksi,
  serializeSiklus,
} from "@/lib/siklus-produksi";
import { listVarietas, serializeVarietas } from "@/lib/varietas";
import { mapRataHppPerLubangSemuaVarietas } from "@/lib/varietas-hpp-rata";
import { varietasStatusLabel, type VarietasStatus } from "@/lib/varietas-status";

function dieksporPada(): string {
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" });
  return `Diekspor: ${fmt.format(new Date())}`;
}

export async function buildVarietasDocument(opts: {
  onlyAktif: boolean;
  includeRataHpp: boolean;
}): Promise<ExportDocument> {
  const [rows, rataMap] = await Promise.all([
    listVarietas(opts.onlyAktif),
    opts.includeRataHpp ? mapRataHppPerLubangSemuaVarietas() : Promise.resolve(null),
  ]);

  const headers = opts.includeRataHpp
    ? [
        "Nama",
        "Status",
        "Harga benih/g",
        "Biji/g",
        "Daya kecambah %",
        "Lama semai (hari)",
        "Lama kolam (hari)",
        "Berat panen rata (g)",
        "Berat/pack (g)",
        "Harga curah",
        "Harga pack",
        "Jumlah siklus",
        "Rata HPP/lubang",
      ]
    : [
        "Nama",
        "Status",
        "Harga benih/g",
        "Biji/g",
        "Daya kecambah %",
        "Lama semai (hari)",
        "Lama kolam (hari)",
        "Berat panen rata (g)",
        "Berat/pack (g)",
        "Harga curah",
        "Harga pack",
        "Jumlah siklus",
      ];

  const tableRows = rows.map((r) => {
    const s = serializeVarietas(r);
    const status = varietasStatusLabel[s.status as VarietasStatus] ?? s.status;
    const base = [
      s.nama,
      status,
      s.hargaBenihPerGram,
      s.bijiPerGram,
      s.dayaKecambah,
      String(s.lamaSemai),
      String(s.lamaDiKolam),
      s.beratRataRataPanen,
      s.beratPerPack,
      formatRupiah(s.hargaJualCurah),
      formatRupiah(s.hargaJualPack),
      String(s.jumlahSiklus),
    ];
    if (opts.includeRataHpp && rataMap) {
      const rata = rataMap.get(r.id);
      base.push(rata ? formatRupiah(rata) : "—");
    }
    return base;
  });

  return {
    title: opts.onlyAktif ? "Varietas aktif" : "Daftar varietas",
    subtitleLines: [
      dieksporPada(),
      opts.includeRataHpp ? "Termasuk rata-rata HPP per lubang (internal)." : undefined,
    ].filter(Boolean) as string[],
    sections: [{ headers, rows: tableRows }],
  };
}

export async function buildInventarisDocument(): Promise<ExportDocument> {
  const items = await listItemInventaris(true);
  const rows = items.map((item) => [
    item.kode,
    item.nama,
    item.satuan,
    item.stokSaatIni.toString(),
    item.stokMinimum.toString(),
    item.stokSaatIni.lt(item.stokMinimum) ? "Ya" : "Tidak",
    item.aktif ? "Aktif" : "Nonaktif",
  ]);

  return {
    title: "Stok inventaris",
    subtitleLines: [dieksporPada(), "Hanya item aktif."],
    sections: [
      {
        headers: ["Kode", "Nama", "Satuan", "Stok", "Minimum", "Di bawah min.", "Status item"],
        rows,
      },
    ],
  };
}

export async function buildStokRendahDocument(): Promise<ExportDocument> {
  const items = await listAlertStokMinimum();
  const rows = items.map((item) => {
    const kekurangan = item.stokMinimum.sub(item.stokSaatIni);
    return [
      item.kode,
      item.nama,
      item.satuan,
      item.stokSaatIni.toString(),
      item.stokMinimum.toString(),
      kekurangan.gt(0) ? kekurangan.toString() : "0",
    ];
  });

  return {
    title: "Alert stok minimum",
    subtitleLines: [dieksporPada()],
    sections: [
      {
        headers: ["Kode", "Nama", "Satuan", "Stok", "Minimum", "Kekurangan"],
        rows,
      },
    ],
  };
}

export async function buildSiklusDaftarDocument(): Promise<ExportDocument> {
  const raw = await listSiklusProduksi({ limit: LIST_SIKLUS_MAX_LIMIT });
  const rows = raw.map((r) => {
    const s = serializeSiklus(r);
    return [
      s.kode_batch,
      s.varietas_nama,
      s.greenhouse_nama,
      s.kolam_nama,
      s.fase_label,
      s.tanggal_semai,
      s.tanggal_pindah_kolam ?? "—",
      s.tanggal_panen ?? "—",
      String(s.jumlah_disemai),
      String(s.jumlah_layak_jual),
      String(s.total_susut),
    ];
  });

  return {
    title: "Daftar siklus produksi",
    subtitleLines: [
      dieksporPada(),
      `Maksimal ${LIST_SIKLUS_MAX_LIMIT} batch terbaru (sama seperti batas daftar layar).`,
    ],
    sections: [
      {
        headers: [
          "Batch",
          "Varietas",
          "Greenhouse",
          "Kolam",
          "Fase",
          "Semai",
          "Pindah kolam",
          "Panen",
          "Disemai",
          "Layak jual",
          "Susut",
        ],
        rows,
      },
    ],
  };
}

export async function buildPenjualanDocument(includeHpp: boolean): Promise<ExportDocument> {
  const orders = await listSalesOrders();
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

  const headers = includeHpp
    ? ["No. SO", "Invoice", "Pelanggan", "Status", "Tanggal", "Total", "HPP", "Margin"]
    : ["No. SO", "Invoice", "Pelanggan", "Status", "Tanggal", "Total"];

  const rows = orders.map((o) => {
    const hppTotal = o.baris.reduce((s, b) => s.add(b.hpp_order), o.total.mul(0));
    const base = [
      o.nomor_so,
      o.nomor_invoice ?? "—",
      o.pelanggan.nama,
      labelSalesOrderStatus(o.status),
      fmt.format(o.dibuat_pada),
      formatRupiah(o.total),
    ];
    if (includeHpp) {
      const margin = o.total.sub(hppTotal);
      base.push(formatRupiah(hppTotal), formatRupiah(margin));
    }
    return base;
  });

  return {
    title: "Daftar pesanan jual",
    subtitleLines: [
      dieksporPada(),
      includeHpp ? "Termasuk HPP dan margin (internal)." : undefined,
    ].filter(Boolean) as string[],
    sections: [{ headers, rows }],
  };
}

export async function buildPanenDocument(): Promise<ExportDocument> {
  const laporan = await listLaporanPanen();
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" });

  const rows = laporan.map((r) => [
    labelBarisProduksiUtama(partsFromSiklusNested(r.siklus)),
    r.siklus.kode_batch,
    labelLaporanPanenStatus(r.status),
    String(r.jumlah_layak),
    String(r.jumlah_tidak_layak),
    r.berat_layak_gram.toString(),
    r.berat_tidak_layak_gram.toString(),
    r.user.nama,
    fmt.format(r.waktu_kirim),
  ]);

  return {
    title: "Laporan panen",
    subtitleLines: [dieksporPada()],
    sections: [
      {
        headers: [
          "Lokasi",
          "Batch",
          "Status",
          "Layak (ekor)",
          "Tidak layak",
          "Berat layak (g)",
          "Berat tidak layak (g)",
          "Petani",
          "Waktu kirim",
        ],
        rows,
      },
    ],
  };
}

export async function buildActivePackDocument(): Promise<ExportDocument> {
  const packs = await listActivePack(false);
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

  const rows = packs.map((p) => [
    p.kode,
    p.item?.kode ?? "—",
    p.item?.nama ?? "—",
    p.status === "AKTIF" ? "Aktif" : "Habis",
    formatRupiah(p.hargaPack),
    p.jumlahUnit.toString(),
    p.sisaUnit.toString(),
    formatRupiah(p.biayaPerUnit),
    p.dibuatOleh?.nama ?? "—",
    fmt.format(p.dibuatPada),
  ]);

  return {
    title: "Paket siap pakai",
    subtitleLines: [dieksporPada()],
    sections: [
      {
        headers: [
          "Kode pack",
          "Kode item",
          "Item",
          "Status",
          "Harga pack",
          "Unit awal",
          "Sisa unit",
          "Biaya/unit",
          "Dibuat oleh",
          "Dibuat",
        ],
        rows,
      },
    ],
  };
}
