/* import NextAuth from "next-auth/next"
import authOptions from "./route"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } */


import prisma from "@/lib/prisma"
import * as bcrypt from "bcrypt"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

import { User } from "@prisma/client"

const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Usuário",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        })

        if (!user) throw new Error("Usuário ou senha inválida!")

        // This is Naive Way of Comparing The Passwords
        if (!credentials?.password) throw new Error("Digite a senha!")
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordCorrect) throw new Error("Usuário ou senha incorreta!")

        const { password, ...userWithoutPass } = user
        return userWithoutPass
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User
      return token
    },

    async session({ token, session }) {
      session.user = token.user
      return session
    },
  },
}

export default authOptions