"use server"

import { Character, Purchase, User } from "@prisma/client"

import * as bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"

export async function findCharacters(userId: any) {
  return await prisma.character.findMany({
    where: { userId: userId },
  })
 /*  console.log(result)
  return result */
}

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
