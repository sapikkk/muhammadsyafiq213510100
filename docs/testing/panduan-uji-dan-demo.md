# Panduan uji, data demo, dan pelatihan

Referensi uji Kokonus Farm. Skill agent ada di `.agents/` (lokal, tidak di-push).

## Playwright (E2E)

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Spec: `e2e/smoke.spec.ts` — login, jurnal/stok rendah, DataTable cari, 404 + shell, menu mobile.

Sprint 5: `e2e/sprint5-usability.spec.ts` (T5.1–T5.3); `globalSetup` reset batch `E2E-S5-DEMO`.

Opsional lokal (bukan CI): `AUDIT_BYPASS_RBAC=true npm run test:e2e -- e2e/audit-nav.spec.ts` — crawl menu audit.

CI: workflow `e2e.yml` (Postgres service, `prisma db push`, seed, `next start` + Playwright).

## TestCafe (opsional)

```bash
npm run test:testcafe
```

## Submodule referensi

```bash
git submodule update --init --recursive vendor/testing
```

- `vendor/testing/javascript-testing-best-practices` — pola uji JS/TS
- `vendor/testing/test-automation-skills-agents` — otomasi untuk agent

Playwright dan TestCafe dipasang lewat npm, bukan clone penuh ke repo.

## Sprint 5

Black-box manual: [`docs/testing/tabel-blackbox-testing.md`](../tabel-blackbox-testing.md) (register langkah) dan [`docs/testing/uji-blackbox.md`](../uji-blackbox.md) (notulensi). Audit debit=kredit: T5.4 setelah alur jurnal stabil.

## Data demo sidang

### Akun login (seed utama)

| Peran | Email | Sandi (setelah `seed:demo-lengkap` / `seed:kokonus-tahun`) |
| --- | --- | --- |
| Owner | owner@kokonus.farm | `1` (atau `SEED_DEMO_PASSWORD`) |
| Admin | admin@kokonus.farm | sama |
| Petani | petani@kokonus.farm | sama |

Fondasi `npm run seed` saja: sandi Owner dari `SEED_OWNER_PASSWORD` di `.env` (min. 8 karakter).

**Vercel pre-launch:** set `KOKONUS_PRELAUNCH_RBAC=true` agar admin/petani bisa buka `/owner/*` untuk uji hak akses; **matikan sebelum go-live**. Piutang butuh data: jalankan `npm run seed:kokonus-tahun` (atau `seed:demo-prod`) ke DB production.

Sandi demo ganti sebelum go-live ([`docs/deployment/panduan-deploy-vercel-postgres.md`](../deployment/panduan-deploy-vercel-postgres.md)).

### Seed database

```bash
npx prisma db push   # atau migrate deploy
npm run seed         # COA fondasi (atau seed:demo-lengkap untuk akun demo)
npm run seed:demo    # pelanggan demo + 1 jurnal DRAFT
```

**Demo operasi + keuangan penuh (sidang):**

```bash
npm run seed:demo-lengkap    # akun demo + inventaris + varietas + siklus ringkas
npm run seed:kokonus-tahun   # 1 tahun produksi, panen, penjualan, overhead
npm run seed:keuangan        # jurnal penjualan (APPROVED) + penyusutan 2025–bulan berjalan
# atau satu baris (termasuk rekening kas + checklist alur Owner):
npm run seed:owner-alur
# alias tanpa checklist:
npm run seed:demo-prod
```

Di DB cloud (Prisma Data Platform), seed panjang (`seed:kokonus-tahun`) lebih stabil dengan **`DIRECT_URL`** sebagai `DATABASE_URL` sekali jalan (bukan pooled).
```

Isi `seed:demo`:

- 3 pelanggan (pasar, resto, koperasi) — email `demo.*@contoh.local`
- 1 jurnal DRAFT Admin: Dr 5230 · Cr 1100 (Rp 250.000), keterangan `Demo DRAFT — beban sewa contoh sidang`

Perintah idempotent; aman dijalankan ulang.

### Postgres lokal (disarankan sidang)

Untuk menghindari FINDING-01 (timeout pool remote), pakai DB lokal:

```bash
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
```

Lalu `db push`, `seed`, `seed:demo`, `npm run dev`.

### Agent skills (lokal)

Skills domain (commit): `docs/skills/akuntansi-hidroponik/SKILL.md`.

Skills keuangan umum — salinan `SKILL.md` saja (commit): `docs/skills/openaccountant/*/SKILL.md` (44 skill). Restore lokal:

```bash
npx skills add openaccountant/skills -y
# atau: rsync -a docs/skills/openaccountant/ .agents/skills/
```

Lihat `docs/skills/README.md`. Cursor Agent Skills Platform (submodule opsional): `git submodule update --init --recursive .cursor/skills/agent-skills-platform`. Folder `.agents/` dan `.cursor/skills/` tidak di-push.

Terakhir diperbarui data demo: 2026-10-10 · issue #81.

## Pelatihan go-live (T5.9)

Sesi ~45 menit untuk Owner, Admin, dan Petani sebelum operasi harian. Sandi awal demo: lihat `prisma/seed.js` (jangan tulis di slide publik).

### Peserta (6 orang)

| # | Peran | Akun seed | Fokus latihan |
| --- | --- | --- | --- |
| 1 | Owner | owner@kokonus.farm | KPI, pie biaya, evaluasi margin/BEP, ekspor laporan |
| 2 | Admin | admin@kokonus.farm | Jurnal, filter, approve, stok, panen, SO |
| 3 | Petani | petani@kokonus.farm | Siklus, pindah fase HP, panen, stok rendah |
| 4–6 | Petani tambahan | darusman@… / akun dari Owner | Login, ganti sandi wajib, satu alur siklus |

Tambah akun Petani lewat Owner → Kelola user jika perlu sampai 6 login unik.

### Agenda

1. Login dan sandi (10 m) — semua peran; Petani baru lewat `/ganti-sandi` jika `mustChangePassword`.
2. Petani (10 m) — daftar siklus → detail → centang konfirmasi → Lanjut fase; lihat log fase.
3. Admin (10 m) — alert stok → jurnal → filter tanggal → cari DataTable → approve contoh.
4. Owner (10 m) — dashboard bulan laba tertinggi → Pie biaya → evaluasi BEP tanpa Excel.
5. Q&A dan checklist (5 m) — `docs/testing/uji-blackbox.md` bagian Sprint 5.

### Checklist go-live

- [ ] URL production dan `NEXTAUTH_URL` benar
- [ ] Enam user bisa login tanpa error 500 berulang
- [ ] Satu jurnal manual debit = kredit disetujui
- [ ] Satu pindah fase petani tercatat di log
- [ ] Owner membaca tren laba dalam waktu di bawah 30 detik (T5.3 AC)

### Setelah pelatihan

PO menutup issue T5.9; temuan baru masuk T5.5 atau issue terpisah. Deploy production: [`docs/deployment/panduan-deploy-vercel-postgres.md`](../deployment/panduan-deploy-vercel-postgres.md).
