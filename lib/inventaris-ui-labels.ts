/** Teks inventaris & pack di layar — nama barang dulu. */

export function labelItemUtama(item: { nama: string; kode: string }): string {
  return item.nama;
}

/** Dropdown pilih item (satuan opsional). */
export function labelItemPilih(item: {
  nama: string;
  kode: string;
  satuanLabel?: string;
}): string {
  if (item.satuanLabel) return `${item.nama} (${item.satuanLabel})`;
  return item.nama;
}

/** Dropdown pack siap pakai. */
export function labelPackSiapPakai(p: {
  itemNama: string;
  sisaUnit: string | number;
  satuanLabel: string;
  kapLubang?: number | null;
}): string {
  const kap =
    p.kapLubang != null && p.kapLubang > 0 ? ` · ~${p.kapLubang} lubang` : "";
  return `${p.itemNama} (sisa ${p.sisaUnit} ${p.satuanLabel}${kap})`;
}
