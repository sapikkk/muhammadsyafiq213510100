#!/usr/bin/env node
/**
 * Tulis data/gantt-from-git.json dari riwayat git (commit pertama → terakhir).
 * Dipanggil sebelum build prod agar Gantt di Vercel punya tanggal nyata.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const out = join(root, "data/gantt-from-git.json");

function sh(cmd) {
  return execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

function isoDate(iso) {
  return iso.slice(0, 10);
}

function gitFirst(format, args = "") {
  try {
    const line = sh(`git log --reverse --format='${format}' ${args} | head -1`);
    return line || null;
  } catch {
    return null;
  }
}

function gitLast(format, args = "") {
  try {
    return sh(`git log -1 --format='${format}' ${args}`) || null;
  } catch {
    return null;
  }
}

function clipSegment(label, start, end, rangeEnd) {
  if (start > rangeEnd) return null;
  const clippedEnd = end > rangeEnd ? rangeEnd : end;
  if (clippedEnd < start) return null;
  return { label, start, end: clippedEnd };
}

const MS_PER_DAY = 86_400_000;

function inclusiveDayCount(start, end) {
  const a = Date.parse(`${start}T12:00:00.000Z`);
  const b = Date.parse(`${end}T12:00:00.000Z`);
  return Math.round((b - a) / MS_PER_DAY) + 1;
}

function usesDayScale(start, end) {
  return inclusiveDayCount(start, end) <= 14;
}

function ganttCaption(rangeStart, rangeEnd, firstHash, lastHash) {
  const fmtLong = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const fmtShort = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" });
  const startLabel = fmtLong.format(new Date(`${rangeStart}T12:00:00.000Z`));
  const endLabel = fmtLong.format(new Date(`${rangeEnd}T12:00:00.000Z`));
  const dayCount = inclusiveDayCount(rangeStart, rangeEnd);
  const hashesOk =
    firstHash && lastHash && firstHash !== "?" && lastHash !== "?" && firstHash !== lastHash;

  if (usesDayScale(rangeStart, rangeEnd)) {
    const a = fmtShort.format(new Date(`${rangeStart}T12:00:00.000Z`));
    const b = fmtShort.format(new Date(`${rangeEnd}T12:00:00.000Z`));
    return `${dayCount} hari · ${a} – ${b}`;
  }
  if (rangeStart === rangeEnd) return startLabel;
  if (hashesOk) return `${startLabel} – ${endLabel} · commit ${firstHash} hingga ${lastHash}`;
  return `${startLabel} – ${endLabel}`;
}

function monthLabels(start, end) {
  const s = new Date(`${start}T12:00:00.000Z`);
  const e = new Date(`${end}T12:00:00.000Z`);
  const fmt = new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric", day: "numeric" });
  if (start === end) return [fmt.format(s)];
  return [`${fmt.format(s)} – ${fmt.format(e)}`];
}

function attachScale(model) {
  const dayCount = inclusiveDayCount(model.range.start, model.range.end);
  const scale = usesDayScale(model.range.start, model.range.end) ? "day" : "date";
  return { ...model, scale, dayCount };
}

function snapshotLooksBroken(model) {
  if (model.range.start === model.range.end) return true;
  if (inclusiveDayCount(model.range.start, model.range.end) < 2) return true;
  if (model.caption.includes("?")) return true;
  return false;
}

function build() {
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

  const desainSegments = [];
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
  const programEnd = sprint5At ? isoDate(sprint5At) : playwrightAt ? isoDate(playwrightAt) : rangeEnd;

  const programSegments = [];
  const p0 = clipSegment("Implementasi fitur (sprint 1–4)", programStart, programEnd, rangeEnd);
  if (p0) programSegments.push(p0);

  const qaStart = blackboxAt ? isoDate(blackboxAt) : playwrightAt ? isoDate(playwrightAt) : programStart;
  const qaEnd = sprint5At ? isoDate(sprint5At) : rangeEnd;
  const qaSegments = [];
  const q0 = clipSegment("Uji blackbox & otomatis", qaStart, qaEnd, rangeEnd);
  if (q0) qaSegments.push(q0);

  const deployStart = deployDocAt ? isoDate(deployDocAt) : sprint5At ? isoDate(sprint5At) : qaEnd;
  const deploySegments = [];
  const d0 = clipSegment("Deploy & go-live", deployStart, rangeEnd, rangeEnd);
  if (d0) deploySegments.push(d0);

  const firstHash = gitFirst("%h") ?? "?";
  const lastHash = gitLast("%h") ?? "?";

  return attachScale({
    range: { start: rangeStart, end: rangeEnd },
    months: monthLabels(rangeStart, rangeEnd),
    lanes: [
      { id: "desain", label: "Desain & UCD", segments: desainSegments },
      { id: "program", label: "Pengembangan", segments: programSegments },
      { id: "qa", label: "QA & pengujian", segments: qaSegments },
      { id: "deploy", label: "Deploy", segments: deploySegments },
    ],
    caption: ganttCaption(rangeStart, rangeEnd, firstHash, lastHash),
  });
}

const model = build();

if (snapshotLooksBroken(model) && existsSync(out)) {
  try {
    const kept = JSON.parse(readFileSync(out, "utf8"));
    if (!snapshotLooksBroken(kept)) {
      console.log(
        `Git tidak lengkap di CI; mempertahankan snapshot ${kept.range.start} → ${kept.range.end}`,
      );
      process.exit(0);
    }
  } catch {
    /* tulis model baru di bawah */
  }
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(model, null, 2)}\n`, "utf8");
console.log(`Gantt snapshot: ${model.range.start} → ${model.range.end} (${model.scale}) → ${out}`);
