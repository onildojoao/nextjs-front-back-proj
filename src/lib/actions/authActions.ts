"use server"

import { Character, Purchase, User } from "@prisma/client"

import * as bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"

export async function registerUser(
  user: Omit<
    User,
    "id" | "emailVerified" | "image" | "phone" | "createdAt" | "updatedAt"
  >
) {
  const populatedUser = user
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  })
}

export async function registerCharacter(
  character: Omit<Character, "id" | "userId" | "createdAt" | "updatedAt">
) {
  const populatedUser = character
  const result = await prisma.character.create({
    data: { ...character },
  })
}

export async function registerPurchase(
  purchase: Omit<Purchase, "id" | "userId" | "createdAt">
) {
  const populatedUser = purchase
   const result = await prisma.purchase.create({
    data: { ...purchase },
  }) 
}
