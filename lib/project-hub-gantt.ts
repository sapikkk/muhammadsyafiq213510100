/** Rentang Gantt halaman beranda — selaras docs/agile/timeline-registry.md (monokrom). */

export type GanttSegment = {
  label: string;
  start: string;
  end: string;
};

export type GanttLane = {
  id: string;
  label: string;
  segments: GanttSegment[];
};

export const GANTT_RANGE = { start: "2026-10-07", end: "2026-12-05" };

export const GANTT_LANES: GanttLane[] = [
  {
    id: "desain",
    label: "Desain & UCD",
    segments: [
      { label: "IA & flow nav", start: "2026-10-07", end: "2026-10-20" },
      { label: "UCD increment v2", start: "2026-10-10", end: "2026-11-04" },
      { label: "UX flow + perf", start: "2026-10-10", end: "2026-11-18" },
    ],
  },
  {
    id: "program",
    label: "Program",
    segments: [
      { label: "Sprint 1 · fondasi", start: "2026-10-07", end: "2026-10-20" },
      { label: "Sprint 2 · operasi", start: "2026-10-08", end: "2026-10-21" },
      { label: "Sprint 3 · penjualan", start: "2026-10-22", end: "2026-11-04" },
      { label: "Sprint 4 · laporan", start: "2026-11-05", end: "2026-11-18" },
    ],
  },
  {
    id: "qa",
    label: "QA & uji",
    segments: [
      { label: "Sprint 5 · blackbox", start: "2026-11-19", end: "2026-12-02" },
      { label: "AC verifikasi risiko", start: "2026-11-19", end: "2026-12-05" },
    ],
  },
  {
    id: "deploy",
    label: "Deploy",
    segments: [
      { label: "Staging / Vercel preview", start: "2026-11-05", end: "2026-11-25" },
      { label: "Go-live prod", start: "2026-11-25", end: "2026-12-05" },
    ],
  },
];

function toDay(iso: string): number {
  return Date.parse(`${iso}T12:00:00.000Z`);
}

export function ganttSegmentStyle(segment: GanttSegment, range = GANTT_RANGE) {
  const start = toDay(range.start);
  const end = toDay(range.end);
  const span = Math.max(1, end - start);
  const left = ((toDay(segment.start) - start) / span) * 100;
  const width = ((toDay(segment.end) - toDay(segment.start)) / span) * 100;
  return {
    left: `${Math.max(0, Math.min(100, left))}%`,
    width: `${Math.max(2, Math.min(100 - left, width))}%`,
  };
}

export const GANTT_MONTHS = ["Okt 2026", "Nov 2026", "Des 2026"];
