"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { submitMonitorKolam } from "@/app/actions/monitor-kolam";
import { AngkaStepperField } from "@/components/angka-stepper-field";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function MonitorKolamForm({
  siklusId,
  kolamId,
  kolamLabel,
}: {
  siklusId: number;
  kolamId: number;
  kolamLabel: string;
}) {
  const [state, formAction] = useFormState(submitMonitorKolam, {});
  useActionToast({ error: state.error, ok: state.ok });

  const [ppm, setPpm] = useState(800);
  const [ph, setPh] = useState(6);
  const [suhu, setSuhu] = useState(24);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="siklusId" value={siklusId} />
      <input type="hidden" name="kolamId" value={kolamId} />
      <p className="text-sm text-muted-foreground">
        Kolam: <span className="font-medium text-foreground">{kolamLabel}</span> — catatan
        tersimpan ke batch siklus aktif di kolam ini.
      </p>
      <AngkaStepperField
        label="PPM nutrisi"
        name="ppm"
        value={ppm}
        onChange={setPpm}
        stepKecil={1}
        stepBesar={10}
        labelKecil="+1"
        labelBesar="+10"
        decimals={0}
        required
      />
      <AngkaStepperField
        label="pH air"
        name="ph"
        value={ph}
        onChange={setPh}
        stepKecil={0.01}
        stepBesar={0.1}
        labelKecil="+0,01"
        labelBesar="+0,10"
        decimals={2}
        required
      />
      <AngkaStepperField
        label="Suhu air (°C)"
        name="suhu"
        value={suhu}
        onChange={setSuhu}
        stepKecil={0.1}
        stepBesar={1}
        labelKecil="+0,1"
        labelBesar="+1"
        decimals={1}
        required
      />
      <SubmitButton className="h-11 w-full" pendingLabel="Menyimpan...">
        Simpan monitor kolam
      </SubmitButton>
    </form>
  );
}
