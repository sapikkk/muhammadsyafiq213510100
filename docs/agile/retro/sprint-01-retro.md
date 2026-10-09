# Sprint 1 retro — Fondasi & autentikasi

**Iteration (actual):** 2026-10-07 → 2026-10-20  
**Review:** 2026-10-08 (US1.4–1.8 blackbox tercatat)

## Ringkasan

| Metrik | Nilai |
|--------|--------|
| US rencana (S1) | 9 (US1.9 dijadwalkan Sprint 4) |
| US selesai | 8 (US1.1–1.8) |
| Points kerangka selesai | **29** / 34 (US1.9 = 5 pts tidak dihitung S1) |
| Bug P1 terbuka | 0 (scope S1) |

## Apa yang berjalan baik

- Fondasi Next.js, Prisma, NextAuth, RBAC, dan state global selesai dalam 2 hari kerja pertama.
- Notulensi blackbox US1.4–1.8 konsisten di `docs/uji-blackbox.md`.
- Branch per US + merge ke `feat/ui-redesign` memudahkan audit git.

## Hambatan

- Latensi Supabase / pool DB saat uji register (FINDING-01) — mitigasi di blackbox, bukan blocker US.
- US1.9 sengaja ditunda ke Sprint 4; perlu milestone/iteration jelas agar tidak dianggap “tertinggal S1”.

## Action items (Sprint 2+)

| # | Action | Owner | Status |
|---|--------|-------|--------|
| 1 | Wajibkan **PR review** GitHub sebelum merge (DoD #2) | Dev + PO | Aktif |
| 2 | Pakai label `progress-partial` + catatan partial untuk US belum 100% AC | Dev | Aktif |
| 3 | Sesuaikan **iteration actual start** di Project #1 (lihat timeline-registry) | PO/Agent | Aktif |
| 4 | Registry `docs/agile/` sebagai sumber AC/DoD; issue tasklist mengikuti template US | Dev | Aktif |

## Keputusan proses

- Partial delivery diizinkan dan wajib terdokumentasi (issue open + sprint doc).
- Velocity Sprint 1 dicatat di [timeline-registry.md](../timeline-registry.md).
