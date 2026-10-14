# Format temuan audit & FINDING

Satu pola untuk `docs/audit/*`, findings di `testing/uji-blackbox.md`, dan catatan PO.

## Blok temuan

```markdown
## [ID] Judul singkat (bahasa manusia)

| | |
|--|--|
| **Severity** | Blocker / Major / Minor / Info |
| **Status** | Open / Mitigated / Closed |
| **Tanggal** | YYYY-MM-DD |
| **Lokasi** | path atau layar |

### Konteks

Satu paragraf: siapa terdampak, kapan muncul.

### Bukti

- Langkah reproduksi (3–6 bullet)
- Perintah / URL / screenshot (jika ada)

### Rekomendasi

- Tindakan konkret (bukan generic “perbaiki”)

### Jejak repo

- PR, commit, atau `lib/*` terkait
```

## FINDING-xx (lintas US)

Pakai prefix **FINDING-NN** di blackbox; link dari [`../testing/uji-blackbox.md`](../testing/uji-blackbox.md) daftar isi.

Terakhir diperbarui: **2026-10-15**.
