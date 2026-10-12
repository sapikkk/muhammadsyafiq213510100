"use client";

import { useMemo, useState } from "react";
import { InstitusiKeuanganIcon } from "@/components/institusi-keuangan-icon";
import { AKUN_KODE } from "@/lib/akun-kode";
import type { RekeningKasOption } from "@/lib/rekening-kas-types";

type Props = {
  name?: string;
  className?: string;
  defaultValue?: string;
  options: RekeningKasOption[];
  labelEmpty?: string;
};

const baseClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function labelOption(o: RekeningKasOption): string {
  const no = o.nomorRekening ? ` · ${o.nomorRekening}` : "";
  if (o.jenis === "TUNAI") return `${o.namaRekening}${no}`;
  return `${o.institusiNama} — ${o.namaRekening}${no}`;
}

export function RekeningSumberSelect({
  name = "sumberKas",
  className,
  defaultValue,
  options,
  labelEmpty = "Belum ada rekening. Owner isi di menu Rekening.",
}: Props) {
  const fallback = defaultValue ?? options[0]?.akunKode ?? AKUN_KODE.KAS;
  const [akunKode, setAkunKode] = useState(fallback);
  const current = useMemo(
    () => options.find((o) => o.akunKode === akunKode) ?? options[0],
    [options, akunKode],
  );

  if (options.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">{labelEmpty}</p>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <InstitusiKeuanganIcon
        logoSlug={current?.logoSlug}
        jenis={current?.jenis}
        className="h-7 w-7 shrink-0"
        title={current ? labelOption(current) : undefined}
      />
      <select
        name={name}
        className={`min-w-0 flex-1 ${className ?? baseClass}`}
        value={akunKode}
        onChange={(e) => setAkunKode(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.akunKode} value={o.akunKode}>
            {labelOption(o)}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Baris ikon + label (dashboard, tabel rekening). */
export function RekeningLabel({ option }: { option: RekeningKasOption }) {
  return (
    <span className="inline-flex items-center gap-2">
      <InstitusiKeuanganIcon logoSlug={option.logoSlug} jenis={option.jenis} className="h-5 w-5" />
      <span>{labelOption(option)}</span>
    </span>
  );
}
