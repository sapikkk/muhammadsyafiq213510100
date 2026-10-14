"use client";

import { usePathname } from "next/navigation";
import {
  PageCoachmark,
  type FlowStep,
  type PageCoachmarkProps,
} from "@/components/page-coachmark";

export type { FlowStep };

type FlowStepsProps = {
  steps: FlowStep[];
  /** Override kunci coach; default dari path URL */
  pageKey?: string;
  tips?: string[];
  title?: string;
  intro?: PageCoachmarkProps["intro"];
  /** Sejajar tombol aksi di header (default untuk CRUD/dashboard) */
  toolbar?: boolean;
};

export function FlowSteps({
  steps,
  pageKey,
  tips,
  title,
  intro,
  toolbar = true,
}: FlowStepsProps) {
  const pathname = usePathname();
  const derivedKey =
    pageKey ??
    (pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, "-"));

  return (
    <PageCoachmark
      pageKey={derivedKey}
      steps={steps}
      tips={tips}
      title={title}
      intro={intro}
      placement={toolbar ? "footer" : "footer"}
    />
  );
}
