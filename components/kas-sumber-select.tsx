import { AKUN_KODE } from "@/lib/akun-kode";

type Props = {
  name?: string;
  className?: string;
  defaultValue?: string;
};

const baseClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function KasSumberSelect({
  name = "sumberKas",
  className,
  defaultValue = AKUN_KODE.KAS,
}: Props) {
  return (
    <select name={name} className={className ?? baseClass} defaultValue={defaultValue}>
      <option value={AKUN_KODE.KAS}>Kas tunai (1100)</option>
      <option value={AKUN_KODE.BANK}>Bank (1110)</option>
    </select>
  );
}
