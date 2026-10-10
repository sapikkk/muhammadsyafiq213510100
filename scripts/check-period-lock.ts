import assert from "node:assert/strict";

function startOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function isBeforeLock(tanggal: Date, lock: Date): boolean {
  return startOfDay(tanggal) < startOfDay(lock);
}

assert.ok(isBeforeLock(new Date("2026-01-01"), new Date("2026-02-01")));
assert.ok(!isBeforeLock(new Date("2026-03-01"), new Date("2026-02-01")));

console.log("OK period-lock");
