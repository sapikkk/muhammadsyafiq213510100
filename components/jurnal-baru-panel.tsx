"use client";

import { useState } from "react";
import { JurnalForm } from "@/components/jurnal-form";
import { SmartJurnalForm } from "@/components/smart-jurnal-form";
import { Button } from "@/components/ui/button";

type AkunOpt = { id: number; kode: string; nama: string };

export function JurnalBaruPanel({
  akun,
  tanggalAwal,
  periodeTutup,
}: {
  akun: AkunOpt[];
  tanggalAwal: string;
  periodeTutup: string | null;
}) {
  const [tab, setTab] = useState<"smart" | "manual">("smart");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={tab === "smart" ? "default" : "outline"}
          size="sm"
          onClick={() => setTab("smart")}
        >
          Smart Jurnal
        </Button>
        <Button
          type="button"
          variant={tab === "manual" ? "default" : "outline"}
          size="sm"
          onClick={() => setTab("manual")}
        >
          Jurnal manual
        </Button>
      </div>
      {tab === "smart" ? (
        <SmartJurnalForm tanggalAwal={tanggalAwal} periodeTutup={periodeTutup} />
      ) : (
        <JurnalForm akun={akun} tanggalAwal={tanggalAwal} periodeTutup={periodeTutup} />
      )}
    </div>
  );
}
