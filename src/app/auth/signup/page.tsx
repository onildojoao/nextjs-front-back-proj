import SignUpForm from "@/app/components/SignUpForm";
import { Image, Link } from "@nextui-org/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tela de Cadastro",
}
const SignupPage = () => {
  return (
    <main className="flex flex-col items-center justify-center p-5 h-[calc(100vh-65px)]">
      <SignUpForm />
      <div className="grid justify-items-center col-span-2 p-2 mt-5 shadow border-3 rounded-lg bg-white">
        <p className="text-center p-2">Já possui uma conta?</p>
        <Link href={"/auth/signin"}>Entrar</Link>
      </div>
    </main>
  )
};

export default SignupPage;
