const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const tanggalPanjang = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeZone: "Asia/Jakarta",
});

export function formatRupiah(value: number | string | { toString(): string }) {
  return rupiah.format(Number(value.toString()));
}

export function formatTanggal(value: Date) {
  return tanggalPanjang.format(value);
}

const waktuJakarta = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

/** ISO UTC → tanggal + jam menit WIB (GitHub / agile timeline). */
export function formatWaktuJakarta(iso: string) {
  return waktuJakarta.format(new Date(iso));
}

// "YYYY-MM-DD" menurut zona Jakarta, untuk input type=date dan query string.
const tanggalIso = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "short",
  timeZone: "Asia/Jakarta",
});

export function keTanggalIso(value: Date) {
  return tanggalIso.format(value);
}

const qty = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export function formatQty(value: number | string | { toString(): string }) {
  return qty.format(Number(value.toString()));
}
