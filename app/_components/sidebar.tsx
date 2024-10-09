'use client'
import { HomeIcon, CalendarIcon, LogOutIcon, LogInIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import { signOut, useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Sidebar() {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const router = useRouter()

  function handleLogoutClick() {
    signOut().then(() => {
      return router.push('/')
    })
  }
  function handleSignInDialogOpenClick() {
    if (!data?.user) {
      return setSignInDialogIsOpen(true)
    }
  }

  return (
    <>
      <SheetContent className="overflow-y-hidden">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex items-center gap-3 justify-between border-b border-solid py-5">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ''} />
              </Avatar>
              <div>
                <p className="font-bold">{data.user.name}</p>
                <p className="text-xs">{data.user.email}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-bold">Olá, faça login!</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size='icon'><LogInIcon /></Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button className="justify-start px-0 gap-2" variant="ghost">
            <Link href="/" className="flex gap-2">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
          {data?.user ? (
            <Button className="justify-start px-0 gap-2" variant="ghost" asChild>
              <Link href="/bookings" onClick={handleSignInDialogOpenClick}>
                <CalendarIcon size={18} />
                Agendamentos
              </Link>
            </Button>
          ) : (
            <Button className="justify-start px-0 gap-2" variant="ghost" asChild>
              <Link href="" onClick={handleSignInDialogOpenClick}>
                <CalendarIcon size={18} />
                Agendamentos
              </Link>
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          {/* {services.map(service => (
            <SheetClose key={service.id} asChild>
              <Button className="justify-start px-0 gap-2" variant="ghost" asChild>
                <Link href={`/barbershops?services=${service.name}`}>
                  <HomeIcon size={18} />
                  {service.name}
                </Link>
              </Button>
            </SheetClose>
          ))} */}
        </div>
        {data?.user && (
          <div className="flex flex-col gap-2 py-5">
            <Button variant="ghost" className="justify-start px-0 gap-2"
              onClick={handleLogoutClick}>
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>

      <Dialog open={signInDialogIsOpen} onOpenChange={(open => setSignInDialogIsOpen(open))}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
