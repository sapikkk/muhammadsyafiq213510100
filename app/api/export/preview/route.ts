import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import { parsePeriodParams } from "@/lib/export-auth";
import { parseDateRangeParams } from "@/lib/export-params";
import {
  buildBalanceSheetDocument,
  buildCashFlowDocument,
  buildIncomeStatementDocument,
} from "@/lib/export-finance-documents";
import { buildInvoicePelangganDocument } from "@/lib/export-invoice-doc";
import {
  buildMonitorKolamDocument,
  parseMonitorExportFilter,
} from "@/lib/monitor-kolam-export";
import { buildPelangganRiwayatDocument } from "@/lib/pelanggan-riwayat";
import { buildSiklusPaketDocument } from "@/lib/export-siklus-paket";
import { buildJournalExportDocument } from "@/lib/export-journal-doc";
import {
  buildActivePackDocument,
  buildInventarisDocument,
  buildPanenDocument,
  buildPenjualanDocument,
  buildSiklusDaftarDocument,
  buildStokRendahDocument,
  buildVarietasDocument,
} from "@/lib/export-daftar-documents";
import type { FilterJurnal } from "@/lib/jurnal";

export const GET = withApiHandler(async (request: Request) => {
  const url = new URL(request.url);
  const jenis = (url.searchParams.get("jenis") ?? "").trim();

  const financeRoles = ["ADMIN", "OWNER"] as const;
  const petaniRoles = ["PEKERJA", "ADMIN", "OWNER"] as const;

  if (jenis === "laba-rugi") {
    const { denied } = await requireApiRole([...financeRoles]);
    if (denied) return denied;
    const { dari, sampai, start, end } = parsePeriodParams(url);
    const doc = await buildIncomeStatementDocument(start, end, `${dari} s/d ${sampai}`);
    return NextResponse.json(doc);
  }

  if (jenis === "neraca") {
    const { denied } = await requireApiRole([...financeRoles]);
    if (denied) return denied;
    const { end } = parsePeriodParams(url);
    const doc = await buildBalanceSheetDocument(end);
    return NextResponse.json(doc);
  }

  if (jenis === "arus-kas") {
    const { denied } = await requireApiRole([...financeRoles]);
    if (denied) return denied;
    const { dari, sampai } = parsePeriodParams(url);
    const doc = await buildCashFlowDocument(dari, sampai);
    return NextResponse.json(doc);
  }

  if (jenis === "monitor-kolam") {
    const { denied } = await requireApiRole([...petaniRoles]);
    if (denied) return denied;
    const { start, end, tglAwal, tglAkhir } = parseDateRangeParams(url);
    const filter = parseMonitorExportFilter(url, start, end);
    const doc = await buildMonitorKolamDocument(filter, tglAwal, tglAkhir);
    return NextResponse.json(doc);
  }

  if (jenis === "siklus-paket") {
    const { denied } = await requireApiRole([...petaniRoles]);
    if (denied) return denied;
    const id = Number(url.searchParams.get("siklusId"));
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Siklus tidak valid." }, { status: 400 });
    }
    const doc = await buildSiklusPaketDocument(id);
    if (!doc) return NextResponse.json({ error: "Siklus tidak ditemukan." }, { status: 404 });
    return NextResponse.json(doc);
  }

  if (jenis === "faktur") {
    const { denied } = await requireApiRole(["ADMIN"]);
    if (denied) return denied;
    const id = Number(url.searchParams.get("soId"));
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Pesanan tidak valid." }, { status: 400 });
    }
    const doc = await buildInvoicePelangganDocument(id);
    return NextResponse.json(doc);
  }

  if (jenis === "pelanggan-riwayat") {
    const { denied } = await requireApiRole(["ADMIN"]);
    if (denied) return denied;
    const id = Number(url.searchParams.get("pelangganId"));
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Pelanggan tidak valid." }, { status: 400 });
    }
    const doc = await buildPelangganRiwayatDocument(id);
    if (!doc) return NextResponse.json({ error: "Pelanggan tidak ditemukan." }, { status: 404 });
    return NextResponse.json(doc);
  }

  if (jenis === "jurnal") {
    const { denied } = await requireApiRole(["ADMIN"]);
    if (denied) return denied;
    const filter: FilterJurnal = {
      status: url.searchParams.get("status") ?? undefined,
      dari: url.searchParams.get("dari") ?? url.searchParams.get("tglAwal") ?? undefined,
      sampai: url.searchParams.get("sampai") ?? url.searchParams.get("tglAkhir") ?? undefined,
    };
    const doc = await buildJournalExportDocument(filter);
    return NextResponse.json(doc);
  }

  const listRolesPetani = ["PEKERJA", "ADMIN", "OWNER"] as const;
  const listRolesFinance = ["ADMIN", "OWNER"] as const;

  if (jenis === "varietas") {
    const { denied, session } = await requireApiRole([...listRolesPetani]);
    if (denied) return denied;
    const role = session!.user!.role!;
    const doc = await buildVarietasDocument({
      onlyAktif: role === "PEKERJA",
      includeRataHpp: role !== "PEKERJA",
    });
    return NextResponse.json(doc);
  }

  if (jenis === "inventaris") {
    const { denied } = await requireApiRole([...listRolesPetani]);
    if (denied) return denied;
    return NextResponse.json(await buildInventarisDocument());
  }

  if (jenis === "stok-rendah") {
    const { denied } = await requireApiRole([...listRolesPetani]);
    if (denied) return denied;
    return NextResponse.json(await buildStokRendahDocument());
  }

  if (jenis === "siklus-daftar") {
    const { denied } = await requireApiRole([...listRolesPetani]);
    if (denied) return denied;
    return NextResponse.json(await buildSiklusDaftarDocument());
  }

  if (jenis === "penjualan") {
    const { denied } = await requireApiRole([...listRolesFinance]);
    if (denied) return denied;
    return NextResponse.json(await buildPenjualanDocument(true));
  }

  if (jenis === "panen") {
    const { denied } = await requireApiRole([...listRolesFinance]);
    if (denied) return denied;
    return NextResponse.json(await buildPanenDocument());
  }

  if (jenis === "active-pack") {
    const { denied } = await requireApiRole([...listRolesPetani]);
    if (denied) return denied;
    return NextResponse.json(await buildActivePackDocument());
  }

  return NextResponse.json({ error: "Jenis pratinjau tidak dikenal." }, { status: 400 });
});
