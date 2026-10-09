# Superpowers (Cursor Agent)

[Superpowers](https://github.com/obra/superpowers) disertakan di repo sebagai **git submodule** agar tim memakai versi skill yang sama.

| Lokasi | Versi saat ini |
|--------|----------------|
| `.cursor/plugins/superpowers` | `v6.4.2` (tag) |

## Setelah clone

```bash
git submodule update --init --recursive
```

Atau clone sekali jalan:

```bash
git clone --recurse-submodules <url-repo>
```

## Aktifkan di Cursor

1. Buka proyek ini di Cursor.
2. Pastikan folder `.cursor/plugins/superpowers` ada (langkah submodule di atas).
3. Di **Cursor Settings → Plugins**, pastikan plugin **Superpowers** dari path proyek terdeteksi, atau di chat Agent jalankan `/add-plugin superpowers` jika memakai marketplace global.

Skill Superpowers (TDD, debugging, rencana implementasi, dll.) memuat otomatis lewat hook plugin saat sesi Agent dimulai.

## Perbarui versi

```bash
cd .cursor/plugins/superpowers
git fetch --tags origin
git checkout v6.4.2   # ganti ke tag rilis baru bila sudah disetujui tim
cd ../../..
git add .cursor/plugins/superpowers
git commit -m "chore: bump superpowers submodule"
```

## Catatan

- Folder `.agents/` di root **tidak** di-commit (skill lokal / antislop); lihat `.gitignore`.
- Submodule mengikuti upstream [obra/superpowers](https://github.com/obra/superpowers); jangan fork isi skill di dalam submodule — ubah lewat PR upstream atau plugin terpisah.
