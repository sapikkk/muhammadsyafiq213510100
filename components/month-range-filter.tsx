import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MonthRangeFilter({
  dari,
  sampai,
  exportHref,
  exportLabel = "Unduh PDF",
}: {
  dari: string;
  sampai: string;
  exportHref?: string;
  exportLabel?: string;
}) {
  return (
    <form method="get" className="flex flex-wrap items-end gap-3">
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-muted-foreground">Dari (YYYY-MM)</span>
        <Input
          name="dari"
          defaultValue={dari}
          className="h-11 w-36"
          pattern="\d{4}-\d{2}"
          required
        />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-muted-foreground">Sampai (YYYY-MM)</span>
        <Input
          name="sampai"
          defaultValue={sampai}
          className="h-11 w-36"
          pattern="\d{4}-\d{2}"
          required
        />
      </label>
      <Button type="submit" className="h-11">
        Terapkan
      </Button>
      {exportHref ? (
        <Button type="button" variant="outline" className="h-11" asChild>
          <Link href={exportHref}>{exportLabel}</Link>
        </Button>
      ) : null}
    </form>
  );
}
