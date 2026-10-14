import "server-only";

import { Prisma } from "@prisma/client";
import { buildBalanceSheet } from "@/lib/balance-sheet";
import { monthlySummary } from "@/lib/monthly-summary";
import { listPiutangPenjualan, ringkasanPiutang } from "@/lib/piutang-penjualan";
import { ensureRekeningKasDefaults, listRekeningKasAktif } from "@/lib/rekening-kas";

const nol = new Prisma.Decimal(0);

export async function loadOwnerDashboardKeuangan() {
  const [summary, piutangRows, rekening, neraca] = await Promise.all([
    monthlySummary(6),
    listPiutangPenjualan(),
    (async () => {
      await ensureRekeningKasDefaults();
      return listRekeningKasAktif();
    })(),
    buildBalanceSheet(new Date()),
  ]);

  const ringkasan = ringkasanPiutang(piutangRows);
  const saldoKas = rekening.reduce((s, r) => s.add(new Prisma.Decimal(r.saldo)), nol);

  const piutangJatuh = piutangRows.filter(
    (r) => r.umur === "61-90" || r.umur === "90plus" || r.hari_tertunggak >= 30,
  );
  const totalPiutangJatuh = piutangJatuh.reduce(
    (s, r) => s.add(new Prisma.Decimal(r.sisa_piutang)),
    nol,
  );

  const aktivaLancar = neraca.sections
    .find((s) => s.tipe === "Aset")
    ?.rows.filter((r) => r.kode.startsWith("11") || r.kode.startsWith("12") || r.kode.startsWith("13"))
    .reduce((s, r) => s.add(new Prisma.Decimal(r.saldo)), nol);

  const labaBersih = new Prisma.Decimal(summary.labaKasarBulanIni);

  const arusKasTrend = summary.months.map((m) => ({
    label: m.label,
    net: (Number(m.pendapatan) - Number(m.pengeluaran)).toFixed(2),
  }));

  return {
    saldoKas: saldoKas.toFixed(2),
    pendapatanBulanIni: summary.pendapatanBulanIni,
    bebanBulanIni: summary.pengeluaranBulanIni,
    labaBersih: labaBersih.toFixed(2),
    totalPiutang: ringkasan.totalPiutang,
    jumlahPiutang: ringkasan.jumlahPesanan,
    piutangPerluDitagih: totalPiutangJatuh.toFixed(2),
    jumlahPiutangPerluDitagih: piutangJatuh.length,
    totalAktiva: neraca.totalAset,
    totalPasiva: neraca.totalKewajibanModal,
    aktivaLancar: (aktivaLancar ?? nol).toFixed(2),
    arusKasTrend,
  };
}
