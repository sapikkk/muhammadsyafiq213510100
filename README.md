# Kokonus Farm

Website tata kelola biaya produksi hidroponik untuk skripsi. Studi kasus: greenhouse rakit apung di Pekanbaru, 1.920 lubang tanam.

Dokumen pengerjaan ada di `docs/`:

- `prd-agile-kokonus-farm.md` — backlog dan sprint
- `project-context.md` — fakta usaha dan batasan
- `skenario-narasi-ucd-agile.md` — naskah UCD
- `notes.md` — yang masih terbuka

Yang terpasang sekarang adalah fondasi Sprint 1 (US1.1): Next.js 14 App Router, TypeScript ketat, Tailwind, dan komponen Button, Card, Input, Badge, Dialog, Table, Select.

## Menjalankan lokal

Butuh Node.js 18.18 atau lebih baru.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

```bash
npm run lint
npm run typecheck
npm run build
```

PostgreSQL dan login belum dipakai. `DATABASE_URL` dan `NEXTAUTH_SECRET` di `.env.example` disiapkan untuk story berikutnya.
