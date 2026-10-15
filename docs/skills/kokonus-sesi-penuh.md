# Kokonus — kontrak sesi penuh (semua skill aktif)

Dipicu oleh slash **`/kokonus`** atau **`/all`** di Cursor. Berlaku untuk **seluruh sisa chat** ini kecuali user minta matikan.

## Yang harus agent lakukan segera

1. Balas **satu baris**: `SESI PENUH Kokonus aktif — Ponytail full, graphify, domain farm, keuangan, superpowers, agency, awesome-kurasi, semgrep, Matt Pocock, Apple HIG, ui-ringkas.`
2. Jangan tanya user mau pilih skill mana; **gabungkan** semua lapisan di bawah sesuai tugas.
3. Sebelum eksplorasi arsitektur: `graphify query` / `graphify explain`; setelah edit TS: `graphify update .`
4. Teks UI (`app/`, `components/`): Indonesia sederhana per `docs/skills/kokonus/ui-ringkas/SKILL.md`. **Wireframe default** — jangan sentuh Lime. Task preview Lime: `docs/skills/kokonus/lime-preview/SKILL.md` + `vendor/design/lime/SKILL.md` + skill arla6ka (`bootstrap-arla6ka-design-skills.sh`).
5. Implementasi kode: diff minimal (Karpathy) + YAGNI (Ponytail full di bawah).
6. Sebelum selesai: verifikasi (`npm run typecheck` atau uji relevan). Commit hanya jika user minta; tanpa trailer Cursor.

## Ponytail FULL (wajib sesi ini)

Lazy senior dev: solusi paling sedikit kode yang **lengkap**. Pakai `lib/*` dan pola repo. Tanpa lapisan service baru kecuali PRD memaksa. Akhiri balasan dengan 1–2 baris: apa yang tidak dicek + risiko.

## Superpowers (proses — pilih otomatis, jangan tanya)

| Situasi | Skill / alur |
|---------|----------------|
| Fitur / US / desain | brainstorming → writing-plans → executing-plans |
| Bug | systematic-debugging |
| Selesai task | verification-before-completion |

Plugin: `.cursor/plugins/superpowers/skills/` (baca SKILL.md jika perlu).

## Domain farm & produk

- `docs/skills/akuntansi-hidroponik/SKILL.md`
- `docs/skills/kokonus/tutup-bulan/SKILL.md`
- `docs/skills/kokonus/smart-jurnal-audit/SKILL.md`
- `docs/skills/kokonus/piutang-aging/SKILL.md`
- `docs/skills/kokonus/rekening-kas/SKILL.md`

## Keuangan (openaccountant — semua berlaku untuk konteks akuntansi/kas)

Folder `docs/skills/openaccountant/*/SKILL.md` — baca skill spesifik saat topik cocok (import, tutup buku, P&L, piutang, dll.). Adaptasi **Indonesia / COA Kokonus**, bukan IRS mentah.

## Skill mesin lokal (`.agents/skills/` setelah `bash scripts/bootstrap-vendor-agents.sh`)

**Ponytail:** `ponytail`, `ponytail-review`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help`

**Matt Pocock:** `code-review`, `diagnosing-bugs`, `triage`, `pr`, `implement-spec`, … (engineering/productivity/misc)

**Semgrep:** `semgrep`, `code-security`, `llm-security` — plus `npm run semgrep:scan` bila sentuh auth/API/secret

**Apple HIG:** `apple-design` + rule `.cursor/rules/apple-design-skill.mdc`

**Awesome terkurasi (semua ON, pilih isi relevan per kalimat tugas):**

| Skill folder | Topik |
|--------------|--------|
| `awesome-debug-diagnose` | debug |
| `awesome-architecture-review` | arsitektur |
| `awesome-issue-triage` | triage |
| `awesome-zoom-out` | strategi |
| `awesome-to-prd` | PRD ringkas |
| `awesome-agronomist` | agronomi |
| `awesome-aquaculture-expert` | akuakultur |
| `awesome-plant-protection-expert` | hama/fitopatologi |
| `awesome-product-manager` | produk |
| `awesome-software-architect` | desain sistem |
| `awesome-devops-engineer` | CI/deploy |
| `awesome-security-engineer` | keamanan |

Manifest: `docs/skills/awesome-skills-kokonus.manifest`

## Agency Agents (280+ persona)

Setelah bootstrap, aturan ada di `.cursor/rules/*.mdc`. **Tanpa menunggu user @**, internalkan persona yang cocok (frontend, UX, security, FP&A, data viz, dll.) lalu jawab/kerjakan dengan voicenya. User tetap boleh `@slug` untuk override.

## Caveman (jika terpasang di mesin)

Jika user pernah `bash scripts/install-caveman-cursor.sh`: gaya ringkas, bukti dulu, `/caveman help` di chat. Jika tidak terpasang, abaikan.

## Humanizer

Prosa `docs/` dan notulensi uji: hindari pola AI berlebihan.

## Hooks `.cursor/hooks.json` (opsional)

File ini **bukan** slash; Cursor menjalankan skrip saat **chat baru** dimulai (Ponytail/Caveman inject mode). **Tidak wajib** jika Anda selalu buka chat dengan **`/kokonus`**.

Pasang hooks: `bash scripts/bootstrap-vendor-agents.sh` (Ponytail `--project`).
