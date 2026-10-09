export function PelangganDaftar({
  rows,
}: {
  rows: { id: number; nama: string; alamat: string; no_telepon: string; email: string }[];
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Belum ada pelanggan.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {rows.map((row) => (
        <li key={row.id} className="space-y-1 p-4 text-sm">
          <p className="font-medium">{row.nama}</p>
          <p className="text-muted-foreground">{row.alamat}</p>
          <p className="text-muted-foreground">
            {row.no_telepon} · {row.email}
          </p>
        </li>
      ))}
    </ul>
  );
}
