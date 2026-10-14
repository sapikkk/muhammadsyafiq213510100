#!/usr/bin/env node
/**
 * Generate / sinkron body issue GitHub dari docs/agile/us-registry.md
 *
 *   node scripts/sync-github-us-issues.mjs              # tulis docs/agile/issue-bodies/
 *   node scripts/sync-github-us-issues.mjs --dry-run      # preview gh issue edit
 *   node scripts/sync-github-us-issues.mjs --apply        # gh issue edit (butuh gh auth)
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = "sapikkk/muhammadsyafiq213510100";
const root = execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
const registryPath = path.join(root, "docs/agile/us-registry.md");
const bodiesDir = path.join(root, "docs/agile/issue-bodies");

const apply = process.argv.includes("--apply");
const dryRun = process.argv.includes("--dry-run") || !apply;

function parseRegistry(md) {
  /** @type {Array<{ id: string; judulTeknis: string; story: string; issue: number; sprint: string; kind: 'us'|'qa'|'epic' }>} */
  const rows = [];
  for (const line of md.split("\n")) {
    if (!line.startsWith("|") || line.includes("---") || line.includes("| ID |")) continue;
    const us = line.match(
      /^\|\s*(US\d+\.\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*\[#(\d+)\]/,
    );
    if (us) {
      rows.push({
        id: us[1],
        judulTeknis: us[2].trim(),
        story: us[3].trim(),
        issue: Number(us[4]),
        sprint: (line.match(/\|\s*(\d+|4)\s*\|\s*Done/)?.[1] ?? "").trim() || "?",
        kind: "us",
      });
      continue;
    }
    const qa = line.match(/^\|\s*(T5\.\d+)\s*\|\s*([^|]+?)\s*\|\s*\[#(\d+)\]/);
    if (qa) {
      rows.push({
        id: qa[1],
        judulTeknis: qa[2].trim(),
        story: qa[2].trim(),
        issue: Number(qa[3]),
        sprint: "5",
        kind: "qa",
      });
      continue;
    }
    const epic = line.match(/^\|\s*([A-H])\s*\|\s*([^|]+?)\s*\|\s*\[#(\d+)\]/);
    if (epic) {
      rows.push({
        id: `v2-Epic-${epic[1]}`,
        judulTeknis: epic[2].trim(),
        story: epic[2].trim(),
        issue: Number(epic[3]),
        sprint: "v2",
        kind: "epic",
      });
    }
  }
  return rows;
}

function issueTitle(row) {
  if (row.kind === "qa") return `[${row.id}] ${row.judulTeknis}`;
  if (row.kind === "epic") return `[v2-${row.id.slice(-1)}] ${row.judulTeknis}`;
  return `[${row.id}] ${row.judulTeknis}`;
}

function issueBody(row) {
  const blackboxAnchor =
    row.kind === "us"
      ? `docs/testing/uji-blackbox.md — cari **Notulensi pengujian ${row.id}**`
      : row.kind === "qa"
        ? "`docs/agile/sprints/sprint-05-qa.md`"
        : "`docs/blueprint/GITHUB-BACKLOG-DRAFT.md`";

  return `## Sprint · Epic

- **ID:** ${row.id}
- **Sprint:** ${row.sprint}
- **Registry:** [us-registry.md](https://github.com/${REPO}/blob/main/docs/agile/us-registry.md)
- **PRD:** [prd-agile-kokonus-farm.md](https://github.com/${REPO}/blob/main/docs/produk/prd-agile-kokonus-farm.md)
- **DoD:** [definition-of-done.md](https://github.com/${REPO}/blob/main/docs/agile/definition-of-done.md)

## User story

${row.story}

## Status

**Done** — v1 go-live · [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app)

## Uji & artefak

- Notulensi / referensi: ${blackboxAnchor}
- Board: [Project #1](https://github.com/users/sapikkk/projects/1)

## Definition of Done (checklist)

- [x] Acceptance criteria terpenuhi (v1)
- [x] PR merged ke \`main\`
- [x] Terlacak di registry & sprint doc repo

---
_Diperbarui otomatis dari \`us-registry.md\` · \`npm run sync:github-us-issues\`_
`;
}

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: apply ? "inherit" : "pipe" });
}

const md = fs.readFileSync(registryPath, "utf8");
const rows = parseRegistry(md);
if (!rows.length) {
  console.error("Tidak ada baris US ter-parse dari", registryPath);
  process.exit(1);
}

fs.mkdirSync(bodiesDir, { recursive: true });
for (const row of rows) {
  const title = issueTitle(row);
  const body = issueBody(row);
  const fname = `${row.id.replace(/\./g, "-")}-issue-${row.issue}.md`;
  fs.writeFileSync(path.join(bodiesDir, fname), `# ${title}\n\n${body}`, "utf8");
}

console.log(`✓ ${rows.length} file → docs/agile/issue-bodies/`);

if (dryRun && !apply) {
  console.log("\nPreview (judul issue GitHub):\n");
  for (const row of rows.slice(0, 5)) {
    console.log(`  #${row.issue}  ${issueTitle(row)}`);
  }
  console.log(`  … +${rows.length - 5} lainnya\n`);
  console.log("Jalankan dengan --apply setelah: gh auth refresh -h github.com");
  process.exit(0);
}

for (const row of rows) {
  const title = issueTitle(row);
  const body = issueBody(row);
  const bodyFile = path.join(bodiesDir, `_tmp-body-${row.issue}.md`);
  fs.writeFileSync(bodyFile, body, "utf8");
  try {
    sh(
      `gh issue edit ${row.issue} --repo ${REPO} --title ${JSON.stringify(title)} --body-file ${JSON.stringify(bodyFile)}`,
    );
    console.log(`✓ #${row.issue} ${title}`);
  } finally {
    fs.unlinkSync(bodyFile);
  }
}

console.log("Selesai sync issue GitHub.");
