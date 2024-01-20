"use client"

import { Button } from "@nextui-org/react"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"

const SigninButton = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <Link
            href={"/profile"}
          >{`${session.user.firstName} ${session.user.lastName}`}</Link>
          <Link
            className="tex-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Button className="text-black font-bold" onClick={() => signIn()}>
            Entrar
          </Button>
          <Button
            className="text-black font-bold"
            as={Link}
            href={"/auth/signup"}
          >
            Cadastrar
          </Button>
        </>
      )}
    </div>
  )
}

export default SigninButton
