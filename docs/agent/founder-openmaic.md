# Founder-skill & OpenMAIC (vendor)

Submodule + sync ke `.agents/skills/` untuk Cursor Agent. **Bukan** bagian runtime Kokonus Farm di Vercel.

| Repo | Submodule | Lisensi |
|------|-----------|---------|
| [Jakeschincariol/founder-skill](https://github.com/Jakeschincariol/founder-skill) | `vendor/agents/founder-skill` | MIT |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | `vendor/agents/openmaic` | MIT |

## Pasang (clone / mesin baru)

```bash
git submodule update --init vendor/agents/founder-skill vendor/agents/openmaic
bash scripts/sync-founder-openmaic-skills.sh
```

Atau lewat bootstrap penuh:

```bash
bash scripts/bootstrap-vendor-agents.sh
```

## Skill di Cursor

Setelah sync, agent bisa membaca `SKILL.md` di `.agents/skills/`:

- **Founder:** `founder-board`, `founder-cfo`, `founder-consumer`, … (11 skill bisnis)
- **OpenMAIC:** `openmaic` (deploy/extend kelas multi-agent) + `openmaic-*` (runtime pedagogi: stage-dsl, curriculum-planner, …)

Contoh prompt: *«Ikuti skill founder-board untuk ide Kokonus Farm»* atau *«Pakai openmaic-curriculum-planner untuk modul pelatihan petani»*.

## Menjalankan app OpenMAIC (opsional, terpisah)

OpenMAIC adalah aplikasi Next.js sendiri (PostgreSQL, Docker). **Tidak** di-merge ke `app/` Kokonus.

```bash
cd vendor/agents/openmaic
cp openmaic.example.yml openmaic.yml   # isi API key / model
docker compose up                      # lihat README upstream
```

Dokumentasi lengkap: [README OpenMAIC](https://github.com/THU-MAIC/OpenMAIC).

## Founder — alur disarankan upstream

```
board → competitors → consumer → pricing → offer → cfo → marketing → brand → ops → launch → plan
```

Output disimpan di folder `founder/` di proyek (buat manual saat dipakai).

Terakhir diperbarui: **2026-10-15**.
