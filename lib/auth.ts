import "server-only";

import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { Role } from "@/types/role";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Sandi", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase() ?? "";
        const password = credentials?.password?.toString() ?? "";
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const matches = await compare(password, user.passwordHash);
        if (!matches) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.nama,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user && "role" in user) {
        token.role = user.role as Role;
        token.mustChangePassword = user.mustChangePassword;
      }
      if (trigger === "update" && token.sub) {
        const fresh = await prisma.user.findUnique({
          where: { id: Number(token.sub) },
          select: { mustChangePassword: true, nama: true },
        });
        token.mustChangePassword = fresh?.mustChangePassword ?? false;
        if (fresh?.nama) token.name = fresh.nama;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.role) session.user.role = token.role as Role;
        session.user.id = token.sub ?? "";
        session.user.mustChangePassword = token.mustChangePassword ?? false;
      }
      return session;
    },
  },
};
