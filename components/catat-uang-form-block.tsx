import { JurnalBaruPanel } from "@/components/jurnal-baru-panel";
import { keTanggalIso } from "@/lib/format";
import { loadCatatUangPihakBundle } from "@/lib/catat-uang-pihak";
import { listAkunPosting } from "@/lib/jurnal";
import { listInfrastrukturPohon } from "@/lib/infrastruktur";
import { getPeriodeTutup } from "@/lib/period-lock";
import { ensureRekeningKasDefaults, listRekeningKasAktif } from "@/lib/rekening-kas";
import { labelLahanUntukLayar } from "@/lib/produksi-ui-labels";

export async function CatatUangFormBlock() {
  const [akun, lock, pohon, pihak, rekeningOptions] = await Promise.all([
    listAkunPosting(),
    getPeriodeTutup(),
    listInfrastrukturPohon(),
    loadCatatUangPihakBundle(),
    (async () => {
      await ensureRekeningKasDefaults();
      return listRekeningKasAktif();
    })(),
  ]);
  const periodeTutup = lock ? lock.toISOString().slice(0, 10) : null;
  const lahanOptions = pohon.map((l) => {
    const gh = l.greenhouse.map((g) => g.nama).join(", ");
    return {
      id: l.id,
      label: labelLahanUntukLayar(l.id, gh || null),
    };
  });

  return (
    <JurnalBaruPanel
      akun={akun}
      tanggalAwal={keTanggalIso(new Date())}
      periodeTutup={periodeTutup}
      lahanOptions={lahanOptions}
      pihak={pihak}
      rekeningOptions={rekeningOptions}
    />
  );
}
