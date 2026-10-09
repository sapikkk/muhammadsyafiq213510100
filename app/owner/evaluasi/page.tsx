import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatQty, formatRupiah } from "@/lib/format";
import { ownerEvaluation } from "@/lib/owner-evaluation";

export const dynamic = "force-dynamic";

export default async function OwnerEvaluasiPage() {
  const data = await ownerEvaluation();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evaluasi margin & BEP"
        description="US6.4 — HPP vs harga jual, titik impas, dan kapasitas kolam menganggur."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Kapasitas lubang</CardTitle>
            <CardDescription>Status kolam TERPAKAI / MENGANGGUR</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              Total <span className="font-medium tabular-nums">{data.kapasitas.totalLubang.toLocaleString("id-ID")}</span>{" "}
              lubang · idle {data.kapasitas.idlePct}%
            </p>
            <p className="text-muted-foreground">
              Terpakai {data.kapasitas.lubangTerpakai.toLocaleString("id-ID")} · Menganggur{" "}
              {data.kapasitas.lubangMenganggur.toLocaleString("id-ID")}
            </p>
            <p className="text-muted-foreground">
              {data.kapasitas.kolamTerpakai} kolam aktif · {data.kapasitas.kolamMenganggur} kolam menganggur
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Margin rata-rata (curah)</CardTitle>
            <CardDescription>HPP vs harga master varietas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>HPP/kg {formatRupiah(data.rataRata.hppPerKg)}</p>
            <p>Harga curah {formatRupiah(data.rataRata.hargaCurah)}</p>
            <p className="font-medium text-foreground">
              Kontribusi {formatRupiah(data.rataRata.marginCurahPerKg)}/kg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Margin rata-rata (pack)</CardTitle>
            <CardDescription>Per pack jual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>HPP/pack {formatRupiah(data.rataRata.hppPerPack)}</p>
            <p>Harga pack {formatRupiah(data.rataRata.hargaPack)}</p>
            <p className="font-medium">Kontribusi {formatRupiah(data.rataRata.marginPackPerPack)}/pack</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Titik impas (BEP)</CardTitle>
          <CardDescription>
            Overhead tetap terbaru{" "}
            {data.bep.overheadPeriode ? `(periode ${data.bep.overheadPeriode})` : "— belum diinput Admin"}
            : {formatRupiah(data.bep.overheadBulan)}/bulan
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-muted-foreground">BEP penjualan curah (kg/bulan)</p>
            <p className="text-xl font-semibold tabular-nums">
              {data.bep.bepKgCurah != null ? `${formatQty(data.bep.bepKgCurah)} kg` : "—"}
            </p>
            <p className="text-xs text-muted-foreground">
              overhead ÷ kontribusi curah ({formatRupiah(data.bep.kontribusiCurahPerKg)}/kg)
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">BEP lubang layak jual (min/bulan)</p>
            <p className="text-xl font-semibold tabular-nums">
              {data.bep.bepLubangMin != null
                ? `${Number(data.bep.bepLubangMin).toLocaleString("id-ID")} lubang`
                : "—"}
            </p>
            <p className="text-xs text-muted-foreground">Estimasi dari pendapatan curah per lubang − HPP/lubang</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rekomendasi</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {data.rekomendasi.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {data.siklusTerbaru.length > 0 ? (
        <section className="rounded-md border">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-medium">Siklus dengan HPP disetujui (terbaru)</h2>
            <p className="text-xs text-muted-foreground">Ringkas — tanpa buka tabel jurnal mentah</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2">Batch</th>
                  <th className="px-4 py-2">Varietas</th>
                  <th className="px-4 py-2">HPP/kg</th>
                  <th className="px-4 py-2">Harga curah</th>
                  <th className="px-4 py-2">Margin/kg</th>
                  <th className="px-4 py-2">Margin %</th>
                </tr>
              </thead>
              <tbody>
                {data.siklusTerbaru.map((row) => (
                  <tr key={row.kodeBatch} className="border-b last:border-0">
                    <td className="px-4 py-2 font-medium">{row.kodeBatch}</td>
                    <td className="px-4 py-2">{row.varietas}</td>
                    <td className="px-4 py-2 tabular-nums">{formatRupiah(row.hppPerKg)}</td>
                    <td className="px-4 py-2 tabular-nums">{formatRupiah(row.hargaCurah)}</td>
                    <td className="px-4 py-2 tabular-nums">{formatRupiah(row.marginCurahPerKg)}</td>
                    <td className="px-4 py-2 tabular-nums">{row.marginCurahPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada baris margin —{" "}
          <Link href="/owner" className="text-primary hover:underline">
            kembali ke dashboard
          </Link>
          .
        </p>
      )}
    </div>
  );
}
