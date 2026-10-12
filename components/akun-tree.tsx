"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { toggleAkun } from "@/app/actions/akun";
import { AkunFormSheet, type AkunEdit, type AkunOption } from "@/components/akun-form";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { tipeAkunLabel, type TipeAkunKey } from "@/lib/akun-tipe";
import { formatRupiah } from "@/lib/format";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export type AkunRow = {
  id: number;
  kode: string;
  nama: string;
  tipe: TipeAkunKey;
  aktif: boolean;
  isSystem: boolean;
  parentId: number | null;
  saldo: string;
  anak: AkunRow[];
};

function rollupSaldo(node: AkunRow): number {
  if (node.anak.length === 0) return Number(node.saldo);
  return node.anak.reduce((sum, child) => sum + rollupSaldo(child), 0);
}

function filterAkunTree(nodes: AkunRow[], query: string): AkunRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return nodes;

  function walk(node: AkunRow): AkunRow | null {
    const selfMatch =
      node.kode.toLowerCase().includes(q) || node.nama.toLowerCase().includes(q);
    const anak = node.anak.map(walk).filter((n): n is AkunRow => n !== null);
    if (selfMatch || anak.length > 0) {
      return { ...node, anak: selfMatch ? node.anak : anak };
    }
    return null;
  }

  return nodes.map(walk).filter((n): n is AkunRow => n !== null);
}

function toEdit(akun: AkunRow): AkunEdit {
  return {
    id: akun.id,
    kode: akun.kode,
    nama: akun.nama,
    tipe: akun.tipe,
    parentId: akun.parentId,
    isSystem: akun.isSystem,
  };
}

function AkunToggleDialog({
  akun,
  nextAktif,
  label,
}: {
  akun: AkunRow;
  nextAktif: boolean;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(toggleAkun, {});
  useActionToast({ error: state.error, saved: state.saved });

  useEffect(() => {
    if (state.saved) setOpen(false);
  }, [state.saved]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-9">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label} akun</DialogTitle>
          <DialogDescription>
            {nextAktif
              ? `Akun ${akun.kode} akan muncul lagi di dropdown jurnal.`
              : `Akun ${akun.kode} tidak bisa dipakai transaksi baru; jurnal lama tetap utuh.`}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 pt-2">
          <input type="hidden" name="id" value={akun.id} />
          <input type="hidden" name="aktif" value={String(nextAktif)} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <SubmitButton pendingLabel="…">{label}</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Node({
  akun,
  depth,
  mode,
  parents,
}: {
  akun: AkunRow;
  depth: number;
  mode: "admin" | "owner";
  parents: AkunOption[];
}) {
  const writable = mode === "admin" && !akun.isSystem;
  const tampilSaldo = rollupSaldo(akun);
  const induk = akun.anak.length > 0;

  return (
    <li>
      <div
        className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ paddingLeft: depth * 20 }}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-sm">
          <span className={`min-w-0 truncate ${akun.aktif ? "font-medium" : "text-muted-foreground line-through"}`}>
            {akun.nama}
          </span>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground" title={`Kode ${akun.kode}`}>
            {akun.kode}
          </span>
          {depth === 0 ? (
            <Badge variant="secondary">{tipeAkunLabel[akun.tipe]}</Badge>
          ) : null}
          {akun.aktif ? null : <Badge variant="outline">Nonaktif</Badge>}
          {akun.isSystem ? <Badge variant="secondary">Sistem</Badge> : null}
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span
            className={`min-w-[7rem] text-right text-sm tabular-nums ${induk ? "font-semibold" : ""}`}
            title={induk ? "Jumlah saldo akun di bawahnya" : "Saldo akun"}
          >
            {formatRupiah(tampilSaldo)}
          </span>
        {writable ? (
          <div className="flex gap-2">
            <AkunFormSheet
              parents={parents}
              edit={toEdit(akun)}
              trigger={
                <Button type="button" variant="outline" size="sm" className="h-9">
                  Ubah
                </Button>
              }
            />
            <AkunToggleDialog
              akun={akun}
              nextAktif={!akun.aktif}
              label={akun.aktif ? "Nonaktifkan" : "Aktifkan"}
            />
          </div>
        ) : null}
        </div>
      </div>
      {akun.anak.length > 0 ? (
        <ul className="divide-y border-t">
          {akun.anak.map((anak) => (
            <Node key={anak.id} akun={anak} depth={depth + 1} mode={mode} parents={parents} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function AkunTree({
  tree,
  mode,
  parents = [],
}: {
  tree: AkunRow[];
  mode: "admin" | "owner";
  parents?: AkunOption[];
}) {
  const [filter, setFilter] = useState("");
  const visible = useMemo(() => filterAkunTree(tree, filter), [tree, filter]);

  return (
    <section aria-labelledby="akun-tree-title" className="space-y-3">
      <h2 id="akun-tree-title" className="text-lg font-semibold">
        Daftar akun
      </h2>
      {tree.length > 0 ? (
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Cari kode atau nama akun…"
          className="h-9 max-w-sm"
          aria-label="Cari akun"
        />
      ) : null}
      {tree.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Belum ada akun. Tambahkan akun utama dulu, misalnya 1000 Aset.
        </p>
      ) : visible.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Tidak ada akun yang cocok dengan pencarian.
        </p>
      ) : (
        <div className="rounded-md border">
          <div className="hidden border-b px-4 py-2 text-xs font-medium text-muted-foreground sm:grid sm:grid-cols-[1fr_7rem] sm:items-center">
            <span>Akun</span>
            <span className="text-right">Saldo</span>
          </div>
          <ul className="divide-y px-4">
            {visible.map((akun) => (
              <Node key={akun.id} akun={akun} depth={0} mode={mode} parents={parents} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
