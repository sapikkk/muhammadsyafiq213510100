# Sprint 5 — QA, usability, go-live

**Iteration (target):** mulai setelah PO · selesai target **2026-12-02**  
**Prasyarat:** US #2–#38 closed di `main` (v1.12.0+); audit global merged (#80).

## Backlog issue

| ID | Issue | Status | Fokus |
|----|-------|--------|-------|
| T5.1 | [#39](https://github.com/sapikkk/muhammadsyafiq213510100/issues/39) | Open | Usability petani — pindah fase HP |
| T5.2 | [#40](https://github.com/sapikkk/muhammadsyafiq213510100/issues/40) | Open | Usability Admin — filter jurnal |
| T5.3 | [#41](https://github.com/sapikkk/muhammadsyafiq213510100/issues/41) | Open | Usability Owner — grafik laba |
| T5.4 | [#42](https://github.com/sapikkk/muhammadsyafiq213510100/issues/42) | Open | Audit debit = kredit |
| T5.5 | [#43](https://github.com/sapikkk/muhammadsyafiq213510100/issues/43) | Open | Bugfix hasil uji |
| T5.6 | [#44](https://github.com/sapikkk/muhammadsyafiq213510100/issues/44) | Open | Deploy Vercel + Postgres cloud + security |
| T5.9 | [#45](https://github.com/sapikkk/muhammadsyafiq213510100/issues/45) | Open | Go-live + pelatihan 6 pengguna |

## Urutan eksekusi (disarankan)

```text
T5.1 → T5.2 → T5.3   (usability paralel per peran, 2–3 hari)
        ↓
T5.4                 (audit jurnal: manual + skrip; pakai data seed/demo)
        ↓
T5.5                 (bugfix dari temuan T5.x + #50 jika perlu)
        ↓
T5.6                 (staging → prod; tanpa AUDIT_BYPASS_RBAC)
        ↓
T5.9                 (pelatihan + cutover)
```

### T5.1 — Petani (HP)

- Perangkat viewport sempit; alur `/petani/siklus` pindah fase.
- AC: selesai tanpa error; toast/feedback jelas.
- Otomatisasi: perluas e2e mobile (smoke sudah ada menu).

### T5.2 — Admin

- Filter jurnal tanggal/status + DataTable cari (`/admin/jurnal`).
- Cross-check dengan [AC-VERIFIKASI-RISIKO.md](../AC-VERIFIKASI-RISIKO.md) US2.x.

### T5.3 — Owner

- Dashboard KPI + pie biaya + evaluasi margin (`/owner`, `/owner/biaya`, `/owner/evaluasi`).
- PO bisa baca tren laba tanpa bantuan dev.

### T5.4 — Debit = kredit

- Sample: jurnal manual, jurnal approve panen, jurnal SO DELIVERED.
- Catat di `docs/uji-blackbox.md` (section Sprint 5).

### T5.5 — Bugfix

- Gabung temuan #50 (pool) jika masih repro di staging.

### T5.6 — Deploy

- Env: `NEXTAUTH_*`, `DATABASE_URL`, **no** `AUDIT_BYPASS_RBAC`.
- CI: `check.yml` + `e2e.yml` hijau sebelum promote.

### T5.9 — Go-live

- 6 pengguna sesuai PRD; checklist login per peran.

## Testing repo

- `docs/testing/README.md`, `e2e/smoke.spec.ts`, CI `e2e.yml`
- Data demo: `docs/testing/DEMO-DATA.md` (setelah PR #81 merge)

Terakhir diperbarui: **2026-10-10**.
