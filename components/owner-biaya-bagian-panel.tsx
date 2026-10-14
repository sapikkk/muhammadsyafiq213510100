import Link from "next/link";
import { PageSection } from "@/components/page-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/format";
import type { loadOwnerBiayaBagianData, VarietasHppRingkasan } from "@/lib/owner-biaya-bagian";

type BagianData = Awaited<ReturnType<typeof loadOwnerBiayaBagianData>>;

export function OwnerBiayaBagianPanel({ data }: { data: BagianData }) {
  switch (data.type) {
    case "langsung":
      return (
        <PageSection title="Biaya langsung per siklus" badge="Read">
          {data.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada biaya langsung tercatat.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Varietas</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead className="text-right">Benih</TableHead>
                    <TableHead className="text-right">Rockwool</TableHead>
                    <TableHead className="text-right">Nutrisi</TableHead>
                    <TableHead className="text-right">Listrik</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.varietas}</TableCell>
                      <TableCell className="text-sm">{r.batch}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.lokasi}</TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {formatRupiah(r.benih)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {formatRupiah(r.rockwool)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {formatRupiah(r.nutrisi)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {formatRupiah(r.listrik)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {formatRupiah(r.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </PageSection>
      );
    case "umum":
      return (
        <PageSection title="Biaya umum (overhead)" badge="Read">
          <p className="mb-3 text-sm text-muted-foreground">
            Overhead bulanan untuk alokasi ke HPP saat panen disetujui. Input detail di menu Admin.
          </p>
          {data.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada periode overhead.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Periode</TableHead>
                  <TableHead className="text-right">Dep. GH</TableHead>
                  <TableHead className="text-right">Dep. listrik</TableHead>
                  <TableHead className="text-right">Sewa</TableHead>
                  <TableHead className="text-right">Gaji</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.periode}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.depGreenhouse)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.depListrik)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.sewa)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.gaji)}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatRupiah(r.subtotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </PageSection>
      );
    case "alokasi":
      return (
        <PageSection title="Alokasi biaya ke batch" badge="Read">
          <p className="mb-3 text-sm text-muted-foreground">
            Langsung + overhead teralokasi per siklus panen disetujui.
          </p>
          {data.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada HPP tercatat.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Varietas</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead className="text-right">Langsung</TableHead>
                  <TableHead className="text-right">Overhead</TableHead>
                  <TableHead className="text-right">Total HPP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rows.map((r) => (
                  <TableRow key={r.batch}>
                    <TableCell className="font-medium">{r.varietas}</TableCell>
                    <TableCell>{r.batch}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.lokasi}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.langsung)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.overhead)}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatRupiah(r.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </PageSection>
      );
    case "kolam":
      return (
        <PageSection title="Biaya per kolam" badge="Read">
          {data.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada agregat per kolam.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Greenhouse</TableHead>
                  <TableHead>Kolam</TableHead>
                  <TableHead className="text-right">Siklus</TableHead>
                  <TableHead className="text-right">Langsung</TableHead>
                  <TableHead className="text-right">Overhead</TableHead>
                  <TableHead className="text-right">Total HPP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rows.map((r) => (
                  <TableRow key={`${r.greenhouse}-${r.kolam}`}>
                    <TableCell>{r.greenhouse}</TableCell>
                    <TableCell className="font-medium">{r.kolam}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.jumlahSiklus}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.biayaLangsung)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatRupiah(r.overhead)}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatRupiah(r.totalHpp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </PageSection>
      );
    case "hpp-kg":
      return (
        <VarietasHppTable
          title="HPP per kg (per varietas)"
          hint="Rata-rata tertimbang lubang layak dari batch panen disetujui."
          rows={data.varietas}
          valueKey="hppPerKg"
          unit="/kg"
          hargaKey="hargaJualCurah"
          marginKey="marginKg"
        />
      );
    case "hpp-lubang":
      return (
        <VarietasHppTable
          title="HPP per lubang (per varietas)"
          hint="Moving average 5 batch terakhir per varietas (bobot lubang layak)."
          rows={data.varietas}
          valueKey="hppPerLubang"
          unit="/lubang"
        />
      );
    case "hpp-pack":
      return (
        <VarietasHppTable
          title="HPP per pack (per varietas)"
          hint="Rata-rata tertimbang per varietas dari HPP resmi."
          rows={data.varietas}
          valueKey="hppPerPack"
          unit="/pack"
          hargaKey="hargaJualPack"
          marginKey="marginPack"
        />
      );
    case "cek-hpp":
      return (
        <PageSection title="Cek HPP vs harga jual" badge="Read">
          <p className="mb-3 text-sm text-muted-foreground">
            Bandingkan margin curah dan pack per varietas. Data dari panen disetujui.
          </p>
          {data.varietas.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada varietas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Varietas</TableHead>
                  <TableHead className="text-right">HPP/kg</TableHead>
                  <TableHead className="text-right">Margin curah</TableHead>
                  <TableHead className="text-right">HPP/pack</TableHead>
                  <TableHead className="text-right">Margin pack</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.varietas.map((r) => (
                  <TableRow key={r.varietasId}>
                    <TableCell className="font-medium">
                      <Link href={`/owner/varietas/${r.varietasId}`} className="hover:underline">
                        {r.nama}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.hppPerKg ? formatRupiah(r.hppPerKg) : "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.marginKg ? formatRupiah(r.marginKg) : "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.hppPerPack ? formatRupiah(r.hppPerPack) : "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.marginPack ? formatRupiah(r.marginPack) : "—"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {r.batchCount === 0
                        ? "Belum ada HPP"
                        : r.layak
                          ? "Layak"
                          : "Perlu naik harga / turunkan biaya"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </PageSection>
      );
  }
}

function VarietasHppTable({
  title,
  hint,
  rows,
  valueKey,
  unit,
  hargaKey,
  marginKey,
  showCek,
  nested,
}: {
  title: string;
  hint?: string;
  rows: VarietasHppRingkasan[];
  valueKey: keyof Pick<VarietasHppRingkasan, "hppPerKg" | "hppPerLubang" | "hppPerPack">;
  unit: string;
  hargaKey?: keyof Pick<VarietasHppRingkasan, "hargaJualCurah" | "hargaJualPack">;
  marginKey?: keyof Pick<VarietasHppRingkasan, "marginKg" | "marginPack">;
  showCek?: boolean;
  nested?: boolean;
}) {
  const body = (
    <>
      {hint ? <p className="mb-3 text-sm text-muted-foreground">{hint}</p> : null}
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada varietas.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Varietas</TableHead>
              <TableHead className="text-right">Batch</TableHead>
              <TableHead className="text-right">HPP{unit}</TableHead>
              {hargaKey ? <TableHead className="text-right">Harga jual</TableHead> : null}
              {marginKey ? <TableHead className="text-right">Margin</TableHead> : null}
              {showCek ? <TableHead>Status</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const val = r[valueKey];
              const harga = hargaKey ? r[hargaKey] : null;
              const margin = marginKey ? r[marginKey] : null;
              return (
                <TableRow key={r.varietasId}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/owner/varietas/${r.varietasId}`}
                      className="hover:underline"
                    >
                      {r.nama}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{r.batchCount}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {val ? formatRupiah(val) : "—"}
                  </TableCell>
                  {hargaKey ? (
                    <TableCell className="text-right tabular-nums">
                      {harga ? formatRupiah(harga) : "—"}
                    </TableCell>
                  ) : null}
                  {marginKey ? (
                    <TableCell className="text-right tabular-nums">
                      {margin ? formatRupiah(margin) : "—"}
                    </TableCell>
                  ) : null}
                  {showCek ? (
                    <TableCell className="text-sm">
                      {r.batchCount === 0
                        ? "Belum ada HPP"
                        : r.layak
                          ? "Layak"
                          : "Perlu naik harga / turunkan biaya"}
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );

  if (nested) return body;
  return (
    <PageSection title={title} badge="Read">
      {body}
    </PageSection>
  );
}
