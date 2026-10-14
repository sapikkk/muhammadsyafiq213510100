import { MetricCards } from "@/components/metric-cards";
import { OwnerBagianSubnav } from "@/components/owner-bagian-subnav";
import { PageSection } from "@/components/page-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  loadOwnerKegagalanSusutDashboard,
  OWNER_KEGAGALAN_BAGIAN,
  parseOwnerKegagalanBagian,
  type OwnerKegagalanBagian,
} from "@/lib/owner-kegagalan-susut";
import { Suspense } from "react";

function SubnavKegagalan() {
  return (
    <OwnerBagianSubnav
      basePath="/owner/kegagalan-susut"
      paramName="bagian"
      defaultValue="menunggu"
      links={OWNER_KEGAGALAN_BAGIAN.map((b) => ({
        id: b.id,
        label: b.label,
        epic: b.epic || undefined,
        param: "bagian",
        value: b.id,
      }))}
    />
  );
}

export async function KegagalanSusutOwnerPanel({
  bagian: bagianRaw,
}: {
  bagian?: string;
}) {
  const bagian = parseOwnerKegagalanBagian(bagianRaw);
  const data = await loadOwnerKegagalanSusutDashboard();

  const metricItems = [
    { label: "Menunggu klasifikasi", value: data.metrics.menungguKlasifikasi },
    { label: "Total susut (bibit)", value: data.metrics.totalSusut },
    { label: "Layak jual (siklus)", value: data.metrics.totalLayakJual },
    { label: "Catatan normal", value: data.metrics.catatanNormal },
    { label: "Catatan tidak normal", value: data.metrics.catatanAbnormal },
    { label: "Tidak layak panen", value: data.metrics.totalTidakLayakPanen },
  ];

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <SubnavKegagalan />
      </Suspense>

      <MetricCards columns={3} items={metricItems} />

      <BagianKonten bagian={bagian} data={data} />
    </div>
  );
}

function BagianKonten({
  bagian,
  data,
}: {
  bagian: OwnerKegagalanBagian;
  data: Awaited<ReturnType<typeof loadOwnerKegagalanSusutDashboard>>;
}) {
  if (bagian === "menunggu") {
    if (data.pending.length === 0) {
      return (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Tidak ada catatan menunggu klasifikasi. Admin mengklasifikasi susut; angka total tetap
          terlihat di bagian lain.
        </p>
      );
    }
    return (
      <PageSection title="Menunggu klasifikasi Admin" badge="Read">
        <TabelPending rows={data.pending} />
      </PageSection>
    );
  }

  if (bagian === "total") {
    return (
      <PageSection title="Total susut per siklus aktif" badge="Read">
        <p className="mb-3 text-sm text-muted-foreground">
          Jumlah bibit susut terakumulasi di setiap siklus tanam.
        </p>
        <TabelPerSiklus rows={data.perSiklus} kolom={["disemai", "susut"]} />
      </PageSection>
    );
  }

  if (bagian === "klasifikasi") {
    return (
      <PageSection title="Normal vs tidak normal" badge="Read">
        <MetricCards
          columns={2}
          items={[
            {
              label: "Bibit (catatan normal)",
              value: data.metrics.bibitNormal,
            },
            {
              label: "Bibit (catatan tidak normal)",
              value: data.metrics.bibitAbnormal,
            },
          ]}
        />
        <div className="mt-4">
          <TabelRiwayat
            rows={data.riwayat.filter(
              (r) => r.kategori === "Normal" || r.kategori === "Tidak normal",
            )}
          />
        </div>
      </PageSection>
    );
  }

  if (bagian === "layak") {
    return (
      <PageSection title="Jumlah layak jual" badge="Read">
        <TabelPerSiklus rows={data.perSiklus} kolom={["layakJual", "layakPanen"]} />
      </PageSection>
    );
  }

  if (bagian === "tidak-layak") {
    return (
      <PageSection title="Tidak layak jual / panen" badge="Read">
        <TabelPerSiklus rows={data.perSiklus} kolom={["tidakLayakPanen", "susut"]} />
      </PageSection>
    );
  }

  if (bagian === "per-siklus") {
    return (
      <PageSection title="Susut per siklus" badge="Read">
        <TabelPerSiklus
          rows={data.perSiklus}
          kolom={["disemai", "susut", "layakJual", "tidakLayakPanen"]}
        />
      </PageSection>
    );
  }

  return (
    <PageSection title="Riwayat catatan kegagalan" badge="Read">
      <TabelRiwayat rows={data.riwayat} />
    </PageSection>
  );
}

function TabelPending({
  rows,
}: {
  rows: { id: number; lokasi: string; tahapLabel: string; jumlahGagal: number; penyebab: string }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lokasi tanam</TableHead>
          <TableHead>Tahap</TableHead>
          <TableHead className="text-right">Gagal</TableHead>
          <TableHead>Penyebab</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.lokasi}</TableCell>
            <TableCell>{row.tahapLabel}</TableCell>
            <TableCell className="text-right tabular-nums">{row.jumlahGagal}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{row.penyebab}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TabelRiwayat({
  rows,
}: {
  rows: {
    id: number;
    lokasi: string;
    tahapLabel: string;
    jumlahGagal: number;
    kategori: string;
    penyebab: string;
  }[];
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Belum ada riwayat pada filter ini.</p>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lokasi</TableHead>
          <TableHead>Tahap</TableHead>
          <TableHead>Klasifikasi</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead>Penyebab</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.lokasi}</TableCell>
            <TableCell>{row.tahapLabel}</TableCell>
            <TableCell>{row.kategori}</TableCell>
            <TableCell className="text-right tabular-nums">{row.jumlahGagal}</TableCell>
            <TableCell className="max-w-xs truncate text-sm text-muted-foreground" title={row.penyebab}>
              {row.penyebab}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type KolomSiklus = "disemai" | "susut" | "layakJual" | "layakPanen" | "tidakLayakPanen";

const KOLOM_LABEL: Record<KolomSiklus, string> = {
  disemai: "Disemai",
  susut: "Susut",
  layakJual: "Layak jual",
  layakPanen: "Layak panen",
  tidakLayakPanen: "Tidak layak panen",
};

function TabelPerSiklus({
  rows,
  kolom,
}: {
  rows: {
    label: string;
    disemai: number;
    susut: number;
    layakJual: number;
    layakPanen: number;
    tidakLayakPanen: number;
  }[];
  kolom: KolomSiklus[];
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada data siklus.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Siklus tanam</TableHead>
          {kolom.map((k) => (
            <TableHead key={k} className="text-right">
              {KOLOM_LABEL[k]}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label}>
            <TableCell className="max-w-md font-medium">{row.label}</TableCell>
            {kolom.map((k) => (
              <TableCell key={k} className="text-right tabular-nums">
                {row[k]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
