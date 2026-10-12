import { Suspense } from "react";
import { SiklusBaruScreen } from "@/components/siklus-baru-screen";
import SiklusBaruLoading from "./loading";

export const dynamic = "force-dynamic";

export default function PetaniSiklusBaruPage() {
  return (
    <Suspense fallback={<SiklusBaruLoading />}>
      <SiklusBaruScreen surface="page" />
    </Suspense>
  );
}
