import { formatRupiah } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OwnerKpiCards({
  pendapatan,
  pengeluaran,
  labaKasar,
}: {
  pendapatan: string;
  pengeluaran: string;
  labaKasar: string;
}) {
  const items = [
    { title: "Pendapatan bulan ini", value: pendapatan },
    { title: "Beban bulan ini", value: pengeluaran },
    { title: "Laba kasar (pendapatan − beban)", value: labaKasar },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{formatRupiah(item.value)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
