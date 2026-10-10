# Kokonus Farm — panduan agent

## Graphify (wajib untuk eksplorasi kode)

Graf pengetahuan ada di `graphify-out/` (commit `9868c5af` saat terakhir di-build).

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

## Ponytail (implementasi)

Default **full**: YAGNI, pakai `lib/*` yang sudah ada, tanpa lapisan service baru kecuali PRD memaksa.

US berikutnya (2.4, 3.5, 4.5): form + server action atau route API tipis, logika di `lib/` bersama (`hpp.ts`, `siklus-produksi.ts`, `jurnal.ts`).

## Humanizer (prosa)

Untuk `docs/` dan notulensi uji: jalankan humanizer — hindari pola AI (kontras “bukan X tapi Y”, triad paksa, bold berlebihan). Registry agile/README: tone produk profesional.

## Versi rilis (`package.json` / tag Git)

- **Tetap linier 1.x** — increment produk “v2” (akuntansi/logistik blueprint) **bukan** semver major `2.0.0`.
- **PO (2026-10-10):** tag berikutnya `1.14.0`, `1.15.0`, … saat merge epic v2; **jangan** `2.0.x`.
- Saat ini: **1.27.0** = v2 + ops sidang (#50 FINDING-01 doc/retry, #81 seed:demo + DEMO-DATA).

## UCD increment v2 (post go-live)

- **Hub:** `docs/ucd/README.md` · `docs/blueprint/` · issue epic **#87–#94**
- **Skill domain:** `docs/skills/akuntansi-hidroponik/SKILL.md`
- **Skill keuangan umum (lokal, gitignore):** `npx skills add openaccountant/skills -y` → `.agents/skills/` ([openaccountant/skills](https://github.com/openaccountant/skills)); adaptasi COA Indonesia, bukan IRS/US mentah.

## Backlog & pelacakan sprint

- **Registry Agile (AC, DoD, timeline, audit log):** `docs/agile/README.md`
- Urutan US: `docs/progress-backlog.md`
- Board: [Project #1](https://github.com/users/sapikkk/projects/1)
- Gap GitHub vs docs: `docs/agile/KONFIRMASI-GAP-GITHUB.md` (konfirmasi PO)
