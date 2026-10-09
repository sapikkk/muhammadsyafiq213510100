import { Prisma, PrismaClient } from "@prisma/client";

// FINDING-01: pool Prisma Postgres sering habis (P2024). Ulang sekali untuk semua query
// di satu tempat, bukan per action.
function isPoolTimeout(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2024"
  );
}

function buildClient() {
  return new PrismaClient().$extends({
    query: {
      async $allOperations({ args, query }) {
        try {
          return await query(args);
        } catch (error) {
          if (!isPoolTimeout(error)) throw error;
          return query(args);
        }
      },
    },
  });
}

type Client = ReturnType<typeof buildClient>;

const globalForPrisma = globalThis as unknown as { prisma?: Client };

export const prisma = globalForPrisma.prisma ?? buildClient();

export type PrismaTransaction = Parameters<
  Parameters<typeof prisma.$transaction>[0]
>[0];

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
