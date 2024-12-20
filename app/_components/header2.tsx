"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
  MenuIcon,
  CalendarDays,
  CircleUserRound,
  LogOutIcon,
} from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Sidebar } from "./sidebar"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"
import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { FiSearch } from "react-icons/fi"
import { SignUpDialog } from "./sign-up-dialog"

export function Header2() {
  const { data } = useSession()

  return (
    <Card className="hidden sm:flex sm:rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5 sm:mx-auto sm:my-0 sm:w-full sm:max-w-6xl sm:px-0 sm:py-5">
        <Link href="/">
          <Image
            alt="Barber"
            src="/Logo.png"
            width={120}
            height={18}
            className=""
          />
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

        <div className="sm:flex">
          <input
            type="text"
            placeholder="Buscar Barbearias"
            className="sm:mr-2 sm:h-9 sm:w-[535px] sm:rounded-lg sm:border-none sm:bg-[#26272B] sm:pl-3 sm:text-white sm:outline-none sm:placeholder:text-[#838896]"
          />
          <button className="sm:flex sm:h-9 sm:w-10 sm:items-center sm:justify-center sm:rounded-lg sm:bg-[#8162FF]">
            <FiSearch size={14} />
          </button>
        </div>

        <div className="hidden sm:flex sm:items-center sm:justify-center">
          <div className="flex items-center justify-center">
            <CalendarDays size={16} />
            <Link
              href="/bookings"
              className="ml-2 text-sm font-bold text-white sm:mr-6"
            >
              Agendamentos
            </Link>
          </div>
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>
              <div>
                <p className="font-bold">{data.user.name}</p>
                <p className="text-xs sm:hidden">{data.user.email}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild className="sm:ml-6">
                  <Button size="icon" variant="destructive">
                    <LogOutIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-h-[146px] sm:max-w-[318px]">
                  <SignUpDialog />
                </DialogContent>
              </Dialog>
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
