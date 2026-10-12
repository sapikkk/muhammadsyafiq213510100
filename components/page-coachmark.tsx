"use client";

import { CircleHelp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tipsForCoachKey } from "@/lib/coach-tips";
import { UI_COPY } from "@/lib/ui-copy";
import { resolveCoachMeta, type FlowStep } from "@/lib/coach-meta";
import { cn } from "@/lib/utils";

export type { FlowStep };

const STORAGE_PREFIX = "kokonus-coach-dismissed:";

export type PageCoachmarkProps = {
  /** Unik per halaman, mis. `owner-laporan` */
  pageKey: string;
  steps: FlowStep[];
  /** Judul dialog — default "Panduan halaman" */
  title?: string;
  intro?: string;
  /** Catatan; jika kosong diisi dari lib/coach-tips.ts */
  tips?: string[];
  /** Tampil otomatis saat pertama kali (localStorage) */
  autoOnFirstVisit?: boolean;
  /** `toolbar` = sejajar aksi header; `block` = baris penuh kanan (legacy) */
  placement?: "toolbar" | "block";
};

function CoachDialog({
  open,
  onOpenChange,
  title,
  intro,
  steps,
  tips,
  onDismissForever,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  intro?: string;
  steps: FlowStep[];
  tips: string[];
  onDismissForever: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {intro ? <DialogDescription>{intro}</DialogDescription> : null}
        </DialogHeader>
        {steps.length > 0 ? (
          <ol className="space-y-4 text-sm">
            {steps.map((step, index) => (
              <li key={`${step.label}-${index}`} className="flex gap-3">
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
        ) : null}
        {tips.length > 0 ? (
          <div className="border-t pt-4 text-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Catatan
            </p>
            <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 pt-2">
          <Button type="button" className="h-10 w-full" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full"
            onClick={() => {
              onDismissForever();
              onOpenChange(false);
            }}
          >
            Jangan tampilkan lagi otomatis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PageCoachmark({
  pageKey,
  steps,
  title = "Panduan halaman",
  intro = UI_COPY.coachIntro,
  tips,
  autoOnFirstVisit = true,
  placement = "block",
}: PageCoachmarkProps) {
  const [coachOpen, setCoachOpen] = useState(false);
  const resolvedTips = tips?.length ? tips : tipsForCoachKey(pageKey);
  const storageKey = `${STORAGE_PREFIX}${pageKey}`;

  const dismissForever = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* private mode */
    }
  }, [storageKey]);

  const hasGuide = steps.length > 0 || resolvedTips.length > 0;

  useEffect(() => {
    if (!autoOnFirstVisit || !hasGuide) return;
    try {
      if (!localStorage.getItem(storageKey)) {
        setCoachOpen(true);
      }
    } catch {
      /* ignore */
    }
  }, [autoOnFirstVisit, hasGuide, storageKey]);

  if (!hasGuide) return null;

  const button = (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn(
        "gap-1.5 text-xs",
        placement === "toolbar" ? "h-11" : "h-9",
      )}
      onClick={() => setCoachOpen(true)}
      aria-label="Buka panduan halaman"
      data-coachmark={pageKey}
    >
      <CircleHelp className="h-3.5 w-3.5" aria-hidden />
      Panduan
    </Button>
  );

  return (
    <>
      {placement === "toolbar" ? (
        button
      ) : (
        <div className="flex w-full justify-end" data-coachmark={pageKey}>
          {button}
        </div>
      )}
      <CoachDialog
        open={coachOpen}
        onOpenChange={setCoachOpen}
        title={title}
        intro={intro}
        steps={steps}
        tips={resolvedTips}
        onDismissForever={dismissForever}
      />
    </>
  );
}

/** @deprecated Pakai `PageGuideToolbar` di baris header. */
export function PageCoachmarkFromPath() {
  const pathname = usePathname();
  const meta = resolveCoachMeta(pathname);
  if (!meta) return null;
  return (
    <PageCoachmark
      pageKey={meta.pageKey}
      steps={meta.steps}
      title={meta.title}
      placement="toolbar"
    />
  );
}
