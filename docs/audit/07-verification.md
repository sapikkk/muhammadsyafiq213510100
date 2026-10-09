# Phase 7 — verifikasi (checklist)

Jalankan dari root repo pada branch audit sebelum PR ke `main`.

## Otomatis (CI + lokal)

```bash
npm run lint
npm run typecheck
npm run check:audit-env
npm run check:banned-ui
npm run check:legacy-api-json
npm run build
```

Semua harus lulus tanpa `AUDIT_BYPASS_RBAC=true` di file yang di-commit.

## Manual singkat

1. `.env` lokal: `AUDIT_BYPASS_RBAC=true` → sidebar label audit, navigasi semua role.
2. Matikan bypass → login Admin / Owner / Petani, pastikan menu sesuai peran.
3. Satu halaman DataTable (mis. `/admin/jurnal`): cari + pagination.
4. Form dengan toast (jurnal, lupa sandi, SO detail).
5. Offline: matikan jaringan di browser → toast offline.

## E2E (opsional, butuh Postgres + seed)

```bash
npm run dev   # terminal 1
npm run test:e2e
```

Belum di CI karena belum ada service database di workflow.

## Hasil terakhir (agent)

| Perintah | Status |
|----------|--------|
| typecheck | lulus setelah commit export + CI guard |
| check:legacy-api-json | lulus setelah migrasi `/api/export/*` |

Catatan PO: isi tanggal uji manual di baris bawah setelah review.
