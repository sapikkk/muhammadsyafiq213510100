# v2-A.1 — `Akun.is_system` + seed mapping (rencana implementasi)

**Epic:** [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)  
**Story:** [#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)  
**Branch:** `feat/v2-a1-is-system`

## Checklist AC (centang saat PR siap merge)

- [x] Prisma: kolom `isSystem Boolean @default(false) @map("is_system")` pada `Akun`
- [x] `prisma db push` / migrate + seed: akun §7 blueprint → `isSystem: true` (standar v1 COA via `seed-akun.js`)
- [x] `lib/akun.ts`: tolak ubah `kode` / tipe / parent / nonaktif jika `isSystem`
- [x] UI admin COA: badge Sistem; lock edit kode/tipe/induk; sembunyikan nonaktif
- [x] `npm run typecheck` + `npm run check:jurnal-balance`
- [x] Catatan uji di `docs/uji-blackbox.md` (section v2-A.1)

## Keputusan PO (blokir seed)

| Topik | v1 seed | blueprint v2 | Keputusan PO |
| --- | --- | --- | --- |
| 1350 | Sayur siap jual | WIP / sayur curah | **Tunda** — tetap v1 sampai story rename/migrasi |
| 2200 | Pinjaman modal | Uang muka pelanggan | **Tunda** — tetap v1 sampai story rename/migrasi |
| Akun baru 1300–1360, 2200 | — | daftar §7 | **Tunda** — di luar scope A.1 |

A.1 hanya menandai COA standar v1 sebagai `isSystem`; rename/migrasi saldo = story berikutnya.

## File yang akan disentuh

| Area | Path |
| --- | --- |
| Schema | `prisma/schema.prisma` |
| Seed | `prisma/seed-akun.js` |
| Domain | `lib/akun.ts`, `lib/api` routes COA |
| UI | `app/owner/akun/`, `app/admin/` (jika ada edit COA) |
| Docs | `docs/uji-blackbox.md`, `docs/api.md` |

## Urutan commit disarankan

1. Schema + generate client  
2. Seed + flag `isSystem`  
3. Guard API/lib  
4. UI + docs + blackbox  

**Skill:** `docs/skills/akuntansi-hidroponik/SKILL.md`
