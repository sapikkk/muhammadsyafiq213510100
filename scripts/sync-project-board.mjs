#!/usr/bin/env node
/**
 * Sinkronkan field Project #1 (Status, Iteration, Priority) dengan backlog repo.
 * Butuh: gh auth (scope project)
 *
 *   node scripts/sync-project-board.mjs
 *   node scripts/sync-project-board.mjs --dry-run
 */
import { execSync } from "node:child_process";

const PROJECT_ID = "PVT_kwHOBFQUR84BmFnB";
const FIELD = {
  status: "PVTSSF_lAHOBFQUR84BmFnBzhkv-S0",
  priority: "PVTSSF_lAHOBFQUR84BmFnBzhkv-rc",
  iteration: "PVTIF_lAHOBFQUR84BmFnBzhkv-ro",
};
const STATUS = {
  Todo: "f75ad846",
  "In progress": "47fc9ee4",
  Done: "98236657",
};
const PRIORITY = { P0: "d417ec06", P1: "1a970a6a", P2: "7f8eb70d" };
const ITER = {
  sprint5: "55b92bab",
  v2: "8e6db6be",
};

/** @type {Record<number, { status?: keyof typeof STATUS; priority?: keyof typeof PRIORITY; iteration?: keyof typeof ITER }>} */
const PLAN = {
  50: { status: "Todo", priority: "P2", iteration: "sprint5" },
  81: { status: "Todo", priority: "P2" },
  87: { status: "Done", priority: "P1", iteration: "v2" },
  88: { status: "Todo", priority: "P1", iteration: "v2" },
  89: { status: "Todo", priority: "P1", iteration: "v2" },
  90: { status: "Todo", priority: "P1", iteration: "v2" },
  91: { status: "In progress", priority: "P1", iteration: "v2" },
  92: { status: "In progress", priority: "P2", iteration: "v2" },
  93: { status: "Todo", priority: "P2", iteration: "v2" },
  94: { status: "In progress", priority: "P2", iteration: "v2" },
  95: { status: "Done", priority: "P1", iteration: "v2" },
  96: { status: "Done", priority: "P0", iteration: "v2" },
  97: { status: "Done", priority: "P0", iteration: "v2" },
  98: { status: "Done", priority: "P0", iteration: "v2" },
  99: { status: "Done", priority: "P0", iteration: "v2" },
  100: { status: "Done", priority: "P2", iteration: "v2" },
  101: { status: "Done", priority: "P2", iteration: "v2" },
  102: { status: "Done", priority: "P2", iteration: "v2" },
  103: { status: "Done", iteration: "v2" },
  104: { status: "Done", iteration: "v2" },
};

const dryRun = process.argv.includes("--dry-run");

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
}

const raw = sh(
  "gh project item-list 1 --owner sapikkk --limit 120 --format json",
);
const items = JSON.parse(raw).items ?? [];
const byNumber = new Map(
  items
    .filter((i) => i.content?.number)
    .map((i) => [i.content.number, i]),
);

function edit(itemId, fieldKey, flag, value) {
  const cmd = `gh project item-edit --id ${itemId} --project-id ${PROJECT_ID} --field-id ${FIELD[fieldKey]} ${flag} ${value}`;
  if (dryRun) {
    console.log("[dry-run]", cmd);
    return;
  }
  sh(cmd);
}

let updated = 0;
for (const [numStr, spec] of Object.entries(PLAN)) {
  const num = Number(numStr);
  const item = byNumber.get(num);
  if (!item) {
    console.warn(`#${num} tidak ada di Project #1 — lewati`);
    continue;
  }
  const id = item.id;
  console.log(`#${num} ${item.title?.slice(0, 50) ?? ""}`);
  if (spec.status) {
    edit(id, "status", "--single-select-option-id", STATUS[spec.status]);
  }
  if (spec.priority) {
    edit(id, "priority", "--single-select-option-id", PRIORITY[spec.priority]);
  }
  if (spec.iteration) {
    edit(id, "iteration", "--iteration-id", ITER[spec.iteration]);
  }
  updated++;
}
console.log(`Selesai: ${updated} kartu${dryRun ? " (dry-run)" : ""}.`);
