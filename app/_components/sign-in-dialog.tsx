"use client"
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react"

export function SignInDialog() {
  async function handleLoginWithGoogleClick() {
    signIn("google")
  }

  async function handleLoginWithGitgubClick() {}

  return (
    <>
      <DialogHeader>
        <DialogTitle className="sm:text-center sm:text-base sm:font-bold sm:text-white">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription className="text-center text-sm font-normal text-[#838896] sm:text-[#838896]">
          Conecte-se usando sua conta do Google ou{"\n"} Github.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center justify-center gap-2 sm:flex sm:gap-2">
        <Button
          variant="outline"
          className="max-h-9 max-w-[134px] gap-1 font-bold sm:h-9 sm:w-[134px]"
          onClick={handleLoginWithGoogleClick}
        >
          <Image
            src="/google.svg"
            alt="Fazer login com o google"
            width={18}
            height={18}
          />
          Google
        </Button>
        <Button
          variant="outline"
          className="max-h-9 max-w-[134px] gap-1 font-bold sm:h-9 sm:w-[134px]"
          onClick={handleLoginWithGitgubClick}
        >
          <Image
            src="/github.svg"
            alt="Fazer login com o github"
            width={18}
            height={18}
          />
          Github
        </Button>
      </div>
    </>
  )
}
