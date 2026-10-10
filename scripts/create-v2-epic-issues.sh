#!/usr/bin/env bash
# Buat epic increment v2 + story starter (A.1 … H.1). Idempotent: skip jika judul sudah ada.
set -euo pipefail
REPO="sapikkk/muhammadsyafiq213510100"
MILESTONE="${1:-Increment v2 — Post go-live}"
LABELS="ucd-v2,epic-v2,research"
FOOTER=$'\n\n---\n**Refs:** [blueprint](../docs/blueprint/akuntansi-logistik-hidroponik.md) · [validasi](../docs/blueprint/VALIDASI-BACKLOG-PRD.md) · [UCD](../docs/ucd/increment-v2-akuntansi-logistik.md) · skill `docs/skills/akuntansi-hidroponik/SKILL.md`'

exists_title() {
  gh issue list --repo "$REPO" --state all --search "$1 in:title" --limit 1 --json title --jq '.[0].title // empty' | grep -qxF "$1"
}

create_epic() {
  local title="$1"
  local body="$2"
  if exists_title "$title"; then
    gh issue list --repo "$REPO" --search "$title in:title" --limit 1 --json number --jq '.[0].number'
    return
  fi
  local url
  url=$(gh issue create --repo "$REPO" --title "$title" --label "$LABELS" --milestone "$MILESTONE" --body "$body$FOOTER")
  echo "$url" | sed -n 's|.*/issues/\([0-9]*\)|\1|p'
}

create_story() {
  local title="$1"
  local body="$2"
  local labels="${3:-ucd-v2,research}"
  if exists_title "$title"; then
    gh issue list --repo "$REPO" --search "$title in:title" --limit 1 --json number --jq '.[0].number'
    return
  fi
  local url
  url=$(gh issue create --repo "$REPO" --title "$title" --label "$labels" --milestone "$MILESTONE" --body "$body$FOOTER")
  echo "$url" | sed -n 's|.*/issues/\([0-9]*\)|\1|p'
}

add_project() {
  local num="$1"
  gh project item-add 1 --owner sapikkk --url "https://github.com/$REPO/issues/$num" 2>/dev/null || true
}

A=$(create_epic "[v2-A] Epic: Schema COA — is_system, WIP, uang muka, kas split" "## Fase blueprint 1

**Goal:** fondasi COA & Prisma selaras §5–§7 blueprint.

**Scope:**
- \`Akun.is_system\`, migrasi pemetaan 1350/2200 vs seed v1
- Akun WIP, uang muka pelanggan, split kas tunai/bank
- API/UI: kunci akun sistem

**AC epic:** PO sign-off mapping COA; schema migrate + seed v2; v1 data path documented.

**Child starter:** v2-A.1")

B=$(create_epic "[v2-B] Epic: Siklus & panen — approve-only stok, Abort gagal total" "## Fase blueprint 2

**Scope:** §1 — stok/susut hanya on APPROVE; tombol Abort total → Dr 5300 Cr WIP; selaras F12.

**AC epic:** tidak ada double-count; reject/ajukan ulang aman; abort clears WIP.

**Child starter:** v2-B.1")

C=$(create_epic "[v2-C] Epic: Benih — kapasitas lubang pack, potong proporsional, pack habis" "## Fase blueprint 3

**Scope:** §2 — lubang-first semai; active pack proporsional; jurnal penyesuaian pack habis.

**Child starter:** v2-C.1")

D=$(create_epic "[v2-D] Epic: SO dynamic bundling + HPP per lubang + moving average" "## Fase blueprint 4

**Scope:** §3 — SO input pack + lubang; HPP order; moving average varietas; DELIVERED + plastik.

**Child starter:** v2-D.1")

E=$(create_epic "[v2-E] Epic: DP, pelunasan, status pembayaran SO" "## Fase blueprint 5

**Scope:** §4 — kolom SO DP/pelunasan; uang muka bukan pendapatan; multi-kas.

**Child starter:** v2-E.1")

F=$(create_epic "[v2-F] Epic: Smart Jurnal (tipe 1–17) + sumber SMART/AUTO" "## Fase blueprint 6

**Scope:** §6 — form terpandu; pasangan D/K terkunci; jurnal manual tetap; metadata sumber.

**Child starter:** v2-F.1")

G=$(create_epic "[v2-G] Epic: Laporan keuangan + KPI dashboard hidroponik" "## Fase blueprint 7

**Scope:** §8 KPI — HPP/lubang, yield, BEP; laporan selaras WIP/COA v2.

**Child starter:** v2-G.1")

H=$(create_epic "[v2-H] Epic: Penyusutan otomatis, period lock, jurnal pembalik" "## Fase blueprint 8

**Scope:** §6 koreksi — period closing; penyusutan scheduled; jurnal pembalik.

**Child starter:** v2-H.1")

echo "Epics: A#$A B#$B C#$C D#$D E#$E F#$F G#$G H#$H"

create_story "[v2-A.1] Migrasi Prisma: Akun.is_system + seed mapping" "**Parent epic:** #$A

**UCD:** Define

**AC:**
- Kolom \`is_system\` boolean default false
- Seed \`true\` untuk akun §7 blueprint (daftar VALIDASI)
- API/UI COA: tolak hapus/ubah kode jika is_system

**DoD:** typecheck; \`check:jurnal-balance\`; catatan uji-blackbox"

create_story "[v2-B.1] Abort siklus gagal total → jurnal 5300 ← WIP" "**Parent epic:** #$B

**AC:**
- Aksi Abort di UI admin/petani (scope PO)
- Dr 5300 Cr WIP; siklus tidak lanjut produksi
- Tidak double-count dengan kegagalan partial existing

**DoD:** unit/lib test + blackbox section v2"

create_story "[v2-C.1] Kapasitas lubang dari active pack + potong proporsional semai" "**Parent epic:** #$C

**AC:**
- Formula \`kapasitas_lubang\` dari pack aktif
- Semai N lubang mengurangi pack + alokasi HPP ke siklus

**DoD:** seed/demo scenario; inventaris konsisten"

create_story "[v2-D.1] SO baris: lubang terpakai + HPP order (MVP bundling)" "**Parent epic:** #$D

**AC:**
- Input SO mencatat lubang + pack (sel selaras blueprint)
- HPP order on DELIVERED selaras moving average MVP

**DoD:** e2e admin SO minimal"

create_story "[v2-E.1] Schema SO: jumlah_dp, akun_dp, status_pembayaran" "**Parent epic:** #$E

**AC:**
- Kolom §4 blueprint di Prisma + migrasi
- DP posting ke uang muka (bukan pendapatan)

**DoD:** API validate; docs/api.md"

create_story "[v2-F.1] Smart Jurnal MVP: beban operasional + prive + suntikan modal" "**Parent epic:** #$F

**AC:**
- Form \"Saya ingin mencatat …\" (3 tipe pertama)
- Jurnal PENDING/DRAFT; pasangan D/K terkunci; sumber SMART
- Tab Jurnal Manual tetap

**DoD:** e2e admin; debit=kredit audit"

create_story "[v2-G.1] KPI Owner: HPP per lubang + yield (dashboard MVP)" "**Parent epic:** #$G

**AC:**
- Widget/kpi selaras §8 blueprint
- Data dari jurnal/siklus v2 (stub OK jika epic A–D belum merge)

**DoD:** owner page smoke"

create_story "[v2-H.1] Period lock flag + tolak jurnal backdate" "**Parent epic:** #$H

**AC:**
- Setting periode tutup
- POST jurnal ditolak jika tanggal < lock (kecuali admin override PO)

**DoD:** lib test + rbac doc"

for n in "$A" "$B" "$C" "$D" "$E" "$F" "$G" "$H"; do add_project "$n"; done

echo "Done. Update docs/blueprint/GITHUB-BACKLOG-DRAFT.md with issue numbers."
