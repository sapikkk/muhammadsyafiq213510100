"use client";

import { useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { submitSalesOrder } from "@/app/actions/sales-order";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/format";

type SiklusOpt = {
  id: number;
  kode_batch: string;
  varietas_nama: string;
  harga_curah: string;
  harga_pack: string;
};

type Line = {
  siklusId: string;
  jenis: "CURAH" | "PACK";
  jumlah: string;
  hargaSatuan: string;
};

export function SalesOrderForm({
  pelanggan,
  siklus,
}: {
  pelanggan: { id: number; nama: string }[];
  siklus: SiklusOpt[];
}) {
  const [state, formAction] = useFormState(submitSalesOrder, {});
  const [lines, setLines] = useState<Line[]>([
    { siklusId: siklus[0]?.id ? String(siklus[0].id) : "", jenis: "CURAH", jumlah: "", hargaSatuan: "" },
  ]);

  const grandTotal = useMemo(() => {
    return lines.reduce((sum, line) => {
      const q = Number(line.jumlah.replace(",", "."));
      const p = Number(line.hargaSatuan.replace(",", "."));
      if (!Number.isFinite(q) || !Number.isFinite(p)) return sum;
      return sum + q * p;
    }, 0);
  }, [lines]);

  const barisJson = JSON.stringify(
    lines
      .filter((l) => l.siklusId && l.jumlah && l.hargaSatuan)
      .map((l) => ({
        siklusId: Number(l.siklusId),
        jenis: l.jenis,
        jumlah: l.jumlah,
        hargaSatuan: l.hargaSatuan,
      })),
  );

  function updateLine(index: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function onSiklusChange(index: number, siklusId: string) {
    const batch = siklus.find((s) => String(s.id) === siklusId);
    const jenis = lines[index]?.jenis ?? "CURAH";
    const harga = jenis === "PACK" ? batch?.harga_pack : batch?.harga_curah;
    updateLine(index, { siklusId, hargaSatuan: harga ?? "" });
  }

  function addLine() {
    setLines((prev) => [
      ...prev,
      { siklusId: siklus[0]?.id ? String(siklus[0].id) : "", jenis: "CURAH", jumlah: "", hargaSatuan: "" },
    ]);
  }

  if (pelanggan.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Tambah pelanggan dulu sebelum membuat sales order.
      </p>
    );
  }

  if (siklus.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Tidak ada batch siap jual (panen harus disetujui).
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <input type="hidden" name="barisJson" value={barisJson} readOnly />
      <h3 className="text-lg font-semibold">Buat sales order (DRAFT)</h3>
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-primary" role="status">
          {state.ok}
        </p>
      ) : null}

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Pelanggan</span>
        <select
          name="pelangganId"
          required
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {pelanggan.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nama}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <div key={index} className="grid gap-2 rounded border p-3 sm:grid-cols-4">
            <select
              value={line.siklusId}
              onChange={(e) => onSiklusChange(index, e.target.value)}
              className="h-10 rounded-md border px-2 text-sm sm:col-span-2"
            >
              {siklus.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.kode_batch} · {s.varietas_nama}
                </option>
              ))}
            </select>
            <select
              value={line.jenis}
              onChange={(e) => {
                const jenis = e.target.value as "CURAH" | "PACK";
                const batch = siklus.find((s) => String(s.id) === line.siklusId);
                const harga = jenis === "PACK" ? batch?.harga_pack : batch?.harga_curah;
                updateLine(index, { jenis, hargaSatuan: harga ?? line.hargaSatuan });
              }}
              className="h-10 rounded-md border px-2 text-sm"
            >
              <option value="CURAH">Curah (kg)</option>
              <option value="PACK">Pack</option>
            </select>
            <Input
              placeholder="Qty"
              value={line.jumlah}
              onChange={(e) => updateLine(index, { jumlah: e.target.value })}
              inputMode="decimal"
              className="h-10"
            />
            <Input
              placeholder="Harga satuan"
              value={line.hargaSatuan}
              onChange={(e) => updateLine(index, { hargaSatuan: e.target.value })}
              inputMode="decimal"
              className="h-10 sm:col-span-2"
            />
          </div>
        ))}
        <button type="button" onClick={addLine} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          + Baris item
        </button>
      </div>

      <p className="text-sm font-medium">Grand total estimasi: {formatRupiah(String(grandTotal))}</p>

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Catatan (opsional)</span>
        <Input name="catatan" maxLength={500} className="h-11" />
      </label>

      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan SO (DRAFT)
      </SubmitButton>
    </form>
  );
}
