# Kokonus Farm — panduan agent

## Graphify (wajib untuk eksplorasi kode)

Graf pengetahuan ada di `graphify-out/` (perbarui dengan `npm run graphify:update`).

**CLI (mesin lokal):** paket PyPI resmi `graphifyy` → perintah `graphify`. Jika `ModuleNotFoundError`: `pip3 install --upgrade graphifyy` lalu `graphify install --platform cursor`. MCP Cursor: `.cursor/mcp.json` → `graphify-mcp graphify-out/graph.json` (butuh `pip3 install 'graphifyy[mcp]'`).

Sebelum `Read` / `Grep` / `Glob` untuk orientasi arsitektur:

```bash
graphify query "<pertanyaan>"
graphify path "<simbol A>" "<simbol B>"
graphify explain "<simbol atau file>"
```

Setelah mengubah kode TypeScript/JavaScript:

```bash
npm run graphify:update
```

**Commit graf (cepat & cukup):** `manifest.json`, `GRAPH_REPORT.md`, `.graphify_labels.json` (+ `.sig` jika ada). **`graph.json` tidak di-commit** (sering >100 MB, ditolak GitHub; regenerasi lokal: `npm run graphify:update`, MCP tetap pakai file lokal). Boleh satu commit `chore(graphify): …` bareng PR kode. Jangan commit folder `graphify-out/20*/` (backup harian, gitignore) atau file lock/stale/tmp.

Aturan Cursor: `.cursor/rules/graphify.mdc`.

## Superpowers (proses)

- Fitur atau US baru: **brainstorming** → desain disetujui → **writing-plans** → implementasi.
- Bug: **systematic-debugging** sebelum patch.
- Sebelum selesai: **verification-before-completion** (uji / build / black-box).

Plugin: `.cursor/plugins/superpowers` (submodule). Satu US = satu branch.

## Bahasa UI (pengguna 40+)

Teks di layar (`app/`, `components/`, notifikasi): bahasa Indonesia sederhana, kalimat pendek, hindari jargon Inggris (Dashboard → Beranda, Sales order → Pesanan jual, Smart Jurnal → Jurnal otomatis). Istilah teknis internal (enum, path import) tidak diubah.

## Git commit

- **Jangan** menambahkan `Co-authored-by: Cursor` (atau trailer Cursor lain) pada pesan commit.
- Setelah clone: `bash scripts/install-git-hooks.sh` — mengarahkan `core.hooksPath` ke `.githooks/` agar trailer Cursor dihapus otomatis.

## Ponytail (implementasi)

Default **full**: YAGNI, pakai `lib/*` yang sudah ada, tanpa lapisan service baru kecuali PRD memaksa.

US berikutnya (2.4, 3.5, 4.5): form + server action atau route API tipis, logika di `lib/` bersama (`hpp.ts`, `siklus-produksi.ts`, `jurnal.ts`).

## Humanizer (prosa)

Untuk `docs/` dan notulensi uji: jalankan humanizer — hindari pola AI (kontras “bukan X tapi Y”, triad paksa, bold berlebihan). Registry agile/README: tone produk profesional.

## Versi rilis (`package.json` / tag Git)

- **Tetap linier 1.x** — increment produk “v2” (akuntansi/logistik blueprint) **bukan** semver major `2.0.0`.
- **PO (2026-10-10):** tag berikutnya `1.14.0`, `1.15.0`, … saat merge epic v2; **jangan** `2.0.x`.
- Saat ini: lihat `package.json` (increment linier 1.x).

## UCD increment v2 (post go-live)

- **Hub:** `docs/ucd/README.md` · `docs/blueprint/` · issue epic **#87–#94**
- **Skill domain:** `docs/skills/akuntansi-hidroponik/SKILL.md`
- **Skill keuangan umum (lokal, gitignore):** `npx skills add openaccountant/skills -y` → `.agents/skills/` ([openaccountant/skills](https://github.com/openaccountant/skills)); adaptasi COA Indonesia, bukan IRS/US mentah.

## Stack agent Cursor (satu slash `/`)

Panduan lengkap: [`docs/agent/cursor-agent-stack.md`](docs/agent/cursor-agent-stack.md).

Pasang / refresh:

```bash
git submodule update --init --recursive vendor/agents/
bash scripts/bootstrap-vendor-agents.sh
```

Di chat Cursor: **`/kokonus`** atau **`/all`** — semua skill & agent aktif untuk sesi itu (lihat `docs/skills/kokonus-sesi-penuh.md`). Hooks `.cursor/hooks.json` opsional (auto Ponytail saat chat baru); tidak wajib jika selalu pakai slash.

## Skill vendor (Agency, Karpathy, Semgrep, Matt Pocock, Apple, Ponytail, awesome-skills)

- **Agency Agents** ([msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)): `@<slug>` setelah bootstrap.
- **Karpathy** — `.cursor/rules/karpathy-guidelines.mdc` (always-on).
- **Ponytail** ([DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)): hooks proyek + `/ponytail full` (bukan symlink `ponytail.mdc` always-on).
- **Awesome-skills** ([theneoai/awesome-skills](https://github.com/theneoai/awesome-skills)): kurasi `awesome-*` saja — manifest `docs/skills/awesome-skills-kokonus.manifest`.
- **Caveman** ([JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman)): opsional `bash scripts/install-caveman-cursor.sh` (global).
- **Semgrep** — skill + `npm run semgrep:scan` setelah `brew install semgrep`.
- **Matt Pocock** — `.agents/skills/`; jangan campur TDD dengan Superpowers dalam satu task.
- **Apple design** — rule `apple-design-skill.mdc` + copy [`ui-ringkas`](docs/skills/kokonus/ui-ringkas/SKILL.md).

Detail vendor lama: [`docs/agent/cursor-vendor-agents.md`](docs/agent/cursor-vendor-agents.md) · indeks skill: [`docs/skills/README.md`](docs/skills/README.md).

## Backlog & pelacakan sprint

- **Registry Agile (AC, DoD, timeline, audit log):** `docs/agile/README.md`
- Urutan US: `docs/agile/progress-backlog.md`
- Board: [Project #1](https://github.com/users/sapikkk/projects/1)
- Gap GitHub vs docs: `docs/agile/KONFIRMASI-GAP-GITHUB.md` (konfirmasi PO)
