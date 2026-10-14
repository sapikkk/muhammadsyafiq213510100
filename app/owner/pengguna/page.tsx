import { redirect } from "next/navigation";

export default function OwnerPenggunaRedirect() {
  redirect("/pengaturan?bagian=tim&tim=pengguna");
}
