import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Role } from "@/types/role";

function requiredRole(pathname: string): Role | null {
  if (pathname.startsWith("/owner")) return "OWNER";
  if (pathname.startsWith("/admin")) return "ADMIN";
  if (pathname.startsWith("/petani")) return "PEKERJA";
  return null;
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.role) return redirectTo(request, "/login");

  if (pathname.startsWith("/ganti-sandi")) return NextResponse.next();
  if (token.mustChangePassword) return redirectTo(request, "/ganti-sandi");

  const role = requiredRole(pathname);
  if (role && token.role !== role) {
    return redirectTo(request, "/akses-ditolak");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/owner/:path*",
    "/admin/:path*",
    "/petani/:path*",
    "/ganti-sandi",
    "/akses-ditolak",
    "/pengaturan",
  ],
};
