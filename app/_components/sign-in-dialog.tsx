import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export function SignInDialog() {
  async function handleLoginWithGoogleClick() {
    signIn('google')
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>Conecte-se usando sua conta do Google.</DialogDescription>
      </DialogHeader>
      <Button variant='outline' className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}>
        <Image src='/google.svg' alt="Fazer login com o google" width={18}
          height={18} />
        Google
      </Button>
    </>
  )
}