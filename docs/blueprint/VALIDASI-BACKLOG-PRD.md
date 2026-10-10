# Validasi blueprint vs Backlog, PRD, dan kode (`main` / v1.12.x)

**Tanggal:** 2026-10-10  
**Blueprint:** `docs/blueprint/akuntansi-logistik-hidroponik.md`  
**PRD:** `docs/prd-agile-kokonus-farm.md`  
**Backlog GitHub:** US #2–#38 closed; Sprint 5 #39–#45 (QA/go-live) di PR #83.

---

## 1. Jawaban pertanyaan terbuka (§11 blueprint)

| # | Pertanyaan blueprint | Jawaban singkat |
| --- | --- | --- |
| 1 | Semua fitur sudah di backlog? | **Tidak.** Blueprint = **roadmap v2** (8 fase). Hampir semua item WIP/Smart Jurnal/DP/Abort/lubang-first **belum** punya issue US terpisah. |
| 2 | Konflik PRD? | **Sebagian.** PRD/F12 sudah: panen PENDING → approve → HPP + jurnal; SO DELIVERED + jurnal. Blueprint **menyempitkan** satuan ke lubang, menambah WIP, DP, Smart Jurnal — **luar cakupan US yang sudah Done**. |
| 3 | MVP vs ditunda? | **Disarankan:** Fase 1–4 MVP v2; fase 5–6 (DP + Smart Jurnal inti); fase 7–8 (laporan KPI + period lock + penyusutan otomatis) lanjutan skripsi. |
| 4 | Jual sebelum approve panen? | **PRD/kode: tidak wajar.** SO butuh HPP batch (`sales-order-delivery.ts`); approve panen wajib dulu. Selaras blueprint. |
| 5 | Pajak/perizinan? | **Belum** di sistem; blueprint §8.8 hanya skenario — konfirmasi manual PO. |

---

## 2. Matriks gap (blueprint → repo saat ini)

| Area blueprint | Target | Implementasi saat ini | Gap |
| --- | --- | --- | --- |
| **§1 Panen PENDING** | Stok/susut baru saat APPROVE | `approveLaporanPanen` update siklus + HPP; reject aman | ✅ selaras prinsip; **belum** update `jumlah_layak_jual`/`total_susut` eksplisit seperti blueprint (cek field siklus) |
| **§1 Abort gagal total** | Jurnal 5300 ← WIP | Kegagalan per kejadian + 5300 on approve abnormal | ⚠️ **tidak ada** tombol Abort total + clear WIP |
| **§1 State siklus** | PERSEMAIAN → … → SELESAI | `SEMAI`, `SPROUT_DAUN`, … `PANEN`, `SELESAI` (`lib/siklus-fase.ts`) | 🔄 **nama fase** beda; bisa mapping dokumen, bukan blocker DB |
| **§1 Jurnal siklus** | Benih/nutrisi → **WIP** | Biaya langsung di `Biaya_Langsung`; jurnal approve: **Dr 1350 Cr 5100** | ❌ **tanpa WIP**; 1350 = "Sayur siap jual" di seed, bukan curah+WIP terpisah |
| **§2 Active pack** | Kapasitas lubang otomatis, potong proporsional | Active pack + `pakaiActivePackDalamTx`; semai by gram/pack | ⚠️ sebagian; **belum** formula lubang & "Pack habis" adjustment |
| **§3 Dynamic bundling** | Lubang terpakai + pack → HPP order | SO baris CURAH/PACK; packing cost; HPP per kg/pack | ⚠️ **kg/pack**, bukan lubang-first + moving average varietas |
| **§4 DP & multi-kas** | Uang muka, Kas tunai/bank terpisah | DELIVERED: **Dr 1100** full; 1100/1110 ada di COA | ❌ **no** `jumlah_dp`, `akun_dp_id`, `status_pembayaran` di `Sales_Order` |
| **§5 Hapus `Petani`** | Hanya User PEKERJA | Model `Petani` + `seed-petani.js` + halaman master | ❌ masih ada (US4.5 Done di sprint lama) — **keputusan produk** |
| **§5 `is_system` COA** | Kunci akun otomatis | `Akun` tanpa flag; seed 38 akun | ❌ |
| **§6 Smart Jurnal** | Form terpandu + sumber SMART/AUTO | Jurnal manual + otomatis harvest/SO | ❌ UI Smart Jurnal belum |
| **§7 COA** | WIP 1350, Uang muka 2200, dll. | 1350 = sayur siap jual; 2200 = pinjaman modal | ❌ **pemetaan kode** beda — migrasi COA + saldo opening |
| **§8 KPI** | HPP/lubang, yield, BEP | Owner evaluasi, HPP per kg/pack/lubang sebagian | ⚠️ dashboard ada; **KPI blueprint** belum lengkap |
| **§10 Checklist** | Neraca simulasi siklus penuh | `check:jurnal-balance` | ⚠️ balance per jurnal, bukan simulasi end-to-end WIP |

Legenda: ✅ selaras · ⚠️ partial · ❌ belum · 🔄 dokumentasi saja

---

## 3. Yang sudah selaras (jangan buang)

- Jurnal **hanya APPROVED** mengubah saldo COA (`lib/jurnal.ts`, approve flow).
- **Laporan panen** PENDING → approve/reject (`lib/laporan-panen.ts`, F12).
- **5300** susut abnormal on approve (`totalBiayaAbnormalSiklus`).
- **SO DELIVERED** → jurnal pendapatan + HPP + persediaan (`lib/sales-order-delivery.ts`).
- **Debit = kredit** validasi form/API + `npm run check:jurnal-balance`.
- **Active pack** & potong stok saat semai (US4.2).
- **HPP** ABC + overhead + plastik (US2.3–2.5 territory).

---

## 4. Usulan epic backlog v2 (dari fase §9)

| Epic | Issue draft | Fase blueprint |
| --- | --- | --- |
| EPIC-A Schema & COA v2 | Migrasi `is_system`, split kas, WIP, uang muka; re-seed / mapping | 1 |
| EPIC-B Siklus & panen v2 | Abort total; update susut/layak only on approve; optional rename fase | 2 |
| EPIC-C Benih & pack | Kapasitas lubang, pack habis, adjustment | 3 |
| EPIC-D SO & HPP order | Input lubang+pack; moving average | 4 |
| EPIC-E Pembayaran SO | DP, pelunasan, status_pembayaran | 5 |
| EPIC-F Smart Jurnal | Tipe 1–17, sumber SMART/AUTO | 6 |
| EPIC-G Laporan & KPI | §8.6–8.7 | 7 |
| EPIC-H Tutup buku | Period lock, reversal, depresiasi otomatis | 8 |

**Urutan disarankan PO:** 1 → 2 → 4 → 5 (nilai skripsi) paralel 3; 6 setelah COA stabil; 7–8 menjelang sidang.

---

## 5. Risiko jika langsung coding tanpa fase 1

- Jurnal otomatis (harvest, SO) **hardcode kode akun** — refactor COA tanpa `is_system` + mapping = production break.
- HPP dan SO masih **kg/pack** — migrasi ke lubang-first butuh data historis & UI petani.
- Menghapus `Petani` **menghapus** jejak US4.5/demo — putuskan apakah master hanya User atau tetap dual.

---

## 6. Checklist §10 blueprint (status)

| Item | Status |
| --- | --- |
| Setiap peristiwa punya pasangan D/K | ⚠️ sebagian; WIP path belum |
| D/K selalu balance | ✅ API + audit script |
| Neraca balance simulasi siklus penuh | ⬜ butuh test integrasi v2 |
| Reject panen tidak ubah stok | ✅ |
| Abort → 5300, WIP nol | ⬜ |
| `is_system` tidak bisa dihapus | ⬜ |
| SO DP + DELIVERED pendapatan benar | ⬜ |
| Kas tunai/bank terpisah | ⚠️ akun ada; SO pakai 1100 saja |
| Cocok backlog/PRD | ✅ dokumen ini |

---

## 7. Langkah berikut (PO)

1. Setujui blueprint draft + prioritas fase MVP v2.  
2. Buat **Project epic / milestone v2** di GitHub (8 epic di atas).  
3. Jangan merge refactor schema ke `main` sebelum Sprint 5 (#83) go-live merge (jika PO ingin rilis v1.12 dulu).  
4. Validasi pemetaan COA §7 dengan dosen/akuntan **sebelum** migrasi saldo.

Terakhir diperbarui: 2026-10-10.
