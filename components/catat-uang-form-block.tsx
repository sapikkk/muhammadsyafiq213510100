import { JurnalBaruPanel } from "@/components/jurnal-baru-panel";
import { keTanggalIso } from "@/lib/format";
import { loadCatatUangPihakBundle } from "@/lib/catat-uang-pihak";
import { listAkunPosting } from "@/lib/jurnal";
import { listInfrastrukturPohon } from "@/lib/infrastruktur";
import { getPeriodeTutup } from "@/lib/period-lock";

export async function CatatUangFormBlock() {
  const [akun, lock, pohon, pihak] = await Promise.all([
    listAkunPosting(),
    getPeriodeTutup(),
    listInfrastrukturPohon(),
    loadCatatUangPihakBundle(),
  ]);
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;
  const lahanOptions = pohon.map((l) => ({
    id: l.id,
    label: `Lahan #${l.id}`,
  }));

  return (
    <JurnalBaruPanel
      akun={akun}
      tanggalAwal={keTanggalIso(new Date())}
      periodeTutup={periodeTutup}
      lahanOptions={lahanOptions}
      pihak={pihak}
    />
  );
}
