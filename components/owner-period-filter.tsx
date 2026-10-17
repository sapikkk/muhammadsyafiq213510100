"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  akhirBulanIso,
  defaultYearMonth,
  isIsoDate,
  isYearMonth,
  labelBulanIndonesia,
  shiftYearMonth,
  type PeriodeMode,
} from "@/lib/period-nav";

type RentangField = "date" | "month";

export function OwnerPeriodFilter({
  dari,
  sampai,
  periode,
  preserveKeys = [],
  rentangField,
  rentangOptionLabel = "Rentang tanggal",
}: {
  dari: string;
  sampai: string;
  periode: PeriodeMode;
  preserveKeys?: string[];
  rentangField: RentangField;
  rentangOptionLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function buildParams(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of preserveKeys) {
      const v = searchParams.get(key);
      if (v) params.set(key, v);
    }
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    }
    return params;
  }

  function pushParams(overrides: Record<string, string | undefined>) {
    const params = buildParams(overrides);
    router.push(`${pathname}?${params.toString()}`);
  }

  const bulanTampil = isYearMonth(dari) ? dari : isYearMonth(sampai) ? sampai : defaultYearMonth();

  function stepBulan(delta: number) {
    const next = shiftYearMonth(bulanTampil, delta);
    pushParams({ periode: undefined, dari: next, sampai: next });
  }

  function onModeChange(next: PeriodeMode) {
    if (next === "bulan") {
      const ym = isYearMonth(dari)
        ? dari
        : isIsoDate(dari)
          ? dari.slice(0, 7)
          : defaultYearMonth();
      pushParams({ periode: undefined, dari: ym, sampai: ym });
      return;
    }
    const ym = isYearMonth(dari) ? dari : isYearMonth(sampai) ? sampai : defaultYearMonth();
    if (rentangField === "month") {
      pushParams({ periode: "rentang", dari: ym, sampai: ym });
      return;
    }
    pushParams({
      periode: "rentang",
      dari: `${ym}-01`,
      sampai: akhirBulanIso(ym),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="flex w-full max-w-xs flex-col gap-1.5 text-sm">
        <span className="font-medium text-muted-foreground">Periode</span>
        <select
          className="kokonus-native-select flex h-11 w-full border border-input bg-background py-2 pl-3 pr-10 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
          value={periode}
          onChange={(e) => onModeChange(e.target.value === "rentang" ? "rentang" : "bulan")}
        >
          <option value="bulan">Per bulan</option>
          <option value="rentang">{rentangOptionLabel}</option>
        </select>
      </label>

      {periode === "bulan" ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Bulan sebelumnya"
            onClick={() => stepBulan(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <p className="min-w-0 flex-1 text-center text-sm font-semibold tabular-nums min-[220px]:text-base">
            {labelBulanIndonesia(bulanTampil)}
          </p>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Bulan berikutnya"
            onClick={() => stepBulan(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      ) : (
        <form
          method="get"
          className="flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const d = String(fd.get("dari") ?? "");
            const s = String(fd.get("sampai") ?? "");
            pushParams({ periode: "rentang", dari: d, sampai: s });
          }}
        >
          <input type="hidden" name="periode" value="rentang" />
          {preserveKeys.map((key) => {
            const v = searchParams.get(key);
            return v ? <input key={key} type="hidden" name={key} value={v} /> : null;
          })}
          {searchParams.get("status") ? (
            <input type="hidden" name="status" value={searchParams.get("status")!} />
          ) : null}
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-muted-foreground">
              {rentangField === "month" ? "Dari bulan" : "Dari tanggal"}
            </span>
            <Input
              name="dari"
              type={rentangField === "month" ? "month" : "date"}
              defaultValue={dari}
              className="h-11 w-[11rem]"
              required
            />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium text-muted-foreground">
              {rentangField === "month" ? "Sampai bulan" : "Sampai tanggal"}
            </span>
            <Input
              name="sampai"
              type={rentangField === "month" ? "month" : "date"}
              defaultValue={sampai}
              className="h-11 w-[11rem]"
              required
            />
          </label>
          <Button type="submit" className="h-11">
            Terapkan
          </Button>
        </form>
      )}
    </div>
  );
}
