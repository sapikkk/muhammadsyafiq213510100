"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function MonthPeriodNav({
  dari,
  sampai,
  preserveKeys = ["laporan"],
}: {
  dari: string;
  sampai: string;
  preserveKeys?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const singleMonth = dari === sampai;

  function pushMonths(nextDari: string, nextSampai: string) {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of preserveKeys) {
      const v = searchParams.get(key);
      if (v) params.set(key, v);
    }
    params.set("dari", nextDari);
    params.set("sampai", nextSampai);
    router.push(`${pathname}?${params.toString()}`);
  }

  function step(delta: number) {
    if (singleMonth) {
      const next = shiftMonth(dari, delta);
      pushMonths(next, next);
      return;
    }
    pushMonths(shiftMonth(dari, delta), shiftMonth(sampai, delta));
  }

  return (
    <form
      method="get"
      className="flex flex-wrap items-end gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const d = String(fd.get("dari") ?? dari);
        const s = String(fd.get("sampai") ?? sampai);
        pushMonths(d, s);
      }}
    >
      {preserveKeys.map((key) => {
        const v = searchParams.get(key);
        return v ? <input key={key} type="hidden" name={key} value={v} /> : null;
      })}
      <div className="flex items-end gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-11 w-11 shrink-0"
          aria-label="Periode sebelumnya"
          onClick={() => step(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium text-muted-foreground">Dari bulan</span>
          <Input name="dari" type="month" defaultValue={dari} className="h-11 w-[11rem]" required />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium text-muted-foreground">Sampai bulan</span>
          <Input name="sampai" type="month" defaultValue={sampai} className="h-11 w-[11rem]" required />
        </label>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-11 w-11 shrink-0"
          aria-label="Periode berikutnya"
          onClick={() => step(1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <Button type="submit" className="h-11">
        Terapkan
      </Button>
    </form>
  );
}
