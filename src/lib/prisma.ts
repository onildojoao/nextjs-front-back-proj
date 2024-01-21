import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

//Disponilizando o prisma de forma global
export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
