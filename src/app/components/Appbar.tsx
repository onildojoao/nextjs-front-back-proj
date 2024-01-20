import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import SigninButton from "./SigninButton"
import Link from "next/link"

const Appbar = () => {
  return (
    <Navbar className="bg-white" isBordered>
      <NavbarContent className="hidden sm:flex gap-4 bg-w" justify="center">
        <NavbarItem>Bem vindo!</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Appbar
