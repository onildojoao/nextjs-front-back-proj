"use server"

import { User } from "@prisma/client"

import * as bcrypt from "bcrypt"
import {
  compileActivationTemplate,
  compileResetPassTemplate,
  sendMail,
} from "../mail"
import { signJwt, verifyJwt } from "../jwt"
import { prisma } from "@/lib/prisma"

export async function registerUser(
  user: Omit<
    User,
    "id" | "emailVerified" | "image" | "phone" | "createdAt" | "updatedAt"
  >
) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  })
}
