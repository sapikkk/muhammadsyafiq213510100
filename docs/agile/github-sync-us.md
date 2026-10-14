# Sinkron issue GitHub dari registry

Agar issue #2–#45 (dan epic v2 #87–#94) punya **user story manusia** selaras dengan [`us-registry.md`](us-registry.md).

## Langkah

1. Perbarui registry / sprint doc bila ada perubahan narasi.
2. Regenerate body lokal:

   ```bash
   npm run sync:github-us-issues
   ```

3. Cek sample di [`issue-bodies/`](issue-bodies/) (mis. `US1-4-issue-5.md`).
4. Login GitHub CLI:

   ```bash
   gh auth refresh -h github.com
   ```

5. Push ke GitHub:

   ```bash
   npm run sync:github-us-issues:apply
   ```

`--apply` mengubah **title** dan **body** issue; tidak mengubah label Project #1 (pakai `npm run sync:project-board`).

## Jika CLI gagal

Salin isi file `issue-bodies/*-issue-N.md` ke issue #N di browser. Judul issue ikuti baris `# [USx.y] …` di file tersebut.

Terakhir diperbarui: **2026-10-15**.
