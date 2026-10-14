# Konteks proyek — lapangan dulu, aplikasi setelahnya

Ringkasan untuk PO, board GitHub, dan agile docs. Bahasa sederhana.

## Fase 1 — Greenhouse di lapangan (13 Mei – 14 Agustus 2025)

| Waktu | Apa yang terjadi |
|--------|------------------|
| **13 Mei 2025** | Mulai dari **pembersihan lahan** |
| Mei–Juli | Persiapan instalasi **rakit apung** dan struktur greenhouse |
| **14 Agustus 2025** | Greenhouse **berdiri**; mulai **produksi sayur** |
| ±1 bulan setelah go-live lapangan | Banyak **coba-coba (trial & error)** — varietas, jadwal, dan cara tanam masih dicari |

Ini fase **operasi fisik**, belum fokus ke software Kokonus Farm.

## Fase 2 — Belajar metode + bangun aplikasi (15 Agustus 2025 – sekarang)

| Waktu | Apa yang terjadi |
|--------|-------------------|
| **15 Agustus 2025 →** | Mulai pelajari **Agile**, **UCD**, dan pengembangan **aplikasi Kokonus Farm** |
| Okt 2025 (repo) | Sprint 1–5 di GitHub: login, akuntansi, siklus tanam, stok, penjualan, laporan owner |
| Setelah go-live app | Increment **v2**: keuangan lebih lengkap, Smart Jurnal, piutang, rekening kas |

Software ini **mendukung** catatan biaya, produksi, dan penjualan — bukan pengganti kerja di greenhouse.

## Siapa terlibat (cara baca commit & board)

| Peran | Tugas di proyek | Contoh di Git |
|--------|------------------|---------------|
| **Owner / klien (Kokonus Farm)** | Kebutuhan bisnis, uji di lapangan, prioritaskan fitur | Issue PO, komentar UAT, `docs/ucd/` |
| **Project manager** | Sprint, backlog, board Project #1, AC/DoD | `docs/agile/`, issue label sprint |
| **Tim developer** | Fitur, perbaikan, refactor | `feat:`, `fix:`, `perf:` |
| **Tim desain / UI** | Copy layar, alur, audit HIG, Figma | `docs/desain/`, skill `ui-ringkas`, issue label `ux` |
| **QA / testing** | Blackbox, e2e, checklist | `docs/testing/uji-blackbox.md`, `e2e/`, `fix(sprint-5):` |
| **Tim release** | Versi npm, tag Git, deploy Vercel | `chore(release):`, tag `v1.x` |
| **Tooling / CI** | GitHub Actions, Semgrep, hooks | `ci:`, `chore:` |

## Hubungkan dengan GitHub Project #1

Teks ini bisa ditempel di **deskripsi Project** atau issue epic **#87** (Increment v2) sebagai konteks bisnis.

Board: https://github.com/users/sapikkk/projects/1

Terakhir diperbarui: **2026-10-15**.
