import { RekeningLabel } from "@/components/rekening-sumber-select";
import { BentoSection } from "@/components/dashboard-bento";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { MetricCards } from "@/components/metric-cards";
import { PageSection } from "@/components/page-section";
import { formatRupiah } from "@/lib/format";
import { ensureRekeningKasDefaults, listRekeningKasAktif } from "@/lib/rekening-kas";

export async function RekeningSaldoWidget({ embedded }: { embedded?: boolean } = {}) {
  await ensureRekeningKasDefaults();
  const rekening = await listRekeningKasAktif();

  const body =
    rekening.length === 0 ? (
      <DashboardBentoEmpty
        message="Belum ada rekening kas. Tambahkan agar saldo tampil di beranda."
        actionLabel="Tambah rekening"
        href="/owner/rekening"
      />
    ) : (
      <MetricCards
        columns={rekening.length >= 4 ? 4 : rekening.length === 2 ? 2 : 3}
        items={rekening.map((r) => ({
          id: r.akunKode,
          label: <RekeningLabel option={r} />,
          value: formatRupiah(r.saldo),
          followUp: {
            actionLabel: "Kelola rekening",
            href: "/owner/rekening",
          },
        }))}
      />
    );

  if (embedded) return body;

  return (
    <PageSection title="Saldo rekening" badge="Read">
      {body}
    </PageSection>
  );
}

/** Beranda Owner (bento); selalu tampil, termasuk state kosong. */
export async function RekeningSaldoBentoSection() {
  const body = await RekeningSaldoWidget({ embedded: true });
  return (
    <BentoSection title="Saldo rekening" badge="Read">
      {body}
    </BentoSection>
  );
}
