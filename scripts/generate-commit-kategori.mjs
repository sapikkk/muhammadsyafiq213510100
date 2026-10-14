#!/usr/bin/env node
/**
 * Audit commit origin/main → docs/agile/commit-kategori-main.md
 *   node scripts/generate-commit-kategori.mjs
 *   node scripts/generate-commit-kategori.mjs --limit 120
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const limit = Number(process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? 100);
const root = execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
const ref = "origin/main";

function sh(cmd) {
  return execSync(cmd, { cwd: root, encoding: "utf8" });
}

/** @param {string} subject */
function kategori(subject, body) {
  const s = subject.toLowerCase();
  const b = (body ?? "").toLowerCase();
  if (s.includes("co-authored-by") && b.includes("cursor")) return "Tooling (bersihkan trailer)";
  if (/^chore\(release\)/.test(s) || s.includes("[skip ci]")) return "Tim release";
  if (/^ci:/.test(s) || s.startsWith("ci(")) return "Tim release / CI";
  if (/^docs(\(|:)/.test(s) || s.startsWith("merge:")) return "Project manager / docs";
  if (/e2e|blackbox|test\(|fix\(sprint-5\)/.test(s) || s.includes("seed")) return "QA / testing";
  if (/^feat(\(|:)/.test(s) || /^fix(\(|:)/.test(s) || /^perf/.test(s) || /^style/.test(s))
    return "Tim developer";
  if (/^chore(\(|:)/.test(s)) return "Tim developer / tooling";
  return "Lainnya";
}

/** @param {string} subject */
function judulManusia(subject) {
  if (/^chore\(release\):/.test(subject)) {
    const v = subject.match(/([\d.]+)/)?.[1] ?? "?";
    return `Rilis versi ${v} (otomatis CI)`;
  }
  const replacements = [
    [/^fix\(db\):\s*/i, "fix: notifikasi aman saat database mati — "],
    [/^feat\(v2\):\s*/i, "feat(keuangan): "],
    [/^perf:\s*/i, "perf: "],
  ];
  let out = subject;
  for (const [re, rep] of replacements) {
    if (re.test(out)) {
      out = out.replace(re, rep);
      break;
    }
  }
  return out;
}

const sep = "\x1e";
const raw = sh(
  `git log ${ref} -n ${limit} --format=%h${sep}%s${sep}%b${sep}---END---`,
);
const blocks = raw.split("---END---").filter(Boolean);
const rows = blocks.map((block) => {
  const parts = block.trim().split(sep);
  const hash = parts[0] ?? "";
  const subject = parts[1] ?? "";
  const body = parts.slice(2).join(sep);
  return {
    hash,
    subject,
    kategori: kategori(subject, body),
    disarankan: judulManusia(subject),
    hasCursorCoauthor: /co-authored-by:\s*cursor/i.test(body),
  };
});

const cursorCount = rows.filter((r) => r.hasCursorCoauthor).length;
const releaseCount = rows.filter((r) => r.kategori === "Tim release").length;

const md = `# Commit \`${ref}\` — audit kategori

Dibuat otomatis: \`node scripts/generate-commit-kategori.mjs\` · ${new Date().toISOString().slice(0, 10)}

## Ringkasan (${rows.length} commit terakhir)

| Metrik | Jumlah |
|--------|--------|
| Tim release (termasuk \`chore(release)\`) | ${releaseCount} |
| Trailer \`Co-authored-by: Cursor\` di body | ${cursorCount} |
| Tim developer (\`feat\` / \`fix\` / \`perf\`) | ${rows.filter((r) => r.kategori === "Tim developer").length} |
| QA / testing | ${rows.filter((r) => r.kategori === "QA / testing").length} |
| PM / docs | ${rows.filter((r) => r.kategori === "Project manager / docs").length} |

**Owner Kokonus Farm** tidak commit langsung ke repo; kebutuhan tercatat di issue GitHub dan \`docs/ucd/\`.

Konteks lapangan vs aplikasi: [konteks-lapangan-dan-aplikasi.md](./konteks-lapangan-dan-aplikasi.md).

## Tabel commit

| Hash | Kategori | Judul saat ini | Judul manusia (saran) |
|------|----------|----------------|------------------------|
${rows
  .map(
    (r) =>
      `| [\`${r.hash}\`](https://github.com/sapikkk/muhammadsyafiq213510100/commit/${r.hash}) | ${r.kategori} | ${r.subject.replace(/\|/g, "\\|")} | ${r.disarankan.replace(/\|/g, "\\|")} |`,
  )
  .join("\n")}

## Catatan rewrite riwayat

Mengganti judul commit yang sudah di \`main\` **tidak wajib** untuk lanjut development.  
Commit **baru** ikuti [panduan-pesan-commit.md](./panduan-pesan-commit.md).  
Rewrite massal: butuh persetujuan PO + \`git filter-repo\` / rebase — risiko force push.

`;

const outPath = path.join(root, "docs/agile/commit-kategori-main.md");
fs.writeFileSync(outPath, md);
console.log("Wrote", outPath, `(${rows.length} rows)`);
