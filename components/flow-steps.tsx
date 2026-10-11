"use client";

import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type FlowStep = {
  label: string;
  detail: string;
};

/** Langkah alur — ringkas di halaman; penjelasan via tooltip native + coachmark dialog. */
export function FlowSteps({ steps }: { steps: FlowStep[] }) {
  const [coachOpen, setCoachOpen] = useState(false);
  if (steps.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2"
      aria-label="Alur halaman"
    >
      <span className="text-xs font-medium text-muted-foreground">Langkah</span>
      <ol className="flex flex-wrap items-center gap-1.5">
        {steps.map((step, index) => (
          <li key={step.label}>
            <button
              type="button"
              title={step.detail}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium",
                "hover:bg-muted/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground",
              )}
              onClick={() => setCoachOpen(true)}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-foreground text-[10px] font-semibold"
                aria-hidden
              >
                {index + 1}
              </span>
              <span>{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ml-auto h-8 gap-1.5 px-2 text-xs text-muted-foreground"
        onClick={() => setCoachOpen(true)}
      >
        <CircleHelp className="h-3.5 w-3.5" aria-hidden />
        Panduan
      </Button>
      <Dialog open={coachOpen} onOpenChange={setCoachOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Alur halaman</DialogTitle>
            <DialogDescription>Ikuti langkah berikut dari atas ke bawah.</DialogDescription>
          </DialogHeader>
          <ol className="space-y-4 text-sm">
            {steps.map((step, index) => (
              <li key={step.label} className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground text-xs font-semibold"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="min-w-0 space-y-0.5">
                  <p className="font-medium">{step.label}</p>
                  <p className="text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </div>
  );
}
