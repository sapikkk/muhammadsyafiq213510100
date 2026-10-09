import { labelTahap } from "@/lib/log-kegagalan";

type Row = {
  id: number;
  tahap: string;
  jumlah_gagal: number;
  hari_hidup: number;
  penyebab: string;
  kategori_susut: string;
  jenis_kerugian: string;
  biaya_kerugian: string;
};

function labelKategori(value: string) {
  if (value === "NORMAL") return "Normal";
  if (value === "ABNORMAL") return "Abnormal";
  if (value === "MENUNGGU") return "Menunggu klasifikasi";
  return value;
}

export function LogKegagalanDaftar({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada log kegagalan untuk batch ini.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-1 p-4 text-sm">
          <p className="font-medium">
            {labelTahap(row.tahap)} · {row.jumlah_gagal} gagal · hari {row.hari_hidup}
          </p>
          <p className="text-muted-foreground">{row.penyebab}</p>
          <p className="text-xs text-muted-foreground">
            Susut: {labelKategori(row.kategori_susut)}
            {row.kategori_susut !== "MENUNGGU"
              ? ` · ${row.jenis_kerugian} · Rp ${row.biaya_kerugian}`
              : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
