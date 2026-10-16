import { MetricCards } from "@/components/metric-cards";
import { PageSection } from "@/components/page-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tipeAkunLabel, type TipeAkunKey } from "@/lib/akun-tipe";
import { formatRupiah } from "@/lib/format";
import { neracaKelompokLabel, neracaUrutanLaba } from "@/lib/neraca-ui";
import type { buildBalanceSheet } from "@/lib/balance-sheet";

type Sheet = Awaited<ReturnType<typeof buildBalanceSheet>>;

function sectionByTipe(sheet: Sheet, tipe: TipeAkunKey) {
  return sheet.sections.find((s) => s.tipe === tipeAkunLabel[tipe]);
}

function KelompokNeraca({
  judul,
  section,
}: {
  judul: string;
  section: Sheet["sections"][number] | undefined;
}) {
  if (!section || section.rows.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
        {judul}: belum ada saldo.
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{judul}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Akun</TableHead>
            <TableHead className="text-right">Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {section.rows.map((r) => (
            <TableRow key={r.kode}>
              <TableCell className="text-sm">{r.nama}</TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {formatRupiah(r.saldo)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/30 font-medium">
            <TableCell>Total {judul.toLowerCase()}</TableCell>
            <TableCell className="text-right tabular-nums">
              {formatRupiah(section.subtotal)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function OwnerNeracaTampilan({ sheet }: { sheet: Sheet }) {
  const tanggal = sheet.asOf.split("-").reverse().join("/");

  return (
    <div className="space-y-6">
      <MetricCards
        columns={3}
        items={[
          { label: "Total aktiva", value: formatRupiah(sheet.totalAset) },
          { label: "Total kewajiban", value: formatRupiah(sheet.totalKewajiban) },
          { label: "Total ekuitas", value: formatRupiah(sheet.totalModal) },
        ]}
      />

      <PageSection title="Neraca" badge="Read">
        <p className="mb-4 text-sm text-muted-foreground">Per {tanggal}</p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <KelompokNeraca
              judul={neracaKelompokLabel.ASET}
              section={sectionByTipe(sheet, "ASET")}
            />
            <p className="flex items-center justify-between rounded-full bg-[var(--kokonus-green,#1a3d2e)] px-4 py-2.5 text-sm font-semibold text-white">
              <span>Total aktiva</span>
              <span className="tabular-nums text-[var(--kokonus-lime-mark,#d3fa53)]">
                {formatRupiah(sheet.totalAset)}
              </span>
            </p>
          </div>
          <div className="space-y-6">
            <KelompokNeraca
              judul={neracaKelompokLabel.KEWAJIBAN}
              section={sectionByTipe(sheet, "KEWAJIBAN")}
            />
            <KelompokNeraca
              judul={neracaKelompokLabel.MODAL}
              section={sectionByTipe(sheet, "MODAL")}
            />
            <p className="mt-2 flex items-center justify-between rounded-full bg-[var(--kokonus-green,#1a3d2e)] px-4 py-2.5 text-sm font-semibold text-white">
              <span>Total pasiva</span>
              <span className="tabular-nums text-[var(--kokonus-lime-mark,#d3fa53)]">
                {formatRupiah(sheet.totalKewajibanModal)}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {neracaUrutanLaba.map((tipe) => {
            const sec = sectionByTipe(sheet, tipe);
            if (!sec?.rows.length) return null;
            return (
              <KelompokNeraca key={tipe} judul={neracaKelompokLabel[tipe]} section={sec} />
            );
          })}
        </div>
      </PageSection>
    </div>
  );
}
