import "server-only";

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  formatGanttCaption,
  ganttUsesDayScale,
  inclusiveDayCount,
  type GanttLane,
  type GanttModel,
  type GanttSegment,
} from "@/lib/project-hub-gantt";

const GANTT_SNAPSHOT = join(process.cwd(), "data/gantt-from-git.json");

function sh(cmd: string): string {
  return execSync(cmd, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function isoDate(iso: string): string {
  return iso.slice(0, 10);
}

function gitFirst(format: string, args = ""): string | null {
  try {
    const line = sh(`git log --reverse --format='${format}' ${args} | head -1`);
    return line || null;
  } catch {
    return null;
  }
}

function gitLast(format: string, args = ""): string | null {
  try {
    return sh(`git log -1 --format='${format}' ${args}`) || null;
  } catch {
    return null;
  }
}

function clipSegment(label: string, start: string, end: string, rangeEnd: string): GanttSegment | null {
  if (start > rangeEnd) return null;
  const clippedEnd = end > rangeEnd ? rangeEnd : end;
  if (clippedEnd < start) return null;
  return { label, start, end: clippedEnd };
}

function monthLabels(start: string, end: string): string[] {
  const range = { start, end };
  if (ganttUsesDayScale(range)) {
    return ganttDayHeadersForModel(inclusiveDayCount(range));
  }
  const s = new Date(`${start}T12:00:00.000Z`);
  const e = new Date(`${end}T12:00:00.000Z`);
  const fmt = new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric", day: "numeric" });
  if (start === end) return [fmt.format(s)];
  return [`${fmt.format(s)} – ${fmt.format(e)}`];
}

function ganttDayHeadersForModel(dayCount: number): string[] {
  return Array.from({ length: dayCount }, (_, i) => `Hari ${i + 1}`);
}

function attachScale(model: Omit<GanttModel, "scale" | "dayCount">): GanttModel {
  const dayCount = inclusiveDayCount(model.range);
  const scale = ganttUsesDayScale(model.range) ? "day" : "date";
  return { ...model, scale, dayCount };
}

function gitAvailable(): boolean {
  try {
    sh("git rev-parse --git-dir");
    return true;
  } catch {
    return false;
  }
}

function readGanttSnapshot(): GanttModel | null {
  try {
    const raw = readFileSync(GANTT_SNAPSHOT, "utf8");
    return JSON.parse(raw) as GanttModel;
  } catch {
    return null;
  }
}

function buildGanttFromGit(): GanttModel {
  const firstRaw = gitFirst("%aI") ?? new Date().toISOString();
  const lastRaw = gitLast("%aI") ?? firstRaw;
  const rangeStart = isoDate(firstRaw);
  const rangeEnd = isoDate(lastRaw);

  const initMsg = gitFirst("%s") ?? "Initialize project";
  const archAt = gitFirst("%aI", "--grep=Architecture -i");
  const sidebarAt = gitFirst("%aI", "--grep=sidebar -i");
  const ucdAt = gitFirst("%aI", "-- docs/ucd");
  const blackboxAt = gitFirst("%aI", "--grep=blackbox -i");
  const playwrightAt = gitFirst("%aI", "--grep=Playwright -i");
  const sprint5At = gitFirst("%aI", "--grep=sprint-5 -i");
  const deployDocAt = gitFirst("%aI", "-- docs/deployment");

  const desainSegments: GanttSegment[] = [];
  const archDay = archAt ? isoDate(archAt) : rangeStart;
  const sidebarDay = sidebarAt ? isoDate(sidebarAt) : archDay;
  const ucdDay = ucdAt ? isoDate(ucdAt) : null;

  const s0 =
    clipSegment(initMsg.slice(0, 40), rangeStart, archDay, rangeEnd) ??
    clipSegment("Awal repo", rangeStart, rangeStart, rangeEnd);
  if (s0) desainSegments.push(s0);

  if (sidebarDay >= archDay) {
    const s1 = clipSegment("Arsitektur & scaffold", archDay, sidebarDay, rangeEnd);
    if (s1) desainSegments.push(s1);
  }
  if (ucdDay && ucdDay >= rangeStart) {
    const s2 = clipSegment("Dokumen UCD v2", ucdDay, rangeEnd, rangeEnd);
    if (s2) desainSegments.push(s2);
  }

  const programStart = isoDate(gitFirst("%aI", "--grep=scaffold -i") ?? archAt ?? firstRaw);
  const programEnd = sprint5At
    ? isoDate(sprint5At)
    : playwrightAt
      ? isoDate(playwrightAt)
      : rangeEnd;

  const programSegments: GanttSegment[] = [];
  const p0 = clipSegment("Implementasi fitur (sprint 1–4)", programStart, programEnd, rangeEnd);
  if (p0) programSegments.push(p0);

  const qaStart = blackboxAt ? isoDate(blackboxAt) : playwrightAt ? isoDate(playwrightAt) : programStart;
  const qaEnd = sprint5At ? isoDate(sprint5At) : rangeEnd;
  const qaSegments: GanttSegment[] = [];
  const q0 = clipSegment("Uji blackbox & otomatis", qaStart, qaEnd, rangeEnd);
  if (q0) qaSegments.push(q0);

  const deployStart = deployDocAt
    ? isoDate(deployDocAt)
    : sprint5At
      ? isoDate(sprint5At)
      : qaEnd;
  const deploySegments: GanttSegment[] = [];
  const d0 = clipSegment("Deploy & go-live", deployStart, rangeEnd, rangeEnd);
  if (d0) deploySegments.push(d0);

  const lanes: GanttLane[] = [
    { id: "desain", label: "Desain & UCD", segments: desainSegments },
    { id: "program", label: "Pengembangan", segments: programSegments },
    { id: "qa", label: "QA & pengujian", segments: qaSegments },
    { id: "deploy", label: "Deploy", segments: deploySegments },
  ];

  const firstHash = gitFirst("%h") ?? "?";
  const lastHash = gitLast("%h") ?? "?";

  return attachScale({
    range: { start: rangeStart, end: rangeEnd },
    months: monthLabels(rangeStart, rangeEnd),
    lanes,
    caption: formatGanttCaption(rangeStart, rangeEnd, firstHash, lastHash),
  });
}

/** Gantt dari git (dev) atau data/gantt-from-git.json (prod/Vercel). */
export function loadGanttFromGit(): GanttModel {
  if (process.env.NODE_ENV === "production") {
    const snap = readGanttSnapshot();
    if (snap) return snap;
  }
  if (gitAvailable()) {
    return buildGanttFromGit();
  }
  const snap = readGanttSnapshot();
  if (snap) return snap;
  throw new Error(
    "Data Gantt belum tersedia. Jalankan sync Gantt dari repo lalu deploy ulang.",
  );
}
