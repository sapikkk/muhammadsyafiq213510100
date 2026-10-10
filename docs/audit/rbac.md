# PHASE 1 — RBAC audit mode

## Implementasi

| Komponen | Perilaku |
|----------|----------|
| `lib/rbac.ts` | `isAuditBypassRbac()` = `NODE_ENV !== "production"` **dan** `AUDIT_BYPASS_RBAC=true` |
| `middleware.ts` | Lewati redirect `/akses-ditolak` untuk prefix peran; login tetap wajib |
| `lib/api-auth.ts` | `requireApiRole()` untuk route handler |
| `lib/action-auth.ts` | `requireActionRole()` (siap dipakai; actions sudah memakai `isRoleAllowed`) |
| `lib/export-auth.ts` | Export PDF/XLSX ikut bypass |
| `components/app-sidebar.tsx` | `auditShowAllNav` → gabungan menu Owner/Admin/Petani |
| `components/role-home.tsx` | Menyalakan nav audit dari server |
| `.env.example` | `AUDIT_BYPASS_RBAC=false` |
| `scripts/check-audit-env.sh` + CI | Gagal jika `AUDIT_BYPASS_RBAC=true` di file env yang di-commit |

**Lokal:** salin flag ke `.env.local` (gitignored), jangan commit `true`.

## Temuan (a) saat audit — bug/perilaku

- `GET /api/auth/session` bisa sangat lambat (~10s+) pada cold start / DB — catat di perf (Phase 4).
- Beberapa halaman owner/admin duplikat (akun, jurnal) dengan API berbeda; bypass membantu uji lintas peran.

## Temuan (b) RBAC tidak konsisten (sebelum/di luar bypass)

| Severity | Temuan | Status |
|----------|--------|--------|
| Medium | Cek peran tersebar di ~35 API + ~20 actions (copy-paste) | **Dibenahi** — semua API/actions memakai `isRoleAllowed` / `requireApiRole` |
| Medium | UI sidebar menyembunyikan route; API harus tetap enforce | Tetap: bypass hanya dev; produksi unchanged |
| Low | `middleware` matcher tidak mencakup `/api/*` | By design — auth API per handler (OK jika semua handler guard) |
| Low | `/pengaturan` di matcher middleware tapi tidak cek prefix peran | OK — semua role login boleh |

## Verifikasi

- `npm run typecheck` — pass
- `npm run check:audit-env` — pass
- Produksi: tanpa flag, perilaku RBAC sama seperti sebelum Phase 1

## Uji manual sidebar audit (PO)

1. Di `.env` lokal (gitignored): `AUDIT_BYPASS_RBAC=true`, restart dev server.
2. Login salah satu akun demo; sidebar label **Menu (audit)** — gabungan route Owner/Admin/Petani.
3. Klik tiap link sekali; halaman harus **200**, tanpa layar putih atau error boundary.
4. Matikan flag; login ulang — menu kembali sesuai peran saja.
5. Centang item di `docs/audit/qa.md` setelah selesai.
