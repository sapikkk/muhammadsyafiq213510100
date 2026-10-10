import { formatRupiah } from "@/lib/format";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OwnerHidroponikKpi({
  batchPanenApproved,
  avgHppPerLubang,
  avgYieldPct,
}: {
  batchPanenApproved: number;
  avgHppPerLubang: string;
  avgYieldPct: string;
}) {
  return (
    <section aria-labelledby="v2-kpi-title" className="grid gap-4 sm:grid-cols-2">
      <h2 id="v2-kpi-title" className="sr-only">
        KPI hidroponik v2
      </h2>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">HPP rata-rata per lubang</CardTitle>
          <CardDescription>
            v2-G.1 · dari {batchPanenApproved} batch panen APPROVED
          </CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-semibold tabular-nums">
          {batchPanenApproved > 0 ? formatRupiah(avgHppPerLubang) : "—"}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Yield rata-rata</CardTitle>
          <CardDescription>Lubang layak ÷ jumlah disemai (panen disetujui)</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-semibold tabular-nums">
          {batchPanenApproved > 0 ? `${avgYieldPct}%` : "—"}
        </CardContent>
      </Card>
    </section>
  );
}
