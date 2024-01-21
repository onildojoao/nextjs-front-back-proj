"use server"

import { prisma } from "@/lib/prisma"

//Função de busca de personagens com o prisma
export async function findCharacters(userId: any) {
  return prisma.character.findMany({
    where: { userId: userId },
  })
}

//Função de busca de compras com o prisma
export async function findPurchases(userId: any) {
    return prisma.purchase.findMany({
    where: { userId: userId },
  })
}
