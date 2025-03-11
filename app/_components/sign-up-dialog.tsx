"use client"
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

export function SignUpDialog() {
  async function handleLogoutWithGoogleClick() {
    signOut()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="lg:text-center lg:text-base lg:font-bold lg:text-white">
          Sair
        </DialogTitle>
        <DialogDescription className="text-center text-sm font-normal text-[#838896] lg:text-[#838896]">
          Deseja sair da plataforma?
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center justify-center gap-2 lg:flex lg:gap-2">
        <Button
          variant="outline"
          className="max-h-9 max-w-[134px] gap-1 font-bold lg:h-9 lg:w-[134px]"
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          className="max-h-9 max-w-[134px] gap-1 font-bold lg:h-9 lg:w-[134px]"
          onClick={handleLogoutWithGoogleClick}
        >
          Sair
        </Button>
      </div>
    </>
  )
}
