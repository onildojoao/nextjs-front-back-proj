"use server"

import { prisma } from "@/lib/prisma"

export async function findCharacters(userId: any) {
  return prisma.character.findMany({
    where: { userId: userId },
  })
}

export async function findPurchases(userId: any) {
  /*  const result = await prisma.purchase.findMany({
    where: { userId: userId },
  })
  console.log("Compras:" + result)
  return result */

  /* prisma.purchase
  .findMany({
    where: { userId: userId },
  })
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.error("Erro ao buscar compras:" + err)
  }) */

  return prisma.purchase.findMany({
    where: { userId: userId },
  })
}
