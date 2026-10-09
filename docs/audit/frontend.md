# PHASE 6.1 — Frontend audit log

Append-only. Agent menambah baris per sesi.

| Sev | Route | File | Temuan | Fix / status |
|-----|-------|------|--------|----------------|
| High | `/owner/akun`, `/admin/akun` | `lib/akun.ts` | Prisma `Decimal` (`saldo`) ikut ke `AkunTree` → hydration warning | **Fixed:** `buildClientTree`, `toAkunEdit` |
| Medium | `/pengaturan` | `app/pengaturan/page.tsx` | Tanpa sidebar role shell | **Fixed:** `app/pengaturan/layout.tsx` + `RoleHome` |
| Medium | `/owner`, `/owner/biaya` | `owner-*-chart.tsx` | Pie/bar warna brand | **Fixed:** skala abu-abu |
| Low | `/`, `/login` | inventory | Belum ada sidebar global | **Partial** — Phase 2.4 |
| Low | Many lists | various | `Card` untuk data listing | **Blocked** — Phase 3 DataTable |

## Responsif (belum diuji sistematis)

Agent berikutnya: Playwright viewport matrix + isi baris Fail di tabel atas.
