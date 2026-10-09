"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ClientApproval({ laporanId }: { laporanId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"IDLE" | "REJECT">("IDLE");
  const [alasan, setAlasan] = useState("");

  const handleApprove = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/harvest/${laporanId}/approve`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal approve.");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
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
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (mode === "REJECT") {
    return (
      <div className="space-y-4 bg-red-50 p-4 rounded-md">
        <h4 className="font-medium text-red-900">Tolak Laporan Panen</h4>
        <Textarea 
          placeholder="Berikan alasan penolakan..." 
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          disabled={loading}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" disabled={loading} onClick={() => { setMode("IDLE"); setError(""); }}>Batal</Button>
          <Button variant="destructive" disabled={loading} onClick={handleReject}>Konfirmasi Tolak</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-4">
        <Button onClick={handleApprove} disabled={loading} className="w-full sm:w-auto">Approve & Generate HPP</Button>
        <Button onClick={() => setMode("REJECT")} disabled={loading} variant="outline" className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50">Tolak</Button>
      </div>
    </div>
  );
}
