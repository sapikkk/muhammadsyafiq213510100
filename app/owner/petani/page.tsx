import { redirect } from "next/navigation";

export default function OwnerPetaniRedirect() {
  redirect("/pengaturan?bagian=tim&tim=petani");
}
