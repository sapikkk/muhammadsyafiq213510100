import "server-only";

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
          await new Promise((r) => setTimeout(r, 250));
          try {
            return await query(args);
          } catch (retry1) {
            if (!isPoolTimeout(retry1)) throw retry1;
            await new Promise((r) => setTimeout(r, 500));
            return query(args);
          }
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

/** Default interaktif — Prisma 5s terlalu ketat untuk SO / panen multi-query. */
export const PRISMA_TX_OPTS = { maxWait: 10_000, timeout: 20_000 } as const;

export function runTransaction<T>(
  fn: (tx: PrismaTransaction) => Promise<T>,
  opts?: { timeout?: number; maxWait?: number },
) {
  return prisma.$transaction(fn, {
    maxWait: opts?.maxWait ?? PRISMA_TX_OPTS.maxWait,
    timeout: opts?.timeout ?? PRISMA_TX_OPTS.timeout,
  });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
