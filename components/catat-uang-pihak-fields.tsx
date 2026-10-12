"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import type { CatatUangPihakBundle, PihakUiMode } from "@/lib/catat-uang-pihak-types";
import { pihakModeForSmartJurnalClient } from "@/lib/catat-uang-pihak-types";
import type { SmartJurnalTipe } from "@/lib/smart-jurnal-catalog";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm";

export function CatatUangPihakFields({
  tipe,
  pihak,
}: {
  tipe: SmartJurnalTipe;
  pihak: CatatUangPihakBundle;
}) {
  const mode = pihakModeForSmartJurnalClient(tipe);

  const options = useMemo(() => {
    if (!mode) return [];
    const rows: { key: string; label: string; group: string }[] = [];
    const push = (list: CatatUangPihakBundle["petani"], group: string) => {
      for (const o of list) rows.push({ ...o, group });
    };
    if (mode === "karyawan") {
      push(pihak.petani, "Karyawan");
      rows.push({ key: "__baru_karyawan__", label: "Tambah karyawan baru…", group: "Baru" });
      return rows;
    }
    if (mode === "pemilik") {
      push(pihak.pemilik, "Pemilik");
      return rows;
    }
    if (mode === "pelanggan") {
      push(pihak.pelanggan, "Pelanggan");
      rows.push({ key: "__lain__", label: "Vendor / lain (ketik nama)…", group: "Baru" });
      return rows;
    }
    push(pihak.petani, "Karyawan");
    push(pihak.pelanggan, "Pelanggan");
    push(pihak.pemilik, "Pemilik");
    rows.push({ key: "__baru_karyawan__", label: "Tambah karyawan baru…", group: "Baru" });
    rows.push({ key: "__lain__", label: "Vendor / PT / lain…", group: "Baru" });
    return rows;
  }, [mode, pihak]);

  if (!mode) return null;

  const defaultKey =
    mode === "karyawan"
      ? (pihak.petani[0]?.key ?? "__baru_karyawan__")
      : mode === "pemilik"
        ? (pihak.pemilik[0]?.key ?? "")
        : mode === "pelanggan"
          ? (pihak.pelanggan[0]?.key ?? "__lain__")
          : "__none__";

  const placeholder =
    mode === "karyawan"
      ? "Nama karyawan baru"
      : mode === "pemilik"
        ? "Nama pemilik"
        : "Nama vendor, PT, atau pihak";

  return (
    <div className="space-y-3 rounded-md border border-dashed p-3">
      <p className="text-sm font-medium">Pihak transaksi</p>
      <label className="block space-y-1.5 text-sm">
        <span className="text-muted-foreground">Pilih dari daftar</span>
        <select
          name="pihakKey"
          className={selectClass}
          defaultValue={defaultKey}
          required={mode !== "umum"}
        >
          {mode === "umum" ? <option value="__none__">— Opsional —</option> : null}
          {options.map((o) => (
            <option key={o.key} value={o.key}>
              {o.group}: {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="text-muted-foreground">
          Nama baru (jika pilih &quot;Tambah…&quot; atau vendor lain)
        </span>
        <Input name="namaPihakBaru" className="h-11" maxLength={100} placeholder={placeholder} />
      </label>
    </div>
  );
}
