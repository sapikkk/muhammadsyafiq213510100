# Panduan pesan commit (bahasa manusia)

Agar riwayat Git mudah dibaca Owner dan tim — bukan hanya developer.

## Aturan singkat

1. **Judul:** satu kalimat Indonesia, **apa yang berubah untuk pengguna** (bukan nama file atau enum).
2. **Tanpa** `Co-authored-by: Cursor` — hook `.githooks/commit-msg` menghapus otomatis setelah `bash scripts/install-git-hooks.sh`.
3. **Hindari** judul mesin: `chore(release): 1.0.0` berulang — itu dari bot rilis (lihat [commit-kategori-main.md](./commit-kategori-main.md)).
4. **Scope opsional** dalam bahasa bisnis: `(petani)`, `(owner)`, `(admin)`, `(keuangan)`.

## Contoh perbaikan judul

| Judul lama (mesin) | Judul disarankan |
|--------------------|------------------|
| `fix(db): notifikasi 503 saat DB down` | `fix: notifikasi tidak error saat database mati` |
| `perf: ringankan beranda owner` | `perf(owner): beranda owner lebih cepat dibuka` |
| `feat(v2): hub keuangan, rekening kas` | `feat(keuangan): menu keuangan, rekening kas, piutang` |
| `chore(release): 1.36.6 [skip ci]` | *(biarkan bot release — kategori Tim release)* |

## Body commit (opsional)

- **Kenapa** (1–2 baris), bukan daftar file.
- Link issue: `Closes #123` jika ada.

## PR besar (banyak commit di cabang)

Agar `main` tetap ** satu baris = satu makna**:

1. Merge lewat GitHub **Squash and merge** (bukan merge commit).
2. Judul squash = kalimat manusia + scope: `feat(owner): …`, `docs(agile): …`.
3. PR contoh: [#128](https://github.com/sapikkk/muhammadsyafiq213510100/pull/128) — judul squash sudah dicantumkan di deskripsi PR.

Commit di cabang feature boleh bertahap; yang masuk `main` cukup **satu commit squash** per PR.

## Riwayat lama di `main`

Mengubah pesan commit yang **sudah di-push** butuh `git rebase` / `filter-repo` dan **force push** — hanya PO + tim setuju.  
Untuk audit tanpa rewrite: lihat **commit-kategori-main.md** (dibuat ulang dengan `npm run audit:commit-kategori`).

Terakhir diperbarui: **2026-10-15**.
