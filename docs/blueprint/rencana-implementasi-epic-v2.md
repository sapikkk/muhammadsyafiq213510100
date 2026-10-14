# Rencana implementasi story epic v2 (A–D)

Catatan PR per story blueprint akuntansi dan logistik. Source of truth domain: [`akuntansi-logistik-hidroponik.md`](./akuntansi-logistik-hidroponik.md).

## v2-A.1 — `Akun.is_system` + seed mapping

Epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87) · Story [#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95) · Branch `feat/v2-a1-is-system`

### Checklist AC

- [x] Prisma: kolom `isSystem Boolean @default(false) @map("is_system")` pada `Akun`
- [x] `prisma db push` / migrate + seed: akun §7 blueprint → `isSystem: true` (standar v1 COA via `seed-akun.js`)
- [x] `lib/akun.ts`: tolak ubah kode / tipe / parent / nonaktif jika `isSystem`
- [x] UI admin COA: badge Sistem; lock edit kode/tipe/induk; sembunyikan nonaktif
- [x] `npm run typecheck` + `npm run check:jurnal-balance`
- [x] Catatan uji di `docs/testing/uji-blackbox.md` (section v2-A.1)

### Keputusan PO (blokir seed)

| Topik | v1 seed | blueprint v2 | Keputusan PO |
| --- | --- | --- | --- |
| 1350 | Sayur siap jual | WIP / sayur curah | Tunda — tetap v1 sampai story rename/migrasi |
| 2200 | Pinjaman modal | Uang muka pelanggan | Tunda — tetap v1 sampai story rename/migrasi |
| Akun baru 1300–1360, 2200 | — | daftar §7 | Tunda — di luar scope A.1 |

A.1 hanya menandai COA standar v1 sebagai `isSystem`; rename dan migrasi saldo masuk story berikutnya.

### File yang disentuh

| Area | Path |
| --- | --- |
| Schema | `prisma/schema.prisma` |
| Seed | `prisma/seed-akun.js` |
| Domain | `lib/akun.ts`, route API COA |
| UI | `app/owner/akun/`, form edit COA admin |
| Docs | `docs/testing/uji-blackbox.md`, `docs/referensi/api.md` |

Urutan commit disarankan: schema + client → seed + flag → guard API/lib → UI + docs + blackbox.

Skill: `docs/skills/akuntansi-hidroponik/SKILL.md`

## v2-B.1 — Abort gagal total

Epic #88 · Issue #96 · Branch `feat/v2-b1-abort-siklus`

### AC

- [x] UI abort petani + admin (`/admin/biaya`)
- [x] Dr 5300 Cr WIP (proxy 1350 sampai akun WIP v2)
- [x] Status `GAGAL_TOTAL`, blok fase / panen / kegagalan baru
- [x] Satu jurnal abort (tidak double dengan partial susut on approve)
- [x] Blackbox `docs/testing/uji-blackbox.md` § v2-B.1

WIP penuh (benih → jurnal WIP) masuk story Epic A berikutnya. B.1 memakai nominal biaya langsung + overhead alokasi seperti HPP v1.

## v2-C.1 — Kapasitas lubang pack

Epic #89 · Issue #97

### AC

- [x] Formula `kapasitasLubangBenihPack` / `kapasitasLubangMediaPack` (`lib/pack-kapasitas-lubang.ts`)
- [x] Semai N lubang → gram benih + slab media otomatis + validasi sisa pack
- [x] UI form semai: tampil ~lubang per pack, potong proporsional read-only
- [ ] Seed/demo scenario terpisah (opsional — pakai seed demo existing)

Rumus: `kapasitas_lubang = berat_gram × biji_per_gram / biji_per_lubang` (default 1 biji/lubang). Media RW: `sisa_slabs × 720` dadu.

## v2-D.1 — SO lubang + HPP order

Epic #90 · Issue #98

### AC

- [x] Kolom `lubang_terpakai`, `hpp_order` pada `Sales_Order_Baris`
- [x] Form SO admin: lubang + pack/kg
- [x] COGS DELIVERED dari `hpp_order` (MVP batch HPP/lubang)
- [x] e2e `admin-so-lubang.spec.ts`

Moving average varietas → story D berikutnya.
