//lib/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // biar PrismaClient nggak bikin koneksi berulang di dev mode
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
