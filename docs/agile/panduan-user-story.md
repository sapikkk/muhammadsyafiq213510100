# Panduan user story — bahasa manusia

Format standar issue GitHub, sprint doc, dan registry US Kokonus Farm. ID **USx.y** dan nomor issue **tidak diubah**; yang di-refine judul, narasi, dan acceptance criteria.

## Template issue

```markdown
## User story

Sebagai **[Owner / Admin / Petani]**,
saya ingin **[capability singkat]**,
agar **[outcome bisnis — uang, waktu, atau risiko]**.


## Acceptance criteria

- [ ] … (dapat diuji tanpa baca kode)
- [ ] …
- [ ] …

## Catatan dev (opsional)

- Model / API: …
- Path UI: …
```

## Contoh — judul mesin → manusia

| ID | Judul teknis (lama) | Judul manusia (disarankan) |
|----|---------------------|----------------------------|
| US1.4 | NextAuth login/logout | Owner, Admin, dan Petani masuk dengan email dan sandi |
| US3.1 | Mulai siklus semai API | Petani memulai semai dan sistem mengurangi stok media otomatis |
| US6.1 | Dashboard Owner KPI | Owner melihat ringkasan laba dan HPP di beranda |

## Acceptance criteria — aturan

1. Mulai dengan **peran** atau **layar**, bukan nama library.
2. Satu AC = satu perilaku yang QA bisa centang.
3. Istilah teknis hanya jika tidak ada padanan (mis. **double-entry**, **Active Pack** sudah istilah produk).
4. DoD global: [`definition-of-done.md`](definition-of-done.md).

## Registry (akan diisi)

File indeks terpusat: `us-registry.md` (Fase 1 [`../standards/rencana-refine-dokumen.md`](../standards/rencana-refine-dokumen.md)).

## Template GitHub

Issue baru: [`.github/ISSUE_TEMPLATE/user-story.md`](../../.github/ISSUE_TEMPLATE/user-story.md).

Terakhir diperbarui: **2026-10-15**.
