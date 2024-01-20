"use client"
import { registerUser } from "@/lib/actions/authActions"
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon
} from "@heroicons/react/20/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
   password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  })

type InputType = z.infer<typeof FormSchema>

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })
  const [passStrength, setPassStrength] = useState(0)
  const [isVisiblePass, setIsVisiblePass] = useState(false)

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const toggleVisiblePassword = () => {
    setIsVisiblePassword((prev) => !prev)
  }

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...user } = data
    try {
      const result = await registerUser(user)
      toast.success("The User Registered Successfully.")
    } catch (error) {
      toast.error("Something Went Wrong!")
      console.error(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="p-5 shadow border-3 rounded-lg w-[500px] max-w-4xl space-y-5 bg-white"
    >
      <h1 className="text-center text-black text-2xl font-bold w-full">
        Cadastro de Usuário
      </h1>
      <Input
        {...register("firstName")}
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        label="Nome do usuário"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("lastName")}
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        label="Nome do usuário"
        startContent={<UserIcon className="w-4" />}
      />
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
      <Input
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        label="Confirmação de Senha"
        type={isVisiblePassword ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
      />
      <div className="flex justify-center col-span-2">
        <Button className="w-full bg-test text-white " type="submit">
          Criar Conta
        </Button>
      </div>
    </form>
  )
}

export default SignUpForm
