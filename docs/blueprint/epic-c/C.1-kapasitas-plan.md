# v2-C.1 — Kapasitas lubang pack (#97)

**Epic:** #89 · **Issue:** #97

## AC

- [x] Formula `kapasitasLubangBenihPack` / `kapasitasLubangMediaPack` (`lib/pack-kapasitas-lubang.ts`)
- [x] Semai N lubang → gram benih + slab media otomatis + validasi sisa pack
- [x] UI form semai: tampil ~lubang per pack, potong proporsional read-only
- [ ] Seed/demo scenario terpisah (opsional — pakai seed demo existing)

## Rumus

`kapasitas_lubang = berat_gram × biji_per_gram / biji_per_lubang` (default 1 biji/lubang).  
Media RW: `sisa_slabs × 720` dadu.
