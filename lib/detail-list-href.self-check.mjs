/** Self-check sheet @detail — node lib/detail-list-href.self-check.mjs */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".tsx") || name.endsWith(".ts")) acc.push(p);
  }
  return acc;
}

const frameSrc = readFileSync(join(root, "components/detail-sheet-frame.tsx"), "utf8");
assert.match(frameSrc, /listHref:\s*string/, "DetailSheetFrame harus mewajibkan listHref");

const offenders = [];
for (const file of walk(join(root, "app")).concat(walk(join(root, "components")))) {
  const src = readFileSync(file, "utf8");
  if (!/<DetailSheetFrame[\s>]/.test(src)) continue;
  if (file.endsWith("components/detail-sheet-frame.tsx")) continue;
  if (!/DetailSheetFrame\s+listHref=/.test(src)) offenders.push(file.replace(`${root}/`, ""));
}

assert.equal(offenders.length, 0, `DetailSheetFrame tanpa listHref:\n${offenders.join("\n")}`);

console.log("detail-sheet listHref audit OK");
