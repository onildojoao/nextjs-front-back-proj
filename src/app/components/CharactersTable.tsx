/* eslint-disable react/jsx-key */
"use client"

import { findCharacters } from "@/lib/actions/findActions"
import { PencilIcon } from "@heroicons/react/20/solid"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

function teste() {
  toast.success("Não deu tempo de implementar essa função!")
}

async function loadCharacters(session) {
  const characters = await findCharacters(session.user.id)
  /* const mapped = () => {
    characters.map((char) => (
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap  px-6 py-4">{char.name}</td>
        <td className="whitespace-nowrap  px-6 py-4">{char.class}</td>
        <td className="whitespace-nowrap  px-6 py-4">101010</td>
        <td className="whitespace-nowrap  px-6 py-4">
          <div className="flex w-full justify-center">
            <PencilIcon
              onClick={teste}
              className="w-7 p-1 self-center cursor-pointer hover:bg-blue-300 border rounded"
            />
          </div>
        </td>
      </tr>
    ))
  } */
  return characters
}

const CharactersTable = () => {
  const { data: session } = useSession()

  const retrievedCharacters = loadCharacters(session)
  console.log(retrievedCharacters)
  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-center mb-5 font-bold">Histórico de Personagens</h2>
      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
          <tr>
            <th scope="col" className=" px-6 py-4">
              Nome
            </th>
            <th scope="col" className=" px-6 py-4">
              Classe
            </th>
            <th scope="col" className=" px-6 py-4">
              Criação
            </th>
            <th scope="col" className=" px-6 py-4">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {}
          {/* {retrievedCharacters.map((char) => (
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap  px-6 py-4">{char.name}</td>
              <td className="whitespace-nowrap  px-6 py-4">{char.class}</td>
              <td className="whitespace-nowrap  px-6 py-4">101010</td>
              <td className="whitespace-nowrap  px-6 py-4">
                <div className="flex w-full justify-center">
                  <PencilIcon
                    onClick={teste}
                    className="w-7 p-1 self-center cursor-pointer hover:bg-blue-300 border rounded"
                  />
                </div>
              </td>
            </tr>
          ))} */}
          <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap  px-6 py-4">Foema</td>
            <td className="whitespace-nowrap  px-6 py-4">Druid</td>
            <td className="whitespace-nowrap  px-6 py-4">07/10/2023</td>
            <td className="whitespace-nowrap  px-6 py-4">
              <div className="flex w-full justify-center">
                <PencilIcon className="w-7 p-1 self-center cursor-pointer hover:bg-blue-300 border rounded" />
              </div>
            </td>
          </tr>
          <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap  px-6 py-4">Ciantis</td>
            <td className="whitespace-nowrap  px-6 py-4">Huntress</td>
            <td className="whitespace-nowrap  px-6 py-4">19/10/2023</td>
            <td className="whitespace-nowrap  px-6 py-4">
              <div className="flex w-full justify-center">
                <PencilIcon
                  onClick={teste}
                  className="w-7 p-1 self-center cursor-pointer hover:bg-blue-300 border rounded"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CharactersTable
