"use client"
import { registerCharacter } from "@/lib/actions/authActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const FormSchema = z.object({
  name: z
    .string()
    .min(2, "O nome precisa ter ao menos 2 caracteres!")
    .max(45, "O nome pode ter no máximo 45 caracteres!"),
  class: z
    .string()
    .min(2, "O sobrenome precisa ter ao menos 2 caracteres!")
    .max(45, "O sobrenome pode ter no máximo 45 caracteres!"),
})

type InputType = z.infer<typeof FormSchema>

const CharactersForm = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const saveCharacter: SubmitHandler<InputType> = async (data) => {
    if (!session) {
      toast.error("Falha ao obter dados do usuário!")
      router.push("/auth/signin")
      return
    }

    const character = {
      name: data.name,
      class: data.class,
      userId: session.user.id,
    }
    /* const character = data */
    try {
      const result = await registerCharacter(character)
      toast.success("Personagem criado!")
    } catch (error) {
      toast.error("Algo deu errado...")
      console.error(error)
    }
    router.refresh()
    /* router.push("/auth/dashboard") */
  }
  return (
    <form
      onSubmit={handleSubmit(saveCharacter)}
      className="p-5 w-[500px] max-w-4xl space-y-5"
    >
      <h1 className="text-center text-black text-2xl font-bold w-full">
        Criação de Personagem
      </h1>
      <Input
        {...register("name")}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label="Nome do Personagem"
      />
      <Input
        {...register("class")}
        errorMessage={errors.class?.message}
        isInvalid={!!errors.class}
        label="Classe"
      />

      <div className="flex justify-center col-span-2">
        <Button
          className="w-full bg-test text-white "
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Criando..." : "Criar"}
        </Button>
      </div>
    </form>
  )
}

export default CharactersForm
