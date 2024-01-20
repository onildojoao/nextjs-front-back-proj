import CharactersForm from "@/app/components/CharactersForm"
import CharactersTable from "@/app/components/CharactersTable"
import PurchasesForm from "@/app/components/PurchasesForm"
import PurchasesTable from "@/app/components/PurchasesTable"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
}

const DashboardPage = () => {
  return (
    <main className="flex gap-3 items-center justify-center p-5 h-[calc(100vh-65px)]">
      <div className="flex flex-col gap- items-center p-5 shadow border-3 rounded-lg w-[500px] max-w-4xl space-y-5 bg-white min-h-[600px]">
        <CharactersForm />
        <CharactersTable />
      </div>
      <div className="flex flex-col gap- items-center p-5 shadow border-3 rounded-lg w-[500px] max-w-4xl space-y-5 bg-white min-h-[600px]">
        <PurchasesForm />
        <PurchasesTable />
      </div>
    </main>
  )
}

export default DashboardPage
