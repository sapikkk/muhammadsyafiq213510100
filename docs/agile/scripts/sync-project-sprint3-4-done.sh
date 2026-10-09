#!/usr/bin/env bash
# Set Project #1 Status=Done + kolom kosong untuk US Sprint 3–4 + US1.9/US2.6 (2026-10-09)
set -euo pipefail
PROJECT_ID=PVT_kwHOBFQUR84BmFnB
FIELD_STATUS=PVTSSF_lAHOBFQUR84BmFnBzhkv-S0
FIELD_PRIORITY=PVTSSF_lAHOBFQUR84BmFnBzhkv-rc
FIELD_SIZE=PVTSSF_lAHOBFQUR84BmFnBzhkv-rg
FIELD_ESTIMATE=PVTF_lAHOBFQUR84BmFnBzhkv-rk
FIELD_START=PVTF_lAHOBFQUR84BmFnBzhkv-rs
FIELD_TARGET=PVTF_lAHOBFQUR84BmFnBzhkv-rw
DONE=98236657
P0=d417ec06
P1=1a970a6a
P2=7f8eb70d
SZ_S=db23fa3a
SZ_M=4a6c709c
SZ_L=6edc1aa5

edit() {
  local id=$1
  shift
  while [[ $# -gt 0 ]]; do
    gh project item-edit --project-id "$PROJECT_ID" --id "$id" "$@"
    shift 2 || true
  done
}

set_done() {
  local id=$1 pri=$2 est=$3 sz=$4 start=$5 target=$6
  gh project item-edit --project-id "$PROJECT_ID" --id "$id" --field-id "$FIELD_STATUS" --single-select-option-id "$DONE"
  gh project item-edit --project-id "$PROJECT_ID" --id "$id" --field-id "$FIELD_PRIORITY" --single-select-option-id "$pri"
  gh project item-edit --project-id "$PROJECT_ID" --id "$id" --field-id "$FIELD_ESTIMATE" --number "$est"
  gh project item-edit --project-id "$PROJECT_ID" --id "$id" --field-id "$FIELD_SIZE" --single-select-option-id "$sz"
  gh project item-edit --project-id "$PROJECT_ID" --id "$id" --field-id "$FIELD_START" --date "$start"
  gh project item-edit --project-id "$PROJECT_ID" --id "$id" --field-id "$FIELD_TARGET" --date "$target"
}

# item_id pri est sz start target
set_done PVTI_lAHOBFQUR84BmFnBzg_MWdM "$P2" 5 "$SZ_M" 2026-11-05 2026-11-18   # 10 US1.9
set_done PVTI_lAHOBFQUR84BmFnBzg_MXE8 "$P2" 5 "$SZ_M" 2026-11-05 2026-11-18   # 16 US2.6
set_done PVTI_lAHOBFQUR84BmFnBzg_MYb0 "$P1" 5 "$SZ_M" 2026-10-22 2026-11-04   # 30
set_done PVTI_lAHOBFQUR84BmFnBzg_MYhY "$P1" 8 "$SZ_L" 2026-10-22 2026-11-04   # 31
set_done PVTI_lAHOBFQUR84BmFnBzg_MYlU "$P0" 8 "$SZ_L" 2026-10-22 2026-11-04   # 32
set_done PVTI_lAHOBFQUR84BmFnBzg_MYrQ "$P2" 5 "$SZ_M" 2026-10-22 2026-11-04   # 33
set_done PVTI_lAHOBFQUR84BmFnBzg_MYx4 "$P1" 8 "$SZ_L" 2026-11-05 2026-11-18   # 34
set_done PVTI_lAHOBFQUR84BmFnBzg_MY3c "$P1" 5 "$SZ_M" 2026-11-05 2026-11-18   # 35
set_done PVTI_lAHOBFQUR84BmFnBzg_MZFA "$P1" 8 "$SZ_L" 2026-11-05 2026-11-18   # 36
set_done PVTI_lAHOBFQUR84BmFnBzg_MZLI "$P0" 8 "$SZ_L" 2026-11-05 2026-11-18   # 37
set_done PVTI_lAHOBFQUR84BmFnBzg_Mc0k "$P1" 5 "$SZ_M" 2026-11-05 2026-11-18   # 38

# Backfill kolom kosong (issue sudah Done di board)
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_MVtc --field-id "$FIELD_PRIORITY" --single-select-option-id "$P0"
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_MVtc --field-id "$FIELD_ESTIMATE" --number 8
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_MXKo --field-id "$FIELD_PRIORITY" --single-select-option-id "$P0"
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_MYIg --field-id "$FIELD_PRIORITY" --single-select-option-id "$P0"
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_MYIg --field-id "$FIELD_ESTIMATE" --number 3
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_TuUE --field-id "$FIELD_PRIORITY" --single-select-option-id "$P2"
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_TuUE --field-id "$FIELD_ESTIMATE" --number 2
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_T4Vs --field-id "$FIELD_PRIORITY" --single-select-option-id "$P1"
gh project item-edit --project-id "$PROJECT_ID" --id PVTI_lAHOBFQUR84BmFnBzg_T4Vs --field-id "$FIELD_ESTIMATE" --number 2

echo "Project #1: Sprint 3–4 US marked Done with Priority/Size/Estimate/dates."
