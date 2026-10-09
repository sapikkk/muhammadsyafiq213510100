"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ClientApproval({ laporanId }: { laporanId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"IDLE" | "REJECT">("IDLE");
  const [alasan, setAlasan] = useState("");
  const [useOverride, setUseOverride] = useState(false);
  const [hppPerKg, setHppPerKg] = useState("");
  const [hppPerLubang, setHppPerLubang] = useState("");
  const [hppPerPack, setHppPerPack] = useState("");
  const [justifikasi, setJustifikasi] = useState("");

  const handleApprove = async () => {
    setLoading(true);
    setError("");
    try {
      const body: Record<string, unknown> = {};
      if (useOverride) {
        body.useOverride = true;
        body.justifikasi = justifikasi;
        if (hppPerKg) body.hppPerKg = hppPerKg;
        if (hppPerLubang) body.hppPerLubang = hppPerLubang;
        if (hppPerPack) body.hppPerPack = hppPerPack;
      }
      const res = await fetch(`/api/harvest/${laporanId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal approve.");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal approve.");
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!alasan.trim()) {
      setError("Alasan wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/harvest/${laporanId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alasan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal reject.");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal reject.");
      setLoading(false);
    }
  };

  if (mode === "REJECT") {
    return (
      <div className="space-y-4 rounded-md bg-red-50 p-4">
        <h4 className="font-medium text-red-900">Tolak Laporan Panen</h4>
        <Textarea
          placeholder="Berikan alasan penolakan..."
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          disabled={loading}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            disabled={loading}
            onClick={() => {
              setMode("IDLE");
              setError("");
            }}
          >
            Batal
          </Button>
          <Button variant="destructive" disabled={loading} onClick={handleReject}>
            Konfirmasi Tolak
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <label className="flex min-h-11 items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0"
          checked={useOverride}
          onChange={(e) => setUseOverride(e.target.checked)}
          disabled={loading}
        />
        <span>
          <span className="font-medium">Override HPP</span>
          <span className="block text-muted-foreground">
            Isi minimal satu satuan + justifikasi (min. 10 karakter).
          </span>
        </span>
      </label>

      {useOverride ? (
        <div className="space-y-3 rounded-md border bg-muted/20 p-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block space-y-1 text-xs">
              <span className="font-medium">HPP / kg (Rp)</span>
              <Input value={hppPerKg} onChange={(e) => setHppPerKg(e.target.value)} disabled={loading} />
            </label>
            <label className="block space-y-1 text-xs">
              <span className="font-medium">HPP / lubang (Rp)</span>
              <Input
                value={hppPerLubang}
                onChange={(e) => setHppPerLubang(e.target.value)}
                disabled={loading}
              />
            </label>
            <label className="block space-y-1 text-xs">
              <span className="font-medium">HPP / pack (Rp)</span>
              <Input
                value={hppPerPack}
                onChange={(e) => setHppPerPack(e.target.value)}
                disabled={loading}
              />
            </label>
          </div>
          <label className="block space-y-1 text-xs">
            <span className="font-medium">Justifikasi override</span>
            <Textarea
              value={justifikasi}
              onChange={(e) => setJustifikasi(e.target.value)}
              disabled={loading}
              rows={3}
            />
          </label>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <Button onClick={handleApprove} disabled={loading} className="w-full sm:w-auto">
          Approve & Generate HPP
        </Button>
        <Button
          onClick={() => setMode("REJECT")}
          disabled={loading}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 sm:w-auto"
        >
          Tolak
        </Button>
      </div>
    </div>
  );
}
