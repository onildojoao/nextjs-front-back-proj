"use server"

import { Character, Purchase, User } from "@prisma/client"

import * as bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"

//Função de criação de usuários com o prisma
export async function registerUser(
  user: Omit<
    User,
    "id" | "emailVerified" | "image" | "phone" | "createdAt" | "updatedAt"
  >
) {
  const populatedUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    createdAt: String(new Date().getTime()),
  }

  const result = await prisma.user.create({
    data: {
      ...populatedUser,
      password: await bcrypt.hash(user.password, 10),
    },
  })
}

//Função de criação de personagens com o prisma
export async function registerCharacter(
  character: Omit<Character, "id" | "createdAt" | "updatedAt">
) {
  const populatedUser = {
    userId: character.userId,
    name: character.name,
    class: character.class,
    createdAt: String(new Date().getTime()),
  }

  const result = await prisma.character.create({
    data: { ...populatedUser },
  })
}

//Função de criação de compras com o prisma
export async function registerPurchase(
  purchase: Omit<Purchase, "id" | "createdAt">
) {
  console.log(purchase)
  const populatedUser = {
    userId: purchase.userId,
    value: purchase.value,
    createdAt: String(new Date().getTime()),
  }

  const result = await prisma.purchase.create({
    data: { ...populatedUser },
  })
}
