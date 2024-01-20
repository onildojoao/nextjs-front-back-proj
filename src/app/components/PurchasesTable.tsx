"use client"

import { findPurchases } from "@/lib/actions/findActions"
import { PurchaseItem } from "@/types/purchase"
import { log } from "console"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"

async function loadPurchases(session: any) {
  const purchases: PurchaseItem[] = await findPurchases(session.user.id)
  console.log(purchases)
  return purchases
}

const PurchasesTable = () => {
  const { data: session } = useSession()

  const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>()

  const initPurchaseData = useCallback(async () => {
    const retrievedPurchases = await loadPurchases(session)
    setPurchaseList(retrievedPurchases)
    console.log(retrievedPurchases)
  }, [session])

  useEffect(() => {
    initPurchaseData()
  }, [initPurchaseData])

  function processStringDate(param: string | null) {
    if (!param) return
    console.log(param)
    const date = new Date(Number(param))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${day}/${month}/${year}`
  }

  function renderPurchaseList(): React.ReactNode {
    if (!purchaseList?.length) return

    return (
      <tbody>
        {purchaseList?.map((purchaseItem, index) => (
          <tr
            key={`${purchaseItem.id}--${index}`}
            className="border-b dark:border-neutral-500"
          >
            <td className="whitespace-nowrap  px-6 py-4">
              {processStringDate(purchaseItem.createdAt)}
            </td>
            <td className="whitespace-nowrap  px-6 py-4">
              {purchaseItem.value}
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-center mb-5 font-bold">Histórico de Compras</h2>
      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
          <tr>
            <th scope="col" className=" px-6 py-4">
              Data
            </th>
            <th scope="col" className=" px-6 py-4">
              Valor
            </th>
          </tr>
        </thead>
        {renderPurchaseList()}
      </table>
    </div>
  )
}

export default PurchasesTable
