import { Button } from "@nextui-org/react";

import { signIn } from "next-auth/react";

const NextAuthProviders = () => {
  const googleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "/",
    });
    console.log({ result });
  };
  return (
   <></>
  );
};

export default NextAuthProviders;
