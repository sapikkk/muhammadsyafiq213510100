import progressJson from "@/data/agile-progress.json";

export type AgileProgressFile = typeof progressJson;

export type AgileItem = AgileProgressFile["items"][number];
export type AgileTimelineEntry = AgileProgressFile["timeline"][number];

/** Acuan docs/agile/timeline-registry.md (actual start PO). */
export const SPRINT_REGISTRY = [
  {
    sprint: 1,
    iterationTitle: "Sprint 1 · Fondasi & autentikasi",
    actualStart: "2026-10-07",
    targetEnd: "2026-10-20",
    issues: "#2–#9",
  },
  {
    sprint: 2,
    iterationTitle: "Sprint 2 · Akuntansi, produksi, inventaris",
    actualStart: "2026-10-08",
    targetEnd: "2026-10-21",
    issues: "#11–#28",
  },
  {
    sprint: 3,
    iterationTitle: "Sprint 3 · Penjualan & pengiriman",
    actualStart: "2026-10-22",
    targetEnd: "2026-11-04",
    issues: "#29–#33",
  },
  {
    sprint: 4,
    iterationTitle: "Sprint 4 · Dashboard & ekspor",
    actualStart: "2026-11-05",
    targetEnd: "2026-11-18",
    issues: "#34–#38, #10, #16",
  },
  {
    sprint: 5,
    iterationTitle: "Sprint 5 · QA & go-live",
    actualStart: "2026-11-19",
    targetEnd: "2026-12-02",
    issues: "#39–#45",
  },
] as const;

export function loadAgileProgress(): AgileProgressFile {
  return progressJson;
}

export function iterationLabel(
  iteration: AgileItem["iteration"],
): string {
  if (!iteration) return "Tanpa iteration";
  if (typeof iteration === "string") return iteration;
  return iteration.title;
}

export function countByIteration(items: AgileItem[]) {
  const map = new Map<string, { total: number; done: number }>();
  for (const item of items) {
    const key = iterationLabel(item.iteration);
    const row = map.get(key) ?? { total: 0, done: 0 };
    row.total += 1;
    if (item.status === "Done") row.done += 1;
    map.set(key, row);
  }
  return map;
}
