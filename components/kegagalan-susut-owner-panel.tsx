import { KegagalanFunnelPanel } from "@/components/kegagalan-funnel-panel";
import { KegagalanLogTabel } from "@/components/kegagalan-log-tabel";
import { KegagalanPeriodeFilter } from "@/components/kegagalan-periode-filter";
import { MetricCards } from "@/components/metric-cards";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { PageSection } from "@/components/page-section";
import { TABS_KEGAGALAN } from "@/lib/owner-section-tabs";
import {
  loadOwnerKegagalanSusutDashboard,
  parseOwnerKegagalanBagian,
  type OwnerKegagalanBagian,
  type OwnerKegagalanFilterInput,
} from "@/lib/owner-kegagalan-susut";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

export async function KegagalanSusutOwnerPanel({
  bagian: bagianRaw,
  filter,
}: {
  bagian?: string;
  filter: OwnerKegagalanFilterInput;
}) {
  const bagian = parseOwnerKegagalanBagian(bagianRaw);
  const data = await loadOwnerKegagalanSusutDashboard(filter);

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <OwnerSectionTabsShell tabs={TABS_KEGAGALAN} />
      </Suspense>

      <Suspense fallback={null}>
        <KegagalanPeriodeFilter
          bagian={bagian}
          bulan={filter.bulan}
          dari={filter.dari}
          sampai={filter.sampai}
        />
      </Suspense>

      <KegagalanFunnelPanel funnel={data.funnel} periodeLabel={data.periodeLabel} />

      <MetricCards
        columns={2}
        items={[
          { label: "Menunggu klasifikasi", value: data.metrics.menungguKlasifikasi },
          { label: "Catatan normal", value: data.metrics.catatanNormal },
          { label: "Catatan tidak normal", value: data.metrics.catatanAbnormal },
          { label: "Tidak layak panen", value: data.metrics.totalTidakLayakPanen },
        ]}
      />

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
    return (
      <PageSection title="Menunggu klasifikasi Admin" badge="Read">
        <KegagalanLogTabel
          rows={data.pending}
          emptyMessage="Tidak ada catatan menunggu klasifikasi."
        />
      </PageSection>
    );
  }

  if (bagian === "total") {
    return (
      <PageSection title="Total susut per siklus" badge="Read">
        <p className="mb-3 text-sm text-muted-foreground">
          Akumulasi susut per siklus tanam pada periode filter.
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
            { label: "Bibit (catatan normal)", value: data.metrics.bibitNormal },
            { label: "Bibit (catatan tidak normal)", value: data.metrics.bibitAbnormal },
          ]}
        />
        <div className="mt-4">
          <KegagalanLogTabel
            rows={data.riwayat.filter(
              (r) => r.kategori === "Normal" || r.kategori === "Tidak normal",
            )}
            showKategori
            emptyMessage="Belum ada riwayat klasifikasi pada filter ini."
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
      <KegagalanLogTabel rows={data.riwayat} showKategori />
    </PageSection>
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
    return <p className="text-sm text-muted-foreground">Belum ada data siklus pada filter ini.</p>;
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
