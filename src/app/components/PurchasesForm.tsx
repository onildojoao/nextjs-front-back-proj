"use client"
import { registerPurchase } from "@/lib/actions/authActions"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
//Validações do formulário com o Zod
const FormSchema = z.object({
  value: z.string(),
})

type InputType = z.infer<typeof FormSchema>

const PurchasesForm = () => {
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

  const savePurchase: SubmitHandler<InputType> = async (data) => {
    if (!session) {
      toast.error("Falha ao obter dados do usuário!")
      router.push("/auth/signin")
      return
    }

    const purchase = {
      value: data.value,
      userId: session.user.id,
    }

    try {
      console.log(purchase)
      //Chamada da Rota para salvar a compra
      const result = await registerPurchase(purchase)
      toast.success(
        "Compra realizada! Atualize a página para ver as informações!"
      )
    } catch (error) {
      toast.error("Algo deu errado...")
      console.error(error)
    }
    //Atualização da página para exibir os novos dados
    router.refresh()
  }
  return (
    <form
      onSubmit={handleSubmit(savePurchase)}
      className="p-5 w-[500px] max-w-4xl space-y-5"
    >
      <h1 className="text-center text-black text-2xl font-bold w-full">
        Histórico de Compra de Cash
      </h1>
      <Input
        {...register("value")}
        type="number"
        errorMessage={errors.value?.message}
        isInvalid={!!errors.value}
        label="Quantidade de Cash"
      />

      <div className="flex justify-center col-span-2">
        <Button
          className="w-full bg-test text-white "
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Comprando..." : "Comprar"}
        </Button>
      </div>
    </form>
  )
}

export default PurchasesForm
