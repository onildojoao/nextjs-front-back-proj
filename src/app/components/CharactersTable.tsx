/* eslint-disable react/jsx-key */
"use client"

import { findCharacters } from "@/lib/actions/findActions"
import { CharacterItem } from "@/types/character"
import { PencilIcon } from "@heroicons/react/20/solid"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

function teste() {
  toast.success("Não deu tempo de implementar essa função!")
}

async function loadCharacters(session: any) {
  const characters = await findCharacters(session.user.id)
  console.log("Characters:" + characters)
  return characters
}

const CharactersTable = () => {
  const { data: session } = useSession()

  const [characterList, setCharacterList] = useState<CharacterItem[]>()

  const initCharacterData = useCallback(async () => {
    const retrievedCharacters = await loadCharacters(session)
    setCharacterList(retrievedCharacters)
    console.log(retrievedCharacters)
  }, [session])

  useEffect(() => {
    initCharacterData()
  }, [initCharacterData])

  function processStringDate(param: string | null) {
    if (!param) return
    console.log(param)
    const date = new Date(Number(param))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${day}/${month}/${year}`
  }

  function renderCharacterList(): React.ReactNode {
    if (!characterList?.length) return

    return (
      <tbody>
        {characterList?.map((characterItem, index) => (
          <tr
            key={`${characterItem.id}--${index}`}
            className="border-b dark:border-neutral-500"
          >
            <td className="whitespace-nowrap  px-6 py-4">
              {characterItem.name}
            </td>
            <td className="whitespace-nowrap  px-6 py-4">
              {characterItem.class}
            </td>
            <td className="whitespace-nowrap  px-6 py-4">
              {processStringDate(characterItem.createdAt)}
            </td>
            <td className="whitespace-nowrap  px-6 py-4">
              <div className="flex w-full justify-center">
                <PencilIcon
                  onClick={teste}
                  className="w-7 p-1 self-center cursor-pointer hover:bg-blue-300 border rounded"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

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
        {renderCharacterList()}
        {/* <tbody>
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
        </tbody> */}
      </table>
    </div>
  )
}

export default CharactersTable
