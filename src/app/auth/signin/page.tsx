import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <main className="flex flex-col items-center justify-center p-5 h-[calc(100vh-65px)]">
      <SignInForm callbackUrl={searchParams.callbackUrl} />
    </main>
  )
};

export default SigninPage;
