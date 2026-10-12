import { RekeningLabel } from "@/components/rekening-sumber-select";
import { MetricCards } from "@/components/metric-cards";
import { PageSection } from "@/components/page-section";
import { formatRupiah } from "@/lib/format";
import { ensureRekeningKasDefaults, listRekeningKasAktif } from "@/lib/rekening-kas";

export async function RekeningSaldoWidget() {
  await ensureRekeningKasDefaults();
  const rekening = await listRekeningKasAktif();

  if (rekening.length === 0) {
    return null;
  }

  return (
    <PageSection title="Saldo rekening" badge="Read">
      <MetricCards
        columns={rekening.length >= 4 ? 4 : rekening.length === 2 ? 2 : 3}
        items={rekening.map((r) => ({
          id: r.akunKode,
          label: <RekeningLabel option={r} />,
          value: formatRupiah(r.saldo),
        }))}
      />
    </PageSection>
  );
}
