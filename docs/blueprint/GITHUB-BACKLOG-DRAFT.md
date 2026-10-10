# Draft issue GitHub — increment v2 (UCD + blueprint)

**Label usulan:** `ucd-v2`, `epic-v2`, `research`  
**Milestone usulan:** *Post go-live v1.12* (buat di Project #1 setelah PO set tanggal)  
**Jangan buat otomatis tanpa review PO** — ini daftar kerja di branch `ucd/blueprint-v2-akuntansi`.

---

## Epic (parent issues — buat manual atau Project field)

| Epic | Judul issue | Ringkasan |
| --- | --- | --- |
| EPIC-A | [v2-A] Schema COA: is_system, WIP, uang muka, kas split | Fase blueprint 1 |
| EPIC-B | [v2-B] Siklus & panen: approve-only stok, Abort gagal total | Fase 2 |
| EPIC-C | [v2-C] Benih: kapasitas lubang pack, potong proporsional, pack habis | Fase 3 |
| EPIC-D | [v2-D] SO dynamic bundling + HPP per lubang + moving average | Fase 4 |
| EPIC-E | [v2-E] DP, pelunasan, status pembayaran SO | Fase 5 |
| EPIC-F | [v2-F] Smart Jurnal (tipe 1–17) + sumber SMART/AUTO | Fase 6 |
| EPIC-G | [v2-G] Laporan keuangan + KPI dashboard hidroponik | Fase 7 |
| EPIC-H | [v2-H] Penyusutan otomatis, period lock, jurnal pembalik | Fase 8 |

---

## Story contoh (child — EPIC-A)

```markdown
## [v2-A.1] Migrasi Prisma: Akun.is_system + seed mapping

**UCD:** Define — kunci akun otomatis  
**AC:**
- Kolom `is_system` boolean default false
- Seed set true untuk akun §7 blueprint (daftar di VALIDASI)
- API/UI COA: tolak hapus/ubah kode jika is_system

**DoD:** typecheck, check:jurnal-balance hijau, catatan di uji-blackbox
**Depends:** PO setujui mapping 1350/2200 vs seed lama
```

---

## Story contoh (child — EPIC-F)

```markdown
## [v2-F.1] Smart Jurnal MVP: beban operasional + prive + suntikan modal

**UCD:** Prototype + Test  
**AC:**
- Form "Saya ingin mencatat …" (3 tipe pertama)
- Jurnal PENDING/DRAFT, pasangan D/K terkunci, sumber SMART
- Tab Jurnal Manual tetap ada

**DoD:** e2e admin minimal; debit=kredit audit
```

---

## Urutan kerja disarankan (PO)

1. Review branch + `VALIDASI-BACKLOG-PRD.md`  
2. Merge go-live v1 (`feat/sprint-5-qa` → `main`) jika belum  
3. Buat milestone + label `ucd-v2` di GitHub  
4. Buat 8 epic issues → link di Project #1  
5. Pecah story A.1, B.1, … per sprint penelitian lanjutan  

**Skill:** `docs/skills/akuntansi-hidroponik/SKILL.md`
