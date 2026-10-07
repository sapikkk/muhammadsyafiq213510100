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

// "YYYY-MM-DD" menurut zona Jakarta, untuk input type=date dan query string.
const tanggalIso = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "short",
  timeZone: "Asia/Jakarta",
});

export function keTanggalIso(value: Date) {
  return tanggalIso.format(value);
}
