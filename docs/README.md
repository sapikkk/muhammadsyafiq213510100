# Dokumentasi Kokonus Farm

Pusat baca untuk tim produk, developer, QA, dan penelitian. Semua Markdown proyek (kecuali `README.md`, `AGENTS.md`, `CHANGELOG.md` di root repo) hidup di bawah folder `docs/`.

**Root repositori** hanya berisi kode aplikasi, konfigurasi build, dan tiga dokumen wajib GitHub: `README.md`, `AGENTS.md`, `CHANGELOG.md`.

**Inventaris lengkap (US, epic, skrip, status refine):** [`INVENTARIS-PROYEK.md`](INVENTARIS-PROYEK.md).

---

## Peta folder

| Folder | Untuk siapa | Isi utama |
|--------|-------------|-----------|
| [`produk/`](produk/) | PO, Owner, peneliti | PRD, konteks proyek, asumsi domain |
| [`agile/`](agile/) | PM, dev, QA | Sprint, DoD, timeline, audit commit, konteks lapangan |
| [`ucd/`](ucd/) | Desain produk | UCD increment v2, narasi skripsi |
| [`desain/`](desain/) | UI/UX | Figma, alur navigasi per peran |
| [`blueprint/`](blueprint/) | Dev keuangan | COA, Smart Jurnal, epic v2 |
| [`testing/`](testing/) | QA | Blackbox, panduan demo, data uji |
| [`deployment/`](deployment/) | DevOps | Vercel, Postgres, go-live |
| [`audit/`](audit/) | Review teknis | RBAC, perf, keamanan, UI responsif |
| [`agent/`](agent/) | Cursor / AI | Stack agent, vendor, Superpowers |
| [`referensi/`](referensi/) | Integrasi | Kontrak API |
| [`skills/`](skills/) | Agent domain | Kokonus, akuntansi, Semgrep, … |
| [`arsip/`](arsip/) | Riwayat | Notulensi rapat, catatan progres teknis lama |
| [`standards/`](standards/) | Semua penulis | Gaya dokumen, rencana refine |

---

## Mulai cepat

| Tujuan | Buka |
|--------|------|
| Konteks bisnis (greenhouse → software) | [`agile/konteks-lapangan-dan-aplikasi.md`](agile/konteks-lapangan-dan-aplikasi.md) |
| Backlog & board GitHub | [`agile/README.md`](agile/README.md) · [Project #1](https://github.com/users/sapikkk/projects/1) |
| Kebutuhan produk lengkap | [`produk/prd-agile-kokonus-farm.md`](produk/prd-agile-kokonus-farm.md) |
| Registry semua US (v1 + v2) | [`agile/us-registry.md`](agile/us-registry.md) |
| Sync issue GitHub ← registry | [`agile/github-sync-us.md`](agile/github-sync-us.md) |
| User story — format manusia | [`agile/panduan-user-story.md`](agile/panduan-user-story.md) |
| Uji blackbox | [`testing/uji-blackbox.md`](testing/uji-blackbox.md) |
| Agent Cursor (`/kokonus`) | [`agent/cursor-agent-stack.md`](agent/cursor-agent-stack.md) · [`AGENTS.md`](../AGENTS.md) |
| Gaya menulis semua `.md` | [`standards/gaya-dokumen.md`](standards/gaya-dokumen.md) |

---

## Hub per area

### Produk & backlog

- [`produk/project-context.md`](produk/project-context.md) — tujuan, persona Owner, batas lingkup
- [`produk/prd-agile-kokonus-farm.md`](produk/prd-agile-kokonus-farm.md) — PRD, epic, alur F1–F24
- [`agile/progress-backlog.md`](agile/progress-backlog.md) — urutan US & status ringkas
- [`agile/sprint-backlog-agile.md`](agile/sprint-backlog-agile.md) — mirror backlog sprint

### Agile & proses

- [`agile/timeline-registry.md`](agile/timeline-registry.md) — lima sprint v1, velocity
- [`agile/definition-of-done.md`](agile/definition-of-done.md) · [`partial-delivery-policy.md`](agile/partial-delivery-policy.md)
- [`agile/panduan-pesan-commit.md`](agile/panduan-pesan-commit.md) · [`commit-kategori-main.md`](agile/commit-kategori-main.md)
- [`agile/sprints/`](agile/sprints/) — detail per sprint · [`retro/`](agile/retro/)

### UCD, desain, blueprint v2

- [`ucd/README.md`](ucd/README.md) · [`ucd/increment-v2-akuntansi-logistik.md`](ucd/increment-v2-akuntansi-logistik.md)
- [`ucd/skenario-narasi-ucd-agile.md`](ucd/skenario-narasi-ucd-agile.md)
- [`desain/figma-flow-inventory.md`](desain/figma-flow-inventory.md) · [`desain/FLOW-NAV.md`](desain/FLOW-NAV.md)
- [`blueprint/README.md`](blueprint/README.md)

### Uji & rilis

- [`testing/README.md`](testing/README.md) · [`testing/panduan-uji-dan-demo.md`](testing/panduan-uji-dan-demo.md)
- [`testing/tabel-blackbox-testing.md`](testing/tabel-blackbox-testing.md)
- [`deployment/panduan-deploy-vercel-postgres.md`](deployment/panduan-deploy-vercel-postgres.md)

### Audit & referensi teknis

- [`audit/README.md`](audit/README.md) · [`referensi/api.md`](referensi/api.md)

---

## Refine dokumen (status)

Proyek sedang merapikan **bahasa manusia** di US, commit, dan Markdown lama. Panduan dan urutan batch: [`standards/rencana-refine-dokumen.md`](standards/rencana-refine-dokumen.md).

Setelah mengubah banyak file docs: jalankan `graphify update .` bila path disebut di komentar kode (opsional).

Terakhir diperbarui: **2026-10-15**.
