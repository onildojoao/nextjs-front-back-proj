const PurchasesTable = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-center mb-5 font-bold">Histórico de Compras</h2>
      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
          <tr>
            <th scope="col" className=" px-6 py-4">
              Valor
            </th>
            <th scope="col" className=" px-6 py-4">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap  px-6 py-4">Nome 01</td>
            <td className="whitespace-nowrap  px-6 py-4">Classe 01</td>
          </tr>
          <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap  px-6 py-4">Nome 01</td>
            <td className="whitespace-nowrap  px-6 py-4">Classe 01</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PurchasesTable
