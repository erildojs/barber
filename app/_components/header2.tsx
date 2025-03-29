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
    <Card className="hidden lg:block lg:rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5 lg:mx-auto lg:my-0 lg:w-full lg:max-w-6xl lg:px-0 lg:py-5">
        <Link href="/">
          <Image alt="Barber" src="/Logo.png" width={120} height={18} />
        </Link>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Sidebar />
          </Sheet>
        </div>

        <div className="lg:flex">
          <input
            type="text"
            placeholder="Buscar Barbearias"
            className="lg:mr-2 lg:h-9 lg:w-[535px] lg:rounded-lg lg:border-none lg:bg-[#26272B] lg:pl-3 lg:text-white lg:outline-none lg:placeholder:text-[#838896]"
          />
          <button className="lg:flex lg:h-9 lg:w-10 lg:items-center lg:justify-center lg:rounded-lg lg:bg-[#8162FF]">
            <FiSearch size={14} />
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <div className="flex items-center justify-center">
            <CalendarDays size={16} />
            <Link
              href="/bookings"
              className="lg:ml-2 lg:mr-6 lg:text-sm lg:font-bold lg:text-white"
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
                <p className="text-xs lg:hidden">{data.user.email}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild className="lg:ml-6">
                  <Button size="icon" variant="destructive">
                    <LogOutIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="lg:max-h-[146px] lg:max-w-[318px]">
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
              <DialogContent className="w-[90%] rounded-2xl lg:max-h-[166px] lg:max-w-80 lg:rounded-2xl">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
