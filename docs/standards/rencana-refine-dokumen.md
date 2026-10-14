# Rencana refine dokumen & US

Checklist incremental — tidak mengubah sejarah Git; hanya isi file dan struktur folder.

## Fase 0 — Struktur (2026-10-15)

- [x] Folder `docs/produk`, `agent`, `desain`, `arsip`, `referensi`, `standards`
- [x] Pindah file longgar dari `docs/` ke folder tema
- [x] Stub redirect di path lama
- [x] Hub [`../README.md`](../README.md) + [`gaya-dokumen.md`](gaya-dokumen.md)

## Fase 1 — Registry US manusia

- [x] [`../agile/panduan-user-story.md`](../agile/panduan-user-story.md) — template standar
- [x] [`../agile/us-registry.md`](../agile/us-registry.md) — US1.x–6.x + T5 + epic v2
- [x] Sprint docs v1 mengacu registry; Sprint 1 diformat penuh (contoh AC manusia)
- [x] Generator body issue → `docs/agile/issue-bodies/` · `npm run sync:github-us-issues`
- [x] `npm run sync:github-us-issues:apply` — 52 issue (#2–#45, #87–#94) · 2026-10-15

## Fase 2 — Dokumen produk inti

- [x] `produk/prd-agile-kokonus-farm.md` — ringkasan eksekutif + navigasi (2026-10-15)
- [x] `agile/progress-backlog.md` — selaras registry (2026-10-15)
- [x] `produk/project-context.md` — header + link + status go-live
- [x] `ucd/skenario-narasi-ucd-agile.md` — link path baru + selaras registry (humanizer penuh opsional)

## Fase 3 — Uji & audit

- [x] `testing/uji-blackbox.md` — intro + daftar notulensi (2026-10-15)
- [x] `testing/README.md`, `audit/README.md` — hub rapi
- [x] `standards/format-temuan-audit.md` + contoh FINDING-01 · `audit/qa.md` header (2026-10-15)
- [x] `audit/rbac.md`, `security.md`, `frontend.md`, `backend.md`, `SUMMARY.md`, `qa.md` — header + link hub (2026-10-15)
- [ ] `audit/` sisanya (`00-inventory`, `MERGE-READINESS`, …) — opsional

## Fase 4 — Agent & skills

- [x] `agent/cursor-agent-stack.md` — link hub (2026-10-15)
- [x] `agent/cursor-vendor-agents.md`, `cursor-superpowers.md` — link hub (2026-10-15)
- [ ] Skill Kokonus saja (bukan vendor `openaccountant/*`) — ringkas jika duplikat README

## Fase 5 — Verifikasi

- [x] Grep path mati — hanya stub + graphify-out arsip (2026-10-15)
- [x] `npm run sync:agile-progress` — 127 kartu (2026-10-15)
- [x] `graphify update .` — 126 715 node · backup `graphify-out/2026-10-15/` (2026-10-15)

**Perkiraan:** Fase 1–2 paling berdampak untuk skripsi dan board; Fase 4 bisa paralel dengan dev.

Terakhir diperbarui: **2026-10-15**.
