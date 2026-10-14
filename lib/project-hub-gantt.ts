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

export type GanttRange = { start: string; end: string };

/** Model Gantt (Desain, Program, QA, Deploy) — tanggal dari git / snapshot. */
export type GanttModel = {
  range: GanttRange;
  months: string[];
  lanes: GanttLane[];
  caption: string;
  /** Skala sumbu: per hari (proyek pendek) atau tanggal kalender */
  scale?: "day" | "date";
  dayCount?: number;
};

const MS_PER_DAY = 86_400_000;

function toDay(iso: string): number {
  return Date.parse(`${iso}T12:00:00.000Z`);
}

export function inclusiveDayCount(range: GanttRange): number {
  return Math.round((toDay(range.end) - toDay(range.start)) / MS_PER_DAY) + 1;
}

/** Proyek ~seminggu: tampilkan Hari 1 … N, bukan satu kolom tanggal. */
export function ganttUsesDayScale(range: GanttRange): boolean {
  return inclusiveDayCount(range) <= 14;
}

export function ganttDayIndex(iso: string, rangeStart: string): number {
  return Math.round((toDay(iso) - toDay(rangeStart)) / MS_PER_DAY);
}

export function ganttDayHeaders(dayCount: number): string[] {
  return Array.from({ length: dayCount }, (_, i) => `Hari ${i + 1}`);
}

export function formatGanttCaption(
  rangeStart: string,
  rangeEnd: string,
  firstHash?: string | null,
  lastHash?: string | null,
): string {
  const fmtLong = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const fmtShort = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  });
  const startLabel = fmtLong.format(new Date(`${rangeStart}T12:00:00.000Z`));
  const endLabel = fmtLong.format(new Date(`${rangeEnd}T12:00:00.000Z`));
  const dayCount = inclusiveDayCount({ start: rangeStart, end: rangeEnd });
  const hashesOk =
    firstHash && lastHash && firstHash !== "?" && lastHash !== "?" && firstHash !== lastHash;

  if (ganttUsesDayScale({ start: rangeStart, end: rangeEnd })) {
    const a = fmtShort.format(new Date(`${rangeStart}T12:00:00.000Z`));
    const b = fmtShort.format(new Date(`${rangeEnd}T12:00:00.000Z`));
    return `${dayCount} hari · ${a} – ${b}`;
  }
  if (rangeStart === rangeEnd) {
    return startLabel;
  }
  if (hashesOk) {
    return `${startLabel} – ${endLabel} · commit ${firstHash} hingga ${lastHash}`;
  }
  return `${startLabel} – ${endLabel}`;
}

export function ganttSegmentStyle(segment: GanttSegment, range: GanttRange) {
  if (ganttUsesDayScale(range)) {
    return ganttSegmentStyleByDay(segment, range);
  }
  const start = toDay(range.start);
  const end = toDay(range.end);
  const span = Math.max(1, end - start);
  const segStart = toDay(segment.start);
  const segEnd = toDay(segment.end);
  const left = ((segStart - start) / span) * 100;
  const width = ((segEnd - segStart) / span) * 100;
  const minWidth = segStart === segEnd ? 4 : 2;
  return {
    left: `${Math.max(0, Math.min(100, left))}%`,
    width: `${Math.max(minWidth, Math.min(100 - left, width || minWidth))}%`,
  };
}

function ganttSegmentStyleByDay(segment: GanttSegment, range: GanttRange) {
  const dayCount = inclusiveDayCount(range);
  const startIdx = ganttDayIndex(segment.start, range.start);
  const endIdx = ganttDayIndex(segment.end, range.start);
  const colStart = Math.max(0, Math.min(dayCount - 1, startIdx));
  const colEnd = Math.max(colStart, Math.min(dayCount - 1, endIdx));
  const spanCols = colEnd - colStart + 1;
  const left = (colStart / dayCount) * 100;
  const width = (spanCols / dayCount) * 100;
  return {
    left: `${left}%`,
    width: `${Math.max(100 / dayCount - 0.5, width)}%`,
  };
}
