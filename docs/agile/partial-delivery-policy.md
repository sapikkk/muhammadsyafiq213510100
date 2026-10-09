# Kebijakan partial delivery & pelacakan

Keputusan PO · berlaku untuk semua US.

## Prinsip

1. **Semua US boleh dilacak partial** — progress AC, DoD, dan tech terbaca di git (`docs/agile/sprints/*`) dan di GitHub (filter).
2. **Issue tetap open** selama AC belum 100% (contoh: US2.3).
3. **Menutup issue** hanya jika scope issue selesai **atau** scope dipotong dengan **catatan partial** eksplisit (sisa scope → issue baru / US lanjutan).
4. **Review PR wajib** (≥1 approving review GitHub) sebelum merge — lihat [definition-of-done.md](./definition-of-done.md).

## GitHub — filter & label

| Label | Arti |
|-------|------|
| `sprint-1` … `sprint-5` | Iterasi backlog (filter repo) |
| `progress-partial` | AC/DoD belum lengkap; issue **open** atau baru ditutup dengan sisa scope |

**Project #1**

| Status | Kapan |
|--------|--------|
| Todo | Belum mulai |
| In progress | Ada kode/uji partial (`progress-partial` disarankan) |
| Done | AC issue selesai **atau** ditutup dengan catatan partial + sisa terdokumentasi |

**View disarankan:** Iteration = Sprint N · filter `label:progress-partial` · Board by Status.

## Format catatan partial (issue / sprint doc)

```markdown
## Status partial — YYYY-MM-DD
- **Progress:** ~60% (3/5 AC)
- **Selesai:** …
- **Sisa:** … (US/issue tindak lanjut: #…)
- **Bukti:** PR #… · commit … · `docs/uji-blackbox.md` §…
```

## Sinkron setelah merge

1. Baris US di `docs/agile/sprints/sprint-XX-*.md` (kolom **Progress**).
2. Entri baru di `docs/agile/audit-log.md`.
3. Issue: checklist task + label; tutup hanya dengan template di atas jika partial.
