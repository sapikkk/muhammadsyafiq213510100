import { NextResponse } from "next/server";
import { fetchCuacaLokal } from "@/lib/cuaca";

export async function GET() {
  const cuaca = await fetchCuacaLokal();
  if (!cuaca) {
    return NextResponse.json({ error: "Cuaca tidak tersedia" }, { status: 503 });
  }
  return NextResponse.json(cuaca);
}
