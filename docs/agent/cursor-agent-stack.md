# Stack agent Cursor — Kokonus Farm

Panduan memakai **rules**, **skills**, **Agency agents**, **Ponytail**, **Caveman**, dan **awesome-skills** tanpa memuat semuanya dalam satu prompt.

**Hub dokumentasi:** [`../README.md`](../README.md) · sesi penuh chat: [`../skills/kokonus-sesi-penuh.md`](../skills/kokonus-sesi-penuh.md) (`/kokonus`).

## Pasang sekali (mesin lokal)

```bash
cd /path/ke/muhammadsyafiq213510100
git submodule update --init --recursive vendor/agents/
bash scripts/install-git-hooks.sh   # opsional: hapus trailer Cursor di commit
bash scripts/bootstrap-vendor-agents.sh
```

Bootstrap akan:

| Sumber | Hasil |
|--------|--------|
| Agency Agents | Symlink `.cursor/rules/<agent>.mdc` → `@slug` di chat |
| Karpathy, graphify, Apple HIG | Rule di-commit (always-on / glob) |
| Semgrep, Matt Pocock, Apple bundle | `.agents/skills/` |
| Ponytail | Skill 6× + **hooks** `.cursor/hooks.json` (proyek) |
| awesome-skills | Skill `awesome-*` terkurasi (manifest) |

**Caveman (opsional, global):**

```bash
bash scripts/install-caveman-cursor.sh
```

Mengubah `~/.cursor/` (hooks + skill). Bisa coexist dengan ponytail hooks proyek; baca bagian konflik di bawah.

Graphify MCP (opsional): lihat `AGENTS.md` + `.cursor/mcp.json`.

---

## Satu ketikan: `/kokonus` atau `/all`

Di Cursor Agent chat:

1. Ketik **`/`**
2. Pilih **`kokonus`** (atau **`all`** — sama)
3. Tulis tugas Anda (mis. "Perbaiki validasi form siklus petani")

Itu mengaktifkan **sesi penuh**: Ponytail full, graphify, Superpowers otomatis, domain farm, openaccountant, Matt Pocock, Semgrep, Apple HIG, awesome-kurasi, Agency persona internal. Kontrak lengkap: [`docs/skills/kokonus-sesi-penuh.md`](skills/kokonus-sesi-penuh.md).

### Apa itu `.cursor/hooks.json`?

File konfigurasi Cursor yang menjalankan **skrip kecil saat chat dimulai** (`sessionStart`). Ponytail (dan Caveman jika global) memakainya untuk menyuntik mode `/ponytail full` **tanpa** Anda ketik slash.

| Cara | Kapan dipakai |
|------|----------------|
| **`/kokonus` di awal chat** | Anda kontrol eksplisit; **cukup ini** jika setiap chat selalu dari slash |
| **hooks.json** (setelah `bootstrap-vendor-agents.sh`) | Chat baru otomatis dapat Ponytail; tetap ketik `/kokonus` jika mau **semua** lapisan, bukan hanya Ponytail |

File hooks **tidak di-commit** (path absolut ke submodule). Pasang ulang setelah pindah folder repo: `node vendor/agents/ponytail/scripts/cursor-hooks.js install --project`

---

## Lapisan yang sudah aktif tanpa `/`

| Lapisan | Cara aktif | Fungsi |
|---------|------------|--------|
| **Karpathy** | `.cursor/rules/karpathy-guidelines.mdc` always-on | Diff kecil, klarifikasi |
| **Graphify** | Rule + CLI/MCP | Eksplorasi kode |
| **Apple HIG** | Rule pada `app/**`, `components/**` | Review UI (copy tetap `ui-ringkas`) |
| **AGENTS.md** | Cursor baca otomatis | Kebijakan repo, Ponytail default full |

---

## Ponytail ([DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail))

- Submodule: `vendor/agents/ponytail`
- **Mode:** kirim pesan biasa di chat:
  - `/ponytail full` — default Kokonus (implementasi YAGNI)
  - `/ponytail lite` | `/ponytail ultra` | `/ponytail off`
  - `/ponytail` — cek mode
- **Hooks proyek** (setelah bootstrap): `.cursor/hooks.json` — **jangan commit** (path absolut ke submodule).
- **Jangan** pasang symlink `ponytail.mdc` always-on bersama Karpathy; pilih hooks **atau** rule, bukan keduanya.

Skill: `ponytail`, `ponytail-review`, `ponytail-audit`, … di `.agents/skills/`.

---

## Caveman ([JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman))

- Submodule: `vendor/agents/caveman`
- Install Cursor: `bash scripts/install-caveman-cursor.sh` → `~/.cursor`
- Perintah chat: `/caveman`, `/caveman help`, `/caveman off`
- Gaya komunikasi ringkas + alur investigate/build/review (subagent cavecrew di global)
- **Opsional** — matikan per sesi jika bentrok preferensi gaya dengan Ponytail

---

## Awesome-skills ([theneoai/awesome-skills](https://github.com/theneoai/awesome-skills))

- Submodule penuh (~956 skill) di vendor; **proyek hanya sync kurasi**
- Daftar: `docs/skills/awesome-skills-kokonus.manifest`
- Sync: `bash scripts/sync-awesome-skills-kokonus.sh` (dipanggil dari bootstrap)
- Pakai **satu** skill per task, mis. skill `awesome-agronomist` via `/kokonus-persona`
- Jangan append seluruh katalog ke `.cursorrules` (legacy awesome-skills) — proyek pakai `.cursor/rules/` + `.agents/skills/`

Tambah skill ke kurasi: edit manifest → jalankan sync lagi.

---

## Agency Agents ([msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents))

Setelah bootstrap:

```
@frontend-developer Tinjau aksesibilitas halaman ini.
@senior-secops-engineer Review perubahan auth.
```

Daftar tim terbatas:

```bash
vendor/agents/agency-agents/scripts/install.sh --tool cursor --division engineering,security --link --no-interactive
```

---

## Matt Pocock & Superpowers — jangan dobel TDD

| Kebutuhan | Pilih |
|-----------|--------|
| US Kokonus, plan, debug formal | Plugin **Superpowers** (`.cursor/plugins/superpowers`) |
| Review/triage/engineering skill | Matt Pocock di `.agents/skills/` (`code-review`, `diagnosing-bugs`, …) |
| TDD Matt `tdd` | **Jangan** campur dengan Superpowers `test-driven-development` dalam satu task |

---

## Skill domain Kokonus

| Skill | Path sumber |
|-------|-------------|
| Akuntansi hidroponik | `docs/skills/akuntansi-hidroponik/` |
| UI Indonesia | `docs/skills/kokonus/ui-ringkas/` |
| Tutup bulan, jurnal, piutang | `docs/skills/kokonus/*/` |
| OpenAccountant (opsional) | `npx skills add openaccountant/skills -y` + sync |

Indeks: `docs/skills/README.md`.

---

## Konflik & prioritas

1. **Keamanan & data** — Karpathy + validasi boundary; Semgrep sebelum rilis sensitif.
2. **Eksplorasi kode** — graphify dulu, Read/Grep untuk baris spesifik.
3. **Implementasi** — Ponytail full + konvensi `lib/`.
4. **Proses US** — Superpowers.
5. **Persona** — satu `@agency` atau satu `awesome-*`.
6. **Caveman** — gaya output; nonaktifkan jika mengganggu.

---

## Perintah cepat

```bash
# Pasang / refresh semua (kecuali caveman global)
bash scripts/bootstrap-vendor-agents.sh

# Hanya awesome kurasi
bash scripts/sync-awesome-skills-kokonus.sh

# Ponytail hooks ulang (setelah pindah folder repo)
node vendor/agents/ponytail/scripts/cursor-hooks.js install --project

# Semgrep
npm run semgrep:scan

# Graphify setelah edit TS
graphify update .
# atau
npm run graphify:update
```

Terakhir diperbarui: **2026-10-15**.
