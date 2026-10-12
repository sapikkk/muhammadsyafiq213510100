# Skill khusus alur Kokonus Farm

Adaptasi workflow dari [openaccountant/skills](https://github.com/openaccountant/skills) ke domain hidroponik + Smart Jurnal.

| Skill | Asal openaccountant | Dipakai saat |
|-------|---------------------|--------------|
| `piutang-aging` | invoice-aging | SO belum lunas, modul keuangan |
| `tutup-bulan` | month-end-close | Tutup periode Admin |
| `smart-jurnal-audit` | — | Audit Dr/Cr Smart Jurnal vs COA |
| `ui-ringkas` | anti-slop (ID) | Label manusia (produksi, inventaris, keuangan); kode/id sekunder |
| (domain) | — | `akuntansi-hidroponik` untuk COA/HPP/jurnal baku |

Salin ke mesin lokal: `bash scripts/sync-agent-skills.sh`
