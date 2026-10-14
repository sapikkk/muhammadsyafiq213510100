import { redirect } from "next/navigation";
import { FlashToast } from "@/components/flash-toast";
import { SiklusDetailScreen } from "@/components/siklus-detail-screen";

export const dynamic = "force-dynamic";

export default function PetaniSiklusDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lubang?: string; rw?: string };
}) {
  if (params.id === "baru") redirect("/petani/siklus/baru");

  const lubang = Number(searchParams.lubang);
  let toast: string | undefined;
  if (Number.isInteger(lubang) && lubang > 0) {
    toast = `Semai ${lubang.toLocaleString("id-ID")} lubang tersimpan.`;
    if (searchParams.rw === "1") {
      toast += " Biaya rockwool ikut tercatat.";
    } else {
      toast += " Tanpa media rockwool (biaya rockwool nol).";
    }
  }

  return (
    <>
      <FlashToast message={toast} />
      <SiklusDetailScreen id={Number(params.id)} tampilkanBiayaSemai />
    </>
  );
}
