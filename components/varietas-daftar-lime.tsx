"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "@/components/lime/ui/input";
import { List, ListItem } from "@/components/lime/ui/list";
import { VarietasListIcon } from "@/components/lime/varietas-list-icon";
import { varietasStatusLabel, type VarietasStatus } from "@/lib/varietas-status";
import type { SerializedVarietas } from "@/lib/varietas-types";

type Row = SerializedVarietas & { rataHppPerLubang?: string | null };

const basePath = {
  admin: "/admin/varietas",
  owner: "/owner/varietas",
  petani: "/petani/varietas",
} as const;

function rowDescription(row: Row, mode: keyof typeof basePath): string {
  const status = varietasStatusLabel[row.status as VarietasStatus] ?? row.status;
  const siklus =
    row.jumlahSiklus > 0 ? `${row.jumlahSiklus} siklus` : "Belum ada siklus";
  if (mode === "petani") return `${status} · ${siklus}`;
  const hpp =
    row.rataHppPerLubang != null && row.rataHppPerLubang !== ""
      ? `HPP/lubang Rp ${row.rataHppPerLubang}`
      : "HPP/lubang —";
  return `${status} · ${siklus} · ${hpp}`;
}

export function VarietasDaftarLime({
  rows,
  mode,
}: {
  rows: Row[];
  mode: keyof typeof basePath;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => r.nama.toLowerCase().includes(needle));
  }, [rows, q]);

  const openDetail = (id: number) => {
    router.prefetch(`${basePath[mode]}/${id}`);
    router.push(`${basePath[mode]}/${id}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4 text-fg">
      <Input
        size="lg"
        placeholder="Cari varietas…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Cari varietas"
        className="max-w-md"
      />
      {filtered.length === 0 ? (
        <p className="text-sm text-fg-3">
          {rows.length === 0 ? "Belum ada varietas." : "Tidak ada varietas cocok pencarian."}
        </p>
      ) : (
        <List variant="grouped">
          {filtered.map((row) => (
            <ListItem
              key={row.id}
              leading={<VarietasListIcon nama={row.nama} tone="accent" />}
              title={row.nama}
              description={rowDescription(row, mode)}
              onClick={() => openDetail(row.id)}
            />
          ))}
        </List>
      )}
      <p className="text-xs text-fg-3">{filtered.length} varietas</p>
    </div>
  );
}
