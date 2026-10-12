---
name: tutup-bulan
description: >
  Checklist tutup buku bulanan Kokonus — adaptasi month-end-close (periode kunci, penyusutan, setujui jurnal).
---

# Tutup bulan (Kokonus)

## Overview
Checklist operasional sebelum mengunci periode. Bukan rekonsiliasi bank penuh seperti SaaS generik; fokus pada jurnal otomatis hidroponik + kontrol Admin.

## Sumber data repo
- `/admin/akuntansi` — `PeriodLockForm`, `PenyusutanBulanForm`
- `lib/period-lock.ts`, `lib/penyusutan-otomatis.ts`
- Skill domain: `docs/skills/akuntansi-hidroponik/SKILL.md`

## Workflow
1. Pastikan semua laporan panen pending sudah disetujui (stok & HPP benar).
2. Jalankan penyusutan bulan berjalan (GH, instalasi).
3. Setujui catatan keuangan status `PENDING` yang relevan.
4. Cek pesanan `PIUTANG` — catat pelunasan jika uang sudah masuk.
5. Set tanggal tutup periode di form Tutup periode.
6. Owner unduh laba rugi / neraca / arus kas untuk bulan tersebut.

## Catatan
- Jurnal posted tidak diedit; koreksi Owner lewat jurnal pembalik.
- Biaya listrik di lahan masuk HPP saat panen, bukan saat bayar listrik.
