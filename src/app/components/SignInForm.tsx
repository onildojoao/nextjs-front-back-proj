"use client"
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/20/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { signIn } from "next-auth/react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import NextAuthProviders from "./NextAuthProviders"

interface Props {
  callbackUrl?: string
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
})

type InputType = z.infer<typeof FormSchema>

const SignInForm = (props: Props) => {
  const router = useRouter()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const toggleVisiblePassword = () => {
    setIsVisiblePassword((prev) => !prev)
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    })
    if (!result?.ok) {
      toast.error(result?.error)
      return
    }
    toast.success("Bem vindo ao seu Dashboard!")
    router.push(props.callbackUrl ? props.callbackUrl : "/")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 shadow border-3 rounded-lg w-[500px] max-w-4xl space-y-5 bg-white"
    >
      <h1 className="text-center text-black text-2xl font-bold w-full">
        Login
      </h1>
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        label="Senha"
        type={isVisiblePassword ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={
          isVisiblePassword ? (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisiblePassword}
            />
          ) : (
            <EyeIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisiblePassword}
            />
          )
        }
      />

      <div className="flex justify-center col-span-2">
        <Button
          className="w-full bg-test text-white "
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
