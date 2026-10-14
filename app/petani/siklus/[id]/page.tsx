import { redirect } from "next/navigation";
import { FlashToast } from "@/components/flash-toast";
import { SiklusDetailScreen } from "@/components/siklus-detail-screen";

export const dynamic = "force-dynamic";

export default function PetaniSiklusDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lubang?: string };
}) {
  if (params.id === "baru") redirect("/petani/siklus/baru");

  const lubang = Number(searchParams.lubang);
  const toast =
    Number.isInteger(lubang) && lubang > 0
      ? `Semai ${lubang} lubang tersimpan.`
      : undefined;

  return (
    <>
      <FlashToast message={toast} />
      <SiklusDetailScreen id={Number(params.id)} />
    </>
  );
}
