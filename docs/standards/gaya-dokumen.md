# Gaya dokumen Markdown — Kokonus Farm

Panduan untuk menulis dan merapikan semua file `.md` di repo. Istilah teknis (Prisma, NextAuth, endpoint) boleh tetap; kalimat pembuka dan penjelasan untuk manusia harus jelas.

## Prinsip

1. **Bahasa Indonesia** untuk PO, Owner, petani, dan QA. English hanya untuk identifier kode, commit type, atau kutipan API.
2. **Kalimat pendek.** Satu ide per bullet. Hindari paragraf panjang berantai.
3. **Judul hierarki rapi:** satu `#` per file, lalu `##` / `###` — jangan loncat level.
4. **Tabel untuk perbandingan**, bullet untuk langkah atau checklist.
5. **Link relatif** antar dokumen (`../testing/uji-blackbox.md`), bukan path absolut mesin.
6. **Humanizer** untuk naskah skripsi, notulensi uji, dan ringkasan PO — hindari pola AI (kontras paksa “bukan X melainkan Y”, triad, bold berlebihan).

## Template pembuka file

```markdown
# [Judul manusia]

[Satu paragraf: untuk siapa dokumen ini dan kapan dibaca.]

---

## [Bagian pertama]
```

## User story (issue & sprint)

Format wajib di issue GitHub dan registry US:

- **Sebagai** [Owner / Admin / Petani], **saya ingin** [tindakan], **agar** [manfaat bisnis].
- **Acceptance criteria:** 3–7 poin uji di lapangan; detail teknis di sub-bagian “Catatan dev” opsional.

Template lengkap: [`../agile/panduan-user-story.md`](../agile/panduan-user-story.md).

## Commit & audit

Judul commit: [`../agile/panduan-pesan-commit.md`](../agile/panduan-pesan-commit.md).  
Tanpa trailer `Co-authored-by: Cursor`.

## UI vs dokumen

- Teks **layar** (`app/`, `components/`): skill [`../skills/kokonus/ui-ringkas/SKILL.md`](../skills/kokonus/ui-ringkas/SKILL.md).
- **Dokumen produk:** boleh sebut “Beranda”, “Pesanan jual”, bukan hanya path route.

## Nama file

- Kebab-case: `konteks-lapangan-dan-aplikasi.md`
- Hindari CAPS kecuali akronim resmi: `AC-VERIFIKASI-RISIKO.md` (legacy) → file baru pakai huruf kecil.
- SKILL vendor: tetap `SKILL.md` di folder skill.

## Saat memindahkan file

1. Pindah ke folder tema di [`../README.md`](../README.md).
2. Sisakan **stub** satu layar di path lama dengan link ke lokasi baru (bookmark & issue lama).
3. Perbarui link di `README.md`, `AGENTS.md`, `lib/project-hub-content.ts`, template issue GitHub.

Terakhir diperbarui: **2026-10-15**.
