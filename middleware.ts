import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Role } from "@/types/role";

const home: Record<Role, string> = {
  OWNER: "/owner",
  ADMIN: "/admin",
  PEKERJA: "/petani",
};

function requiredRole(pathname: string): Role | null {
  if (pathname.startsWith("/owner")) return "OWNER";
  if (pathname.startsWith("/admin")) return "ADMIN";
  if (pathname.startsWith("/petani")) return "PEKERJA";
  return null;
}

export async function middleware(request: NextRequest) {
  const role = requiredRole(request.nextUrl.pathname);
  if (!role) return NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.role) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (token.role !== role) {
    const url = request.nextUrl.clone();
    url.pathname = home[token.role as Role] ?? "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/admin/:path*", "/petani/:path*"],
};
