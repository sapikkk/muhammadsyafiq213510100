"use client";

import { useMemo, useState } from "react";
import { InstitusiKeuanganIcon } from "@/components/institusi-keuangan-icon";
import { DAFTAR_INSTITUSI_KEUANGAN } from "@/lib/indonesia-institusi-keuangan";

const baseClass =
  "flex h-11 w-full max-w-md rounded-md border border-input bg-background px-2 text-sm";

type Props = {
  name: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
};

export function InstitusiKeuanganSelect({
  name,
  required,
  defaultValue = "bca",
  className,
}: Props) {
  const [picked, setPicked] = useState(defaultValue);
  const groups = useMemo(
    () => [
      { title: "Tunai", items: DAFTAR_INSTITUSI_KEUANGAN.filter((i) => i.jenis === "TUNAI") },
      { title: "Bank", items: DAFTAR_INSTITUSI_KEUANGAN.filter((i) => i.jenis === "BANK") },
      { title: "E-wallet", items: DAFTAR_INSTITUSI_KEUANGAN.filter((i) => i.jenis === "EWALLET") },
    ],
    [],
  );
  const current = DAFTAR_INSTITUSI_KEUANGAN.find((i) => i.kode === picked);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor={name}>
        Bank / e-wallet
      </label>
      <div className="flex max-w-md items-center gap-2">
        <InstitusiKeuanganIcon
          logoSlug={current?.logoSlug}
          jenis={current?.jenis}
          className="h-8 w-8 shrink-0"
          title={current?.nama}
        />
        <select
          id={name}
          name={name}
          required={required}
          className={`min-w-0 flex-1 ${className ?? baseClass}`}
          value={picked}
          onChange={(e) => setPicked(e.target.value)}
        >
          {groups.map((g) => (
            <optgroup key={g.title} label={g.title}>
              {g.items.map((i) => (
                <option key={i.kode} value={i.kode}>
                  {i.nama}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
