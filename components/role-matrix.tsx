import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Access = [modul: string, owner: boolean, admin: boolean, petani: boolean];

const rows: Access[] = [
  ["Lihat semua modul", true, false, false],
  ["Kelola akun pengguna", true, false, false],
  ["Daftarkan petani", false, true, false],
  ["Pembukuan dan jurnal", false, true, false],
  ["Setujui panen dan HPP", false, true, false],
  ["Reset sandi pengguna", false, true, false],
  ["Input siklus, panen, kegagalan", false, false, true],
  ["Laporan keuangan", true, true, false],
];

function Cell({ allowed }: { allowed: boolean }) {
  return (
    <TableCell className="text-center">
      <span className={allowed ? "font-medium" : "text-muted-foreground"}>
        {allowed ? "Ya" : "Tidak"}
      </span>
    </TableCell>
  );
}

export function RoleMatrix() {
  return (
    <section aria-labelledby="matrix-title" className="space-y-3">
      <h2 id="matrix-title" className="text-lg font-semibold">
        Matrix peran
      </h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kemampuan</TableHead>
              <TableHead className="text-center">Owner</TableHead>
              <TableHead className="text-center">Admin</TableHead>
              <TableHead className="text-center">Petani</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(([modul, owner, admin, petani]) => (
              <TableRow key={modul}>
                <TableCell>{modul}</TableCell>
                <Cell allowed={owner} />
                <Cell allowed={admin} />
                <Cell allowed={petani} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
