import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

type LogBaris = {
  fase_dari: string;
  fase_ke: string;
  catatan: string | null;
  waktu: Date;
  user: { nama: string };
};

function labelFase(kode: string) {
  return isFaseProduksi(kode) ? faseLabel[kode] : kode;
}

export function LogProduksiDaftar({ rows }: { rows: LogBaris[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada log pindah fase.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.waktu.toISOString() + row.fase_ke} className="space-y-1 p-4 text-sm">
          <p className="font-medium">
            {labelFase(row.fase_dari)} → {labelFase(row.fase_ke)}
          </p>
          <p className="text-muted-foreground">
            {row.user.nama} · {waktu.format(row.waktu)}
          </p>
          {row.catatan ? <p className="text-muted-foreground">{row.catatan}</p> : null}
        </li>
      ))}
    </ul>
  );
}
