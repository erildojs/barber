"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon, CalendarDays, CircleUserRound } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Sidebar } from "./sidebar"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"
import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

export function Header() {
  const { data } = useSession()

  return (
    <Card className="sm:rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5 sm:mx-auto sm:my-0 sm:w-full sm:max-w-6xl sm:px-0 sm:py-5">
        <Link href="/">
          <Image alt="Barber" src="/Logo.png" height={18} width={120} />
        </Link>

        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Sidebar />
          </Sheet>
        </div>

        <div className="hidden sm:flex sm:items-center sm:justify-center">
          <div className="flex items-center justify-center">
            <CalendarDays size={16} />
            <p className="ml-2 text-sm font-bold text-white">Agendamentos</p>
          </div>
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>
              <div>
                <p className="font-bold">{data.user.name}</p>
                <p className="text-xs">{data.user.email}</p>
              </div>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-6 flex h-9 w-[92px] items-center justify-center rounded-[8px] bg-[#8166ff]">
                  <CircleUserRound className="mr-1" />
                  Perfil
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-2xl sm:max-h-[166px] sm:max-w-80 sm:rounded-2xl">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
