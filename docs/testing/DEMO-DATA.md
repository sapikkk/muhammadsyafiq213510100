# Data demo sidang & uji manual

## Akun login (seed utama)

| Peran | Email | Sandi |
| --- | --- | --- |
| Owner | owner@kokonus.farm | `KokonusDemo2026` (lihat `prisma/seed.js`) |
| Admin | admin@kokonus.farm | sama |
| Petani | petani@kokonus.farm | sama |

Sandi tidak di-commit di repo produksi; ganti sebelum sidang publik (`docs/deployment/vercel-go-live.md`).

## Seed database

```bash
npx prisma db push   # atau migrate deploy
npm run seed         # prisma/seed.js — COA, inventaris, infrastruktur, varietas, siklus demo
npm run seed:demo    # pelanggan demo + 1 jurnal DRAFT
```

### Isi `seed:demo`

- **3 pelanggan** (pasar, resto, koperasi) — email `demo.*@contoh.local`
- **1 jurnal DRAFT** Admin: Dr 5230 · Cr 1100 (Rp 250.000) — keterangan `Demo DRAFT — beban sewa contoh sidang`

Idempotent: aman dijalankan ulang.

## Postgres lokal (disarankan sidang)

Untuk menghindari FINDING-01 (pool timeout remote), gunakan DB lokal:

```bash
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
```

Lalu `db push`, `seed`, `seed:demo`, `npm run dev`.

## Agent skills (lokal)

Skills domain (commit): `docs/skills/akuntansi-hidroponik/SKILL.md`.

Skills keuangan umum (gitignore, opsional):

```bash
npx skills add openaccountant/skills -y
# → .agents/skills/
```

Cursor Agent Skills Platform (submodule opsional, lihat `docs/sprint-backlog-agile.md`):

```bash
git submodule update --init --recursive .cursor/skills/agent-skills-platform
```

Folder `.agents/` dan `.cursor/skills/` tidak di-push — setiap mesin dev meng-install sendiri.

Terakhir diperbarui: 2026-10-10 · issue **#81**.
