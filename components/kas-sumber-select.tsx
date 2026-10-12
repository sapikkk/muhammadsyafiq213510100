import { RekeningSumberSelect } from "@/components/rekening-sumber-select";
import { AKUN_KODE } from "@/lib/akun-kode";
import type { RekeningKasOption } from "@/lib/rekening-kas-types";

type Props = {
  name?: string;
  className?: string;
  defaultValue?: string;
  /** Daftar rekening dari server; kosong = fallback kas/bank generik. */
  rekeningOptions?: RekeningKasOption[];
};

const baseClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function KasSumberSelect({
  name = "sumberKas",
  className,
  defaultValue = AKUN_KODE.KAS,
  rekeningOptions,
}: Props) {
  if (rekeningOptions && rekeningOptions.length > 0) {
    return (
      <RekeningSumberSelect
        name={name}
        className={className}
        defaultValue={defaultValue}
        options={rekeningOptions}
      />
    );
  }

  return (
    <select name={name} className={className ?? baseClass} defaultValue={defaultValue}>
      <option value={AKUN_KODE.KAS}>Kas tunai</option>
      <option value={AKUN_KODE.BANK}>Bank</option>
    </select>
  );
}
