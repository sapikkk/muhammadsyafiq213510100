"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { submitSmartJurnal, type SmartJurnalState } from "@/app/actions/smart-jurnal";
import { KasSumberSelect } from "@/components/kas-sumber-select";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { AKUN_KODE } from "@/lib/akun-kode";
import {
  smartJurnalTipe,
  smartJurnalTipeLabel,
  type SmartJurnalTipe,
} from "@/lib/smart-jurnal-catalog";
import { UI_COPY } from "@/lib/ui-copy";
import { CatatUangPihakFields } from "@/components/catat-uang-pihak-fields";
import type { CatatUangPihakBundle } from "@/lib/catat-uang-pihak-types";
import type { RekeningKasOption } from "@/lib/rekening-kas-types";
import { RekeningSumberSelect } from "@/components/rekening-sumber-select";

const NO_KAS: SmartJurnalTipe[] = [
  "PENYUSUTAN_GREENHOUSE",
  "PENYUSUTAN_INSTALASI",
  "PEMBELIAN_BAHAN_KREDIT",
];

const selectClass =
  "flex h-11 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm";

type LahanOpt = { id: number; label: string };

export function SmartJurnalForm({
  tanggalAwal,
  periodeTutup,
  lahanOptions = [],
  pihak,
  rekeningOptions = [],
}: {
  tanggalAwal: string;
  periodeTutup: string | null;
  lahanOptions?: LahanOpt[];
  pihak: CatatUangPihakBundle;
  rekeningOptions?: RekeningKasOption[];
}) {
  const [state, formAction] = useFormState(submitSmartJurnal, {} as SmartJurnalState);
  const [tipe, setTipe] = useState<SmartJurnalTipe>("BEBAN_OPERASIONAL");
  useActionToast({ error: state.error, ok: state.ok });

  const showKas = !NO_KAS.includes(tipe);
  const showTujuan = tipe === "TRANSFER_KAS";

  return (
    <form action={formAction}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">Kolom</TableHead>
            <TableHead>Isian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="text-sm text-muted-foreground">
              Pilih jenis transaksi. Setelah disimpan, Admin atau Owner menyetujui sebelum saldo berubah.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-medium">Tipe</TableCell>
            <TableCell className="space-y-1">
              <select
                name="tipe"
                required
                className={selectClass}
                value={tipe}
                onChange={(e) => setTipe(e.target.value as SmartJurnalTipe)}
              >
                {smartJurnalTipe.map((id) => (
                  <option key={id} value={id}>
                    {smartJurnalTipeLabel[id]}
                  </option>
                ))}
              </select>
              {tipe === "SUNTIKAN_MODAL" ? (
                <p className="text-xs text-muted-foreground">
                  Setoran modal pemilik — bukan pendapatan jual sayur.
                </p>
              ) : null}
              {tipe === "PENDAPATAN_LAIN" ? (
                <p className="text-xs text-muted-foreground">
                  Uang masuk di luar penjualan sayur. Modal pemilik pilih «Suntikan modal».
                </p>
              ) : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Nominal (Rp)</TableCell>
            <TableCell>
              <Input name="nominal" inputMode="decimal" className="h-11 max-w-md" required placeholder="250000" />
            </TableCell>
          </TableRow>
          {showKas ? (
            <TableRow>
              <TableCell className="font-medium">{showTujuan ? "Transfer dari" : "Sumber kas"}</TableCell>
              <TableCell>
                <KasSumberSelect rekeningOptions={rekeningOptions} className={selectClass} />
              </TableCell>
            </TableRow>
          ) : null}
          {showTujuan ? (
            <TableRow>
              <TableCell className="font-medium">Transfer ke</TableCell>
              <TableCell>
                {rekeningOptions.length > 0 ? (
                  <RekeningSumberSelect
                    name="tujuanKas"
                    className={selectClass}
                    defaultValue={rekeningOptions.find((r) => r.jenis !== "TUNAI")?.akunKode ?? rekeningOptions[0]?.akunKode}
                    options={rekeningOptions}
                  />
                ) : (
                  <select name="tujuanKas" className={selectClass} defaultValue={AKUN_KODE.BANK}>
                    <option value={AKUN_KODE.KAS}>Kas tunai</option>
                    <option value={AKUN_KODE.BANK}>Bank</option>
                  </select>
                )}
              </TableCell>
            </TableRow>
          ) : null}
          <CatatUangPihakFields tipe={tipe} pihak={pihak} layout="table" />
          {tipe === "BAYAR_LISTRIK" && lahanOptions.length > 0 ? (
            <>
              <TableRow>
                <TableCell className="font-medium">Lahan (HPP)</TableCell>
                <TableCell>
                  <select name="lahanId" className={selectClass} defaultValue={String(lahanOptions[0]?.id ?? "")}>
                    {lahanOptions.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sync listrik HPP</TableCell>
                <TableCell>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="syncListrikHpp" defaultChecked className="h-4 w-4" />
                    Samakan biaya listrik lahan dengan nominal bayar
                  </label>
                </TableCell>
              </TableRow>
            </>
          ) : null}
          <TableRow>
            <TableCell className="font-medium">Tanggal</TableCell>
            <TableCell>
              <Input name="tanggal" type="date" defaultValue={tanggalAwal} className="h-11 max-w-md" required />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Catatan (opsional)</TableCell>
            <TableCell>
              <Input name="catatan" maxLength={200} className="h-11 max-w-md" placeholder="Detail singkat" />
            </TableCell>
          </TableRow>
          {periodeTutup ? (
            <TableRow>
              <TableCell className="font-medium">Lewati tutup periode</TableCell>
              <TableCell>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="adminOverridePeriod" className="h-4 w-4" />
                  {UI_COPY.tutupPeriodeOverride} ({periodeTutup})
                </label>
              </TableCell>
            </TableRow>
          ) : null}
          <TableRow>
            <TableCell />
            <TableCell>
              <input type="hidden" name="status" value="PENDING" />
              <SubmitButton className="h-11" pendingLabel="Menyimpan…">
                Catat uang
              </SubmitButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
