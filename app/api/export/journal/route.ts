import { NextResponse } from "next/server";
import { requireExportRole } from "@/lib/export-auth";
import { buildJournalXlsxBuffer } from "@/lib/export-journal-xlsx";
import type { FilterJurnal } from "@/lib/jurnal";

export async function GET(request: Request) {
  const session = await requireExportRole(["ADMIN"]);
  if (!session) {
    return NextResponse.json({ error: "Hanya Admin." }, { status: 403 });
  }
  const url = new URL(request.url);
  const filter: FilterJurnal = {
    status: url.searchParams.get("status") ?? undefined,
    dari: url.searchParams.get("dari") ?? undefined,
    sampai: url.searchParams.get("sampai") ?? undefined,
  };
  const buffer = await buildJournalXlsxBuffer(filter);
  const tag = filter.dari && filter.sampai ? `${filter.dari}_${filter.sampai}` : "semua";
  const filename = `jurnal-${tag}.xlsx`;
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
