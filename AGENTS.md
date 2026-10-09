# Kokonus Farm — panduan agent

## Graphify (wajib untuk eksplorasi kode)

Graf pengetahuan ada di `graphify-out/` (commit `9868c5af` saat terakhir di-build).

Sebelum `Read` / `Grep` / `Glob` untuk orientasi arsitektur:

```bash
graphify query "<pertanyaan>"
graphify path "<simbol A>" "<simbol B>"
graphify explain "<simbol atau file>"
```

Setelah mengubah kode TypeScript/JavaScript:

```bash
graphify update .
```

Aturan Cursor: `.cursor/rules/graphify.mdc`.

## Superpowers (proses)

- Fitur atau US baru: **brainstorming** → desain disetujui → **writing-plans** → implementasi.
- Bug: **systematic-debugging** sebelum patch.
- Sebelum selesai: **verification-before-completion** (uji / build / black-box).

Plugin: `.cursor/plugins/superpowers` (submodule). Satu US = satu branch.

## Ponytail (implementasi)

Default **full**: YAGNI, pakai `lib/*` yang sudah ada, tanpa lapisan service baru kecuali PRD memaksa.

US berikutnya (2.4, 3.5, 4.5): form + server action atau route API tipis, logika di `lib/` bersama (`hpp.ts`, `siklus-produksi.ts`, `jurnal.ts`).

## Humanizer (prosa)

Untuk `docs/`, notulensi uji, naskah skripsi: jalankan humanizer — hindari pola AI (kontras “bukan X tapi Y”, triad paksa, bold berlebihan).

## Backlog

Urutan dan kelompok US: `docs/progress-backlog.md`. Board: [Project #1](https://github.com/users/sapikkk/projects/1).
