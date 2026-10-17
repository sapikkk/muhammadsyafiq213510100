import { Suspense } from "react";
import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { SiklusBaruScreen } from "@/components/siklus-baru-screen";

function SiklusBaruSheetFallback() {
  return (
    <p className="text-sm text-muted-foreground" role="status">
      Memuat form semai…
    </p>
  );
}

/** Intercept dari daftar — form semai di sheet samping. */
export default function PetaniSiklusBaruInterceptSlot() {
  return (
    <DetailSheetFrame listHref="/petani/siklus">
      <Suspense fallback={<SiklusBaruSheetFallback />}>
        <SiklusBaruScreen surface="sheet" />
      </Suspense>
    </DetailSheetFrame>
  );
}
