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
};

function toDay(iso: string): number {
  return Date.parse(`${iso}T12:00:00.000Z`);
}

export function ganttSegmentStyle(segment: GanttSegment, range: GanttRange) {
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
