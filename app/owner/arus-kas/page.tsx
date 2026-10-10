import { CrudPageLayout } from "@/components/crud-page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildCashFlow } from "@/lib/cash-flow";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string };

function defaultMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default async function OwnerArusKasPage({ searchParams }: { searchParams: Search }) {
  const data = await buildCashFlow({
    dari: searchParams.dari ?? defaultMonth(),
    sampai: searchParams.sampai ?? defaultMonth(),
  });

  const exportQ = `dari=${encodeURIComponent(data.dari)}&sampai=${encodeURIComponent(data.sampai)}`;

  return (
    <CrudPageLayout
      eyebrow="Keuangan"
      title="Arus kas"
      description="US6.5 — pergerakan Kas/Bank dari jurnal APPROVED, filter periode YYYY-MM."
      flowSteps={[
        { label: "Filter", detail: "Pilih rentang bulan lalu terapkan." },
        { label: "Mutasi", detail: "Tabel bawah — link ke detail jurnal." },
        { label: "PDF", detail: "Unduh arus kas resmi untuk arsip." },
      ]}
      list={
        <div className="space-y-6">
      <form method="get" className="flex flex-wrap items-end gap-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Dari (YYYY-MM)</span>
          <input
            name="dari"
            defaultValue={data.dari}
            className="h-9 rounded-md border bg-background px-2"
            pattern="\d{4}-\d{2}"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Sampai (YYYY-MM)</span>
          <input
            name="sampai"
            defaultValue={data.sampai}
            className="h-9 rounded-md border bg-background px-2"
            pattern="\d{4}-\d{2}"
          />
        </label>
        <button type="submit" className="h-9 rounded-md bg-primary px-4 text-primary-foreground">
          Terapkan
        </button>
        <a
          href={`/api/export/cash-flow?${exportQ}`}
          className="inline-flex h-9 items-center rounded-md border px-4 hover:bg-muted/50"
        >
          Unduh PDF
        </a>
      </form>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo awal kas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold tabular-nums">{formatRupiah(data.saldoAwal)}</p>
            <p className="text-xs text-muted-foreground">Sebelum {data.dari}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Perubahan bersih</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold tabular-nums">{formatRupiah(data.netChange)}</p>
            <p className="text-xs text-muted-foreground">
              Periode {data.dari} s/d {data.sampai}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo akhir kas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold tabular-nums">{formatRupiah(data.saldoAkhir)}</p>
            <p className="text-xs text-muted-foreground">Akhir periode</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {data.sections.map((sec) => (
          <Card key={sec.kategori}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{sec.label}</CardTitle>
              <CardDescription>Net {formatRupiah(sec.net)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>Masuk {formatRupiah(sec.masuk)}</p>
              <p>Keluar {formatRupiah(sec.keluar)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.movements.length > 0 ? (
        <section className="rounded-md border">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-medium">Mutasi kas (terbaru dulu)</h2>
            <p className="text-xs text-muted-foreground">Akun 1100 Kas dan 1110 Bank</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Jurnal</th>
                  <th className="px-4 py-2">Kategori</th>
                  <th className="px-4 py-2">Keterangan</th>
                  <th className="px-4 py-2 text-right">Masuk</th>
                  <th className="px-4 py-2 text-right">Keluar</th>
                </tr>
              </thead>
              <tbody>
                {data.movements.map((row) => (
                  <tr key={`${row.jurnalId}-${row.tanggal}`} className="border-b last:border-0">
                    <td className="px-4 py-2 whitespace-nowrap">{row.tanggal}</td>
                    <td className="px-4 py-2 tabular-nums">
                      <a href={`/owner/jurnal/${row.jurnalId}`} className="text-primary hover:underline">
                        #{row.jurnalId}
                      </a>
                    </td>
                    <td className="px-4 py-2">{row.kategori}</td>
                    <td className="max-w-xs truncate px-4 py-2" title={row.keterangan}>
                      {row.keterangan || "—"}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {Number(row.masuk) > 0 ? formatRupiah(row.masuk) : "—"}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {Number(row.keluar) > 0 ? formatRupiah(row.keluar) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada mutasi kas pada periode ini (jurnal APPROVED yang menyentuh Kas/Bank).
        </p>
      )}
        </div>
      }
      listTitle="Ringkasan & mutasi"
    />
  );
}
