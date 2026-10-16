"use client";

import { CancelSubscription, UnusualCharge } from "@/components/lime/blocks/assistant-alert";
import { PayingABill } from "@/components/lime/blocks/assistant-approval";
import { AssistantLimits, PaydayRule } from "@/components/lime/blocks/settings-rules";
import { BillSchedule, type Bill } from "@/components/lime/ui/bill-schedule";
import { useUiTheme } from "@/components/ui-theme-provider";

const UPCOMING_BILLS: Bill[] = [
  { name: "Phone", due: new Date("2026-10-08T12:00:00Z"), amount: -45, pay: "autopay" },
  { name: "Rent share", due: new Date("2026-10-10T12:00:00Z"), amount: -450, pay: "manual" },
  { name: "Music", due: new Date("2026-10-14T12:00:00Z"), amount: -11.99, pay: "autopay" },
  { name: "Internet", due: new Date("2026-10-18T12:00:00Z"), amount: -55, pay: "autopay" },
];

/** Pratinjau komponen resmi design.how — hanya tampil saat tema Lime aktif. */
export function KokonusLimeContoh() {
  const { theme } = useUiTheme();
  if (theme !== "lime") return null;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 rounded-panel border border-line bg-page p-5 text-fg">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Aturan gaji</h2>
        <PaydayRule />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Tagihan mendatang</h2>
        <BillSchedule bills={UPCOMING_BILLS} available={2481.2} autopayLabel="Lime pays" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Bayar tagihan</h2>
        <PayingABill />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Batas asisten</h2>
        <AssistantLimits />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Batalkan langganan</h2>
        <CancelSubscription />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Biaya tidak biasa</h2>
        <UnusualCharge />
      </section>

      <p className="text-sm text-fg-2">
        Contoh blok dari{" "}
        <a
          href="https://design.how/systems/lime"
          className="font-medium text-accent-line underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          design.how, Lime
        </a>
        . Wireframe lo-fi dan grafik monokrom tidak memakai komponen ini.
      </p>
    </div>
  );
}
