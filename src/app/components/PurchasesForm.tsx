"use client"
import { registerPurchase } from "@/lib/actions/authActions"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const FormSchema = z.object({
  /*  value: z.string(),  */
  value: z.coerce.number().min(10),
  /* value: z.number()
  .or(z.string().regex(/\d+/).transform(Number))
  .refine((n) => n >= 0),*/
  /* createdAt: z.coerce.bigint().refine((data) => data > Date.now()), */
})

type InputType = z.infer<typeof FormSchema>

const PurchasesForm = () => {
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
    const purchase = data
    try {
      console.log(purchase)
      const result = await registerPurchase(purchase)
      toast.success("Compra realizada!")
    } catch (error) {
      toast.error("Algo deu errado...")
      console.error(error)
    }
    router.refresh()
    /* router.push("/auth/dashboard") */
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
