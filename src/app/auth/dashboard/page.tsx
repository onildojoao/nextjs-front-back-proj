import CharactersForm from "@/app/components/CharactersForm"
import CharactersTable from "@/app/components/CharactersTable"
import PurchasesForm from "@/app/components/PurchasesForm"
import PurchasesTable from "@/app/components/PurchasesTable"

const DashboardPage = () => {
  return (
    <main className="grid justify-items-center col-span-2 p-2 mt-5 shadow border-3 rounded-lg bg-white">
      <div>
        <CharactersForm />
        <CharactersTable />
      </div>
      <div>
        <PurchasesForm />
        <PurchasesTable />
      </div>
    </main>
  )
}

export default DashboardPage
