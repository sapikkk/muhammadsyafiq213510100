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
graphify update .
```

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

## Skill vendor (Agency, Karpathy, Semgrep, Matt Pocock, Apple HIG)

Submodule di `vendor/agents/`; pasang ke Cursor + `.agents/skills/`:

```bash
git submodule update --init --recursive vendor/agents/
bash scripts/bootstrap-vendor-agents.sh
```

- **Agency Agents** ([msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)): `@<slug>` di chat Cursor setelah bootstrap.
- **Karpathy guidelines** ([multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)): `.cursor/rules/karpathy-guidelines.mdc` (always-on).
- **Semgrep** — skill di [semgrep/skills](https://github.com/semgrep/skills); CLI mesin [semgrep/semgrep](https://github.com/semgrep/semgrep): `npm run semgrep:scan` setelah `brew install semgrep`.
- **Matt Pocock** ([mattpocock/skills](https://github.com/mattpocock/skills)): engineering + productivity + misc → `.agents/skills/` (`tdd`, `code-review`, `triage`, …). Alternatif CLI: `npx skills add mattpocock/skills -a cursor` (jangan dobel dengan bootstrap).
- **Apple design** ([dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill)): review HIG + craft; rule `.cursor/rules/apple-design-skill.mdc` pada `app/` & `components/`; teks UI tetap [`docs/skills/kokonus/ui-ringkas/SKILL.md`](docs/skills/kokonus/ui-ringkas/SKILL.md).

Detail: [`docs/cursor-vendor-agents.md`](docs/cursor-vendor-agents.md) · indeks skill: [`docs/skills/README.md`](docs/skills/README.md).

## Backlog & pelacakan sprint

- **Registry Agile (AC, DoD, timeline, audit log):** `docs/agile/README.md`
- Urutan US: `docs/progress-backlog.md`
- Board: [Project #1](https://github.com/users/sapikkk/projects/1)
- Gap GitHub vs docs: `docs/agile/KONFIRMASI-GAP-GITHUB.md` (konfirmasi PO)
