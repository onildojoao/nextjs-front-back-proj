"use server"

import { Character, Purchase, User } from "@prisma/client"

import * as bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"

export async function findCharacters(userId: any) {
  const result = await prisma.character.findMany({
    where: { userId: userId },
  })
  console.log("Personagens:" + result)
  return result
}

export async function findPurchases(userId: any) {
  const result = await prisma.purchase.findMany({
    where: { userId: userId },
  })
  console.log("Compras:" + result)
  return result
}
