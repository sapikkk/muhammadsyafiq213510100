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
  const [ph, setPh] = useState(6.12);
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
        decimals={0}
        min={0}
        max={5000}
        minus={[
          { delta: -100, label: "−100" },
          { delta: -10, label: "−10" },
          { delta: -1, label: "−1" },
        ]}
        plus={[
          { delta: 1, label: "+1" },
          { delta: 10, label: "+10" },
          { delta: 100, label: "+100" },
        ]}
        required
      />
      <AngkaStepperField
        label="pH air"
        name="ph"
        value={ph}
        onChange={setPh}
        decimals={2}
        min={0}
        max={14}
        minus={[
          { delta: -1, label: "−1" },
          { delta: -0.1, label: "−0,1" },
          { delta: -0.01, label: "−0,01" },
        ]}
        plus={[
          { delta: 0.01, label: "+0,01" },
          { delta: 0.1, label: "+0,10" },
          { delta: 1, label: "+1" },
        ]}
        required
      />
      <AngkaStepperField
        label="Suhu air (°C)"
        name="suhu"
        value={suhu}
        onChange={setSuhu}
        decimals={1}
        min={0}
        max={50}
        minus={[
          { delta: -1, label: "−1" },
          { delta: -0.1, label: "−0,1" },
        ]}
        plus={[
          { delta: 0.1, label: "+0,10" },
          { delta: 1, label: "+1" },
        ]}
        required
      />
      <SubmitButton className="h-11 w-full" pendingLabel="Menyimpan...">
        Simpan monitor kolam
      </SubmitButton>
    </form>
  );
}
