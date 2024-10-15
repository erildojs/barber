import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon, CalendarDays, CircleUserRound } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Sidebar } from "./sidebar"
import Link from "next/link"

export function Header() {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/Logo.png" height={18} width={120} />
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
          <div className="ml-6 flex h-9 w-[92px] items-center justify-center rounded-[8px] bg-[#8166ff]">
            <a
              href="/"
              className="flex cursor-pointer items-center justify-center text-sm font-bold text-white"
            >
              <CircleUserRound className="mr-1" />
              Perfil
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
